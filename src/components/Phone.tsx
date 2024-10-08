import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    img_src: string;
    dark?: boolean;
}

const Phone = ({ img_src, className, ...props }: PhoneProps) => {
    return(
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)} {...props}>
        <img src={"/phone-template.png"} className="pointer-events-none z-50 select-none" alt="phone image"/>

        <div className="absolute -z-10 inset-0">
            <img className="object-cover min-w-full min-h-full" src={img_src} alt="overlay image" />
        </div>
    </div>
    )
}

export default Phone