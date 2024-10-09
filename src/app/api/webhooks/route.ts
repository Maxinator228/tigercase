import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const signature = headers().get("stripes-signature")

        if(!signature) {
            return new Response("Invalid signature", { status: 400 })
        }

        const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

        if(event.type === "checkout.session.completed"){
            if(!event.data.object.customer_details?.email){
                throw new Error("Отсутствует адрес электронной почты пользователя")
            }

            const session = event.data.object as Stripe.Checkout.Session

            const {userId, orderID} = session.metadata || {
                userId: null,
                orderID: null,
            }

            if(!userId || !orderID) {
                throw new Error("Не удалось получить данные о пользователе или заказе")
            }

            const billingAddress = session.customer_details!.address
            const shippingAddress = session.shipping_details!.address

            await db.order.update({
                where: {
                    id: orderID,
                },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: shippingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,
                            state: shippingAddress!.state!,
                        }
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: billingAddress!.city!,
                            country: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code!,
                            street: billingAddress!.line1!,
                            state: billingAddress!.state!,
                        }
                    }
                }
            })
        }

        return NextResponse.json({result: event, ok: true})
    } catch (error) {
        console.error(error)

        return NextResponse.json({message: "Что-то пошло не так", ok: false}, {status: 500})
    }
}