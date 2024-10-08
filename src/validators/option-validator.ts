import { PRODUCT_PRICES } from "@/config/products"

export const COLORS = [
    {label: "Черный титан", value: "black", tw: "zinc-900"}, 
    {label: "Синий титан", value: "blue", tw: "blue-950"}, 
    {label: "Серый титан", value: "titanium", tw: "titanium"},
    {label: "Белый титан", value: "titanium_white", tw: "titanium-white"},
] as const 

export const MODELS = {
    name: 'models',
    options: [
        {
            label: "iPhone 13",
            value: "iphone13",
        },
        {
            label: "iPhone 13 Pro",
            value: "iphone13pro",
        },
        {
            label: "iPhone 14",
            value: "iphone14",
        },
        {
            label: "iPhone 14 Pro",
            value: "iphone14pro",
        },
        {
            label: "iPhone 15",
            value: "iphone15",
        },
        {
            label: "iPhone 15 Pro",
            value: "iphone15pro",
        },
        {
            label: "iPhone 16",
            value: "iphone16",
        },
        {
            label: "iPhone 16 Pro",
            value: "iphone16pro",
        },
    ]
} as const

export const MATERIALS = {
    name: 'material',
    label: "материал",
    options: [
        {
            label: "Силикон",
            value: "silicone",
            description: undefined,
            price: PRODUCT_PRICES.material.silicone
        },
        {
            label: "Мягкий Поликарбонат",
            value: "polycarbonate",
            description: "Устойчивое к царапинам покрытие",
            price: PRODUCT_PRICES.material.polycarbonate
        },
    ]
} as const

export const FINISHES = {
    name: 'finish',
    label: 'отделка',
    options: [
        {
            label: "Гладкая отделка",
            value: "smooth",
            description: undefined,
            price: PRODUCT_PRICES.finish.smooth
        },
        {
            label: "Текстурированная отделка",
            value: "textured",
            description: "Мягкая, цепкая текстура",
            price: PRODUCT_PRICES.finish.textured
        },
    ]
} as const