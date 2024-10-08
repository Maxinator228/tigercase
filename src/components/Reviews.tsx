"use client"

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";




const PHONES = [
    "/phones/1.jpg",
    "/phones/2.jpg",
    "/phones/3.jpg",
    "/phones/4.jpg",
    "/phones/5.jpg",
    "/phones/6.jpg",
]

function splitArray<T>(array: Array<T>, numParts: number) {
    const result: Array<Array<T>> = []

    for (let i = 0; i < array.length; i++) {
        const index = i % numParts
        if(!result[index]){
            result[index] = []
        }
        result[index].push(array[i])
    }

    return result
}

const ReviewColumn = (
    {
        phones,
        className,
        reviewClassName,
        ms_per_pixel = 0
    }: {
        phones: string[],
        className?: string,
        reviewClassName?: (phoneIndex: number) => string,
        ms_per_pixel?: number
        
    }
) => {
    const columnRef = useRef<HTMLDivElement | null>(null)
    const [column_height, setColumnHeight] = useState(0)
    const duration = `${column_height * ms_per_pixel}ms`

    useEffect(() => {
        if(!columnRef.current) return

        const resizeObserver = new window.ResizeObserver(() => {
            setColumnHeight(columnRef.current?.offsetHeight ?? 0)
        })

        resizeObserver.observe(columnRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    },[])

    return (
    <div ref={columnRef} className={cn("animate-marquee space-y-8 py-4", className)} style={{"--marquee-duration": duration} as React.CSSProperties}>
        {phones.concat(phones).map((imgSrc, reviewIndex) => (
            <Review key={reviewIndex} className={reviewClassName?.(reviewIndex % phones.length)} imgSrc={imgSrc} />
        ))}
    </div>
    )
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement>{
    imgSrc: string;
}

const Review = ({imgSrc, className, ...props}: ReviewProps) => {

    const ANIMATION_DELAYS = ["0s", "0.1s", "0.2s","0.3s", "0.4s", "0.5s",]

    const animationDelay = ANIMATION_DELAYS[Math.floor(Math.random() * ANIMATION_DELAYS.length)]

    return (
    <div className={cn("animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5", className)} style={{animationDelay}} {...props}>
        <Phone img_src={imgSrc}/>
    </div>
    )
}

const ReviewGrid = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const inView = useInView(containerRef, {once: true, amount:0.4})
    const columns = splitArray(PHONES, 3)
    const column1 = columns[0],
          column2 = columns[1]
    const column3 = splitArray(columns[2], 2)

    return (
    <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {inView ? (
        <>
        <ReviewColumn phones={[...column1, ...column3.flat(), ...column2]} reviewClassName={(reviewIndex) => cn({
            "md:hidden": reviewIndex >= column1.length + column2[0].length,
            "lg:hidden": reviewIndex >= column1.length,
        })} 
        ms_per_pixel={10}
        />
        <ReviewColumn phones={[...column2, ...column3[1]]} className="hidden md:block" 
        reviewClassName={(reviewIndex) => reviewIndex >= column2.length ? "lg:hidden" : ""} 
        ms_per_pixel={15}
        />
        <ReviewColumn phones={column3.flat()} 
        className="hidden:block"
        ms_per_pixel={10}
        />
        </> 
        ): null}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100"/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100"/>
    </div>
    )
}

export function Reviews() {
    return (
    <MaxWidthWrapper className="relative max-w-5xl">
        <ReviewGrid/>
    </MaxWidthWrapper>
    )
}