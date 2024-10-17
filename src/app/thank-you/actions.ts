"use server"

import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const getPaymentStatus = async ({orderId}: {orderId: string}) => {
    const {getUser} = getKindeServerSession()
    const user = await getUser()

    if(!user?.id || !user.email) {
        throw new Error("Вам необходимо войти в систему, чтобы просмотреть эту страницу")
    }

    const order = await db.order.findFirst({
        where: { id: orderId, userId: user.id },
        include: {
            billingAddress: true,
            configuration: true,
            shippingAddress: true,
            user: true,
        }
    })

    if(!order) throw new Error("Этого заказа не существует.")

    if(order.isPaid) {
        return order
    } else {
        return false
    }
}