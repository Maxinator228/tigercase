import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { LoginLink, LogoutLink, RegisterLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const Navbar = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMAIL
    return(
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-300 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                <Link href='/' className="flex z-40 font-semibold">
                    <span className="text-orange-600">tiger</span>case
                </Link>

                <div className="h-full flex items-center space-x-4">
                    {user ? (
                        <>
                            <LogoutLink className={buttonVariants({
                                size: 'sm', variant: 'ghost',
                            })}>
                                Выход
                            </LogoutLink>
                            {isAdmin ? (<Link href="/dashboard" className={buttonVariants({
                                size: 'sm', variant: 'ghost',
                            })}>
                                Админ панель✨
                            </Link>
                            ) : null}
                            <Link href="/configure/upload" className={buttonVariants({
                                size: 'sm', className: "hidden sm:flex items-center gap-1",
                            })}>
                                Создать чехол
                                <ArrowRight className="ml-1.5 h-5 w-5" />
                            </Link>
                        </>
                    ) : (
                        <>
                            <RegisterLink className={buttonVariants({
                                size: 'sm', variant: 'ghost'
                            })}>
                                Зарегистрироваться
                            </RegisterLink>
                            
                            <LoginLink className={buttonVariants({
                                size: 'sm', variant: 'ghost',
                            })}>
                                Авторизоваться
                            </LoginLink>

                            <div className="h-8 w-0.5 bg-zinc-50 hidden sm:block" />
                            
                            <Link href="/configure/upload" className={buttonVariants({
                                size: 'sm', className: "hidden sm:flex items-center gap-1",
                            })}>
                                Создать чехол
                                <ArrowRight className="ml-1.5 h-5 w-5" />
                            </Link>
                            
                        </>
                    )}
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
    )
}

export default Navbar