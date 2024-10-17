"use client"

import Phone from "@/components/Phone"
import { Button } from "@/components/ui/button"
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products"
import { cn, formatPrice } from "@/lib/utils"
import { COLORS, MODELS } from "@/validators/option-validator"
import { Configuration } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { ArrowRight, Check } from "lucide-react"
import { useEffect, useState } from "react"
import Confetti from "react-dom-confetti"
import { createCheckoutSession } from "./actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import LoginModal from "@/components/LoginModal"

const DesignPreview = ({configuration}: {configuration: Configuration}) => {
    const router = useRouter()
    const {toast} = useToast()
    const {id} = configuration
    const {user} = useKindeBrowserClient()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)

    const [showConfetti, setshowConfetti] = useState<boolean>(false)
    useEffect(() => setshowConfetti(true))

    const {color, model, finish, material} = configuration
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw

    const {label: modelLabel} = MODELS.options.find(({value}) => value === model)!

    let totalPrice = BASE_PRICE
    if(material === "polycarbonate") totalPrice += PRODUCT_PRICES.material.polycarbonate
    if(finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured

    const {mutate: createPaymentSession} = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn: createCheckoutSession,
        onSuccess: ({url}) => {
            if(url) router.push(url)
            else throw new Error("Не удалось получить URL-адрес платежа.")
        },
        onError: () => {
            toast({
                title: "Что-то пошло не так",
                description: "С нашей стороны произошла ошибка. Пожалуйста, попробуйте еще раз.",
                variant: "destructive",
            })
        }
    })

    const handleCheckout = () => {
        if(user) {
            createPaymentSession({configId: id})
        } else {
            localStorage.setItem("configurationId", id)
            setIsLoginModalOpen(true)
        }
    }

    return <>
        <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
            <Confetti active={showConfetti} config={{elementCount: 200, spread: 90}}/>
        </div>   

        <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

        <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
                <Phone className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")} img_src={configuration.croppedImgUrl!} />
            </div>

            <div className="mt-6 sm:col-span-9 md:row-end-1">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">Твой чехол на {modelLabel}</h3>
                <div className="mt-3 flex items-center gap-1.5 text-base">
                    <Check className="size-4 text-orange-500"/>
                    В наличии и готов к отправке
                </div>
            </div>

            <div className="sm:col-span-12 md:col-span-9 text-base">
                <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:py-6 md:py-10">
                    <div>
                        <p className="font-medium text-zinc-950">Основные моменты</p>
                        <ol className="mt-3 text-zinc-700 list-disc list-inside">
                            <li>Совместимость с беспроводной зарядкой</li>
                            <li>Упаковка из переработанных материалов</li>
                            <li>Гарантия на печать 6 лет</li>
                        </ol>
                    </div>
                    <div>
                        <p className="font-medium text-zinc-950">Материалы</p>
                        <ol className="mt-3 text-zinc-700 list-disc list-inside">
                            <li>Высококачественный, прочный материал</li>
                            <li>Покрытие, устойчивое к царапинам и отпечаткам пальцев</li>
                        </ol>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                        <div className="flow-root text-sm">
                            <div className="flex items-center justify-between py-1 mt-2">
                                <p className="text-gray-600">Базовая цена</p>
                                <p className="font-medium text-gray-900">{formatPrice(BASE_PRICE)}</p>
                            </div>
                            {material ==="polycarbonate" ? (
                                <div className="flex items-center justify-between py-1 mt-2">
                                <p className="text-gray-600">Мягкий поликарбонат</p>
                                <p className="font-medium text-gray-900">{formatPrice(PRODUCT_PRICES.material.polycarbonate)}</p>
                                </div>
                            ) : null}
                            {finish ==="textured" ? (
                                <div className="flex items-center justify-between py-1 mt-2">
                                <p className="text-gray-600">Текстурированная отделка</p>
                                <p className="font-medium text-gray-900">{formatPrice(PRODUCT_PRICES.finish.textured)}</p>
                                </div>
                            ) : null}
                            
                            <div className="my-2 h-px bg-gray-200" />

                            <div className="flex items-center justify-between py-2">
                                <p className="font-semibold text-gray-900">Общая сумма заказа</p>
                                <p className="font-semibold text-gray-900">{formatPrice(totalPrice)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end pb-12">
                        <Button onClick={() => handleCheckout()} className="px-4 sm:px-6 lg:px-8"> Оформление заказа <ArrowRight className="size-4 ml-1.5 inline "/> </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DesignPreview