"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { db } from "@/db"
import { stripe } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Order } from "@prisma/client"

export const createCheckoutSession = async ({configId}: {configId: string}) => {
    const configuration = await db.configuration.findUnique({
        where: { id: configId},
    })

    if(!configuration){
        throw new Error("Такой конфигурации не найдено")
    }

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user) {
        throw new Error("Вам необходимо войти в систему")
    }

    const {finish, material} = configuration

    let price = BASE_PRICE
    if(finish === "textured") price += PRODUCT_PRICES.finish.textured
    if(material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate

    let order: Order | undefined = undefined

    const existingOrder = await db.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configuration.id,
        }
    })


    if(existingOrder) {
        order = existingOrder
    } else {
        order = await db.order.create({
            data: {
                amount: price,
                userId: user.id,
                configurationId: configuration.id
            }
        })
    }

    const product = await stripe.products.create({
        name: "Кастомный чехол на Айфон",
        images: [configuration.imgUrl],
        default_price_data: {
            currency: "KZT",
            unit_amount: price * 100,
        }
    })

    const stripeSessions = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: {allowed_countries: ["KZ","RU"]},
        locale: "ru",
        metadata: {
            userId: user.id,
            orderId: order.id,
        },
        line_items: [{price: product.default_price as string, quantity: 1}]
    })

    return {url: stripeSessions.url}
}