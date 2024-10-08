import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { Reviews } from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <img src="/tiger-1.png" className="w-full"/>
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-800 text-5xl md:text-6xl lg:text-7xl">Твоя Картинка на <span className="bg-orange-600 px-2 text-white">Кастомном</span> Чехле </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap text-gray-600">TigerCase – это сервис для создания уникальных чехлов для телефонов с использованием ваших собственных изображений. Загружайте любимые фотографии, иллюстрации или дизайны и превращайте их в стильный аксессуар для вашего устройства. Качественные материалы и точная печать обеспечат долговечность и яркость рисунка, делая ваш чехол по-настоящему особенным.</p>
              
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left text-black">
                    <Check className="h-5 w-5 shrink-0 text-orange-600"/>
                    Высокое качество, прочный материал
                  </li>
                  <li className="flex gap-1.5 items-center text-left text-black">
                    <Check className="h-5 w-5 shrink-0 text-orange-600"/>
                    6 лет гарантии принта
                  </li>
                  <li className="flex gap-1.5 items-center text-left text-black">
                    <Check className="h-5 w-5 shrink-0 text-orange-600"/>
                    Поддерживаются современные модели iPhone
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-1.png" alt="user image" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-2.png" alt="user image" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100" src="/users/user-3.png" alt="user image" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover" src="/users/user-4.jpg" alt="user image" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover" src="/users/user-5.png" alt="user image" />
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600"/>
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600"/>
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600"/>
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600"/>
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600"/>
                  </div>

                  <p className="text-gray-600"><span className="font-semibold">1.500</span> довольных покупателей</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Phone className="w-64" img_src="/phone.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Отзывы клиентов */}

      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6:">
          <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-black">
            Отзывы наших <span className="relative px-2">клиентов <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-orange-500" /> </span>
          </h2>
          <img src="/tiger-2.png" className="w-24 order-0 lg:order-2" />
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                "Очень доволен своим новым чехлом от TigerCase! <span className="p-0.5 bg-slate-800 text-white">Качество печати просто на высоте</span> – цвета яркие, а детали проработаны до мелочей. Чехол идеально сел на телефон, и материалы ощущаются действительно прочными."
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img className="rounded-full size-12 object-cover" src="/users/user-1.png" alt="user" />
                <div className="flex flex-col">
                  <p className="font-semibold">Вадим</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-orange-600" />
                    <p className="text-sm">Подтвержденная покупка</p>
                  </div>
                </div> 
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
                <Star className="size-5 text-orange-600 fill-orange-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                "Заказала чехол с фотографией своего питомца, и результат превзошел ожидания! <span className="p-0.5 bg-slate-800 text-white">Изображение получилось четким и насыщенным,</span> а сам чехол надежно защищает телефон от царапин и ударов. Отличная идея для подарка или для себя любимого!"
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img className="rounded-full size-12 object-cover" src="/users/user-5.png" alt="user" />
                <div className="flex flex-col">
                  <p className="font-semibold">Виктория</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="size-4 stroke-[3px] text-orange-600" />
                    <p className="text-sm">Подтвержденная покупка</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-16 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight !leading-tight font-bold text-5xl md:text-black">
                Загрузи свое фото и получи <span className="relative px-2 bg-orange-600 text-white">свой собственный чехол </span> сейчас
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <div className="relative h-80 md:size-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <img src="/cat.jpg" className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 size-full" />  
              </div>     

              <Phone className="w-60" img_src="/cat-phone.jpg"/>      
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="size-5 text-orange-600 inline mr-1.5"/>
              Покрытие, устойчивое к царапинам и отпечаткам пальцев
            </li>
            <li className="w-fit">
              <Check className="size-5 text-orange-600 inline mr-1.5"/>
              Высококачественный силиконовый материал
            </li>
            <li className="w-fit">
              <Check className="size-5 text-orange-600 inline mr-1.5"/>
              Совместимость с беспроводной зарядкой
            </li>
            <li className="w-fit">
              <Check className="size-5 text-orange-600 inline mr-1.5"/>
              Гарантия на печать 6 лет
            </li>

            <div className="flex justify-center">
              <Link href="/configure/upload" className={buttonVariants({
                size: "lg",
                className: "mx-auto mt-8"
              })}>
                Создай свой чехол сейчас <ArrowRight className="size-4 ml-1.5"/> 
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
