import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formater = new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
  })

  return formater.format(price)
}


