import { clsx, type ClassValue } from "clsx"
import { Metadata } from "next"
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

export function constructMetadata({
  title = "TigerCase",
  description = "Создавайте индивидуальные высококачественные чехлы для телефонов за считанные секунды",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{url: image}]
    },
    icons,
    metadataBase: new URL("https://tigercase.vercel.app")
  }
}
