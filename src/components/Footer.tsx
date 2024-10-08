import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {
    return (
    <footer className="bg-white h-20 relative">
        <MaxWidthWrapper>
            <div className="border-t border-gray-200"/>

            <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
                <div className="text-center md:text-left pb-2 md:pb-0">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Все права защищены
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <div className="flex gap-8">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                            Условия
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                            Конфиденциальность
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-gray-600">
                            Политика файлов cookie
                        </Link>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    </footer>
    )
}

export default Footer