import  type { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { buttonVariants } from "./ui/button"

const LoginModal = ({isOpen, setIsOpen}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    return <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="absolute z-[9999999] bg-white">
            <DialogHeader>
                <div className="relative mx-auto size-24 mb-2">
                    <Image src="/tigers-1.png" alt="tiger image" className="object-contain" fill />
                </div>
                <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
                    Войдите, чтобы продолжить
                </DialogTitle>
                <DialogDescription className="text-base text-center py-2">
                    <span className="font-medium text-zinc-900">
                        Ваша конфигурация сохранена
                    </span>{" "}
                    Пожалуйста, войдите или создайте учетную запись, чтобы завершить покупку.
                </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
                <LoginLink className={buttonVariants({variant: 'outline'})}>Авторизоваться</LoginLink>
                <RegisterLink className={buttonVariants({variant: "default"})}>Зарегистрироваться</RegisterLink>
            </div>
        </DialogContent>
    </Dialog>
}

export default LoginModal