<script setup>
import {ShieldCheckIcon} from "@heroicons/vue/24/outline"
</script>

<template>
  <div class="bg-white pb-32">

    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-mainColor/20 pt-14">
        <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-mainColor/10 ring-1 ring-mainColor sm:-mr-80 lg:-mr-96"
            aria-hidden="true"/>
        <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div
              class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 lg:col-span-2 xl:col-auto">
              ТОО «К-КОЛОР» «K-COLOR» с торговой маркой «REMALUX» – высокое европейское качество по доступной цене.</h1>
            <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p class="text-base leading-8 text-gray-600">
                ТОО «К-КОЛОР» «K-COLOR» с торговой маркой «REMALUX» – высокое европейское качество по доступной цене.
                Компания ТОО «К-КОЛОР» «K-COLOR» с торговой маркой «REMALUX» – лидер в производстве лакокрасочных
                материалов, расположенный в Республике Казахстан. Мы предлагаем вниманию потребителей широкий
                ассортимент красок высшего качества, изготовленных по британской лицензии из сырья именитых французских,
                бельгийских, немецких, голландских и американских производителей.
              </p>
            </div>
            <div
                class="relative mt-10 aspect-[6/5] w-full rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36">
              <img
                  src="@/assets/img/about/bg.png"
                  alt=""
                  class="relative z-10 w-full"/>
              <div class="bg-mainColor absolute -right-4 md:-right-9 top-4 md:top-9 rounded-2xl w-full h-3/4"></div>
            </div>
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"/>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="mb-20 text-center">
          <h2 class="text-3xl font-bold mb-5">
            Почему покупатели выбирают нашу продукцию?
          </h2>
          <p class="font-medium w-full md:w-1/2 mx-auto leading-8">
            Наши краски пользуются доверием благодаря высокому качеству, инновационным решениям и экономичному расходу.
            Добавьте сюда выгодные цены и разнообразие ассортимента, и вы поймете, почему нас выбирают снова
          </p>
        </div>
        <div class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3">
          <div class="flex items-start gap-5">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2">Высокое качество</h3>
              <p class="text-xs text-[#7B7B7B]">
                Наши краски проходят строгий контроль качества, обеспечивая превосходное покрытие и долговечность на
                любой поверхности.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2">Инновационные технологии производства</h3>
              <p class="text-xs text-[#7B7B7B]">
                Мы используем передовые технологии, чтобы создавать краски, которые легко наносятся, быстро сохнут и
                обеспечивают насыщенные цвета.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2">Экономный расход материалов</h3>
              <p class="text-xs text-[#7B7B7B]">
                Наши краски обеспечивают высокую укрывистость, что позволяет сократить расход и снизить затраты.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2">Конкурентные цены</h3>
              <p class="text-xs text-[#7B7B7B]">
                Мы предлагаем отличное соотношение цены и качества, чтобы вы могли получить профессиональный продукт по
                доступной стоимости.
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2">Профессиональное сервисное обслуживание</h3>
              <p class="text-xs text-[#7B7B7B]">
                Профессиональное сервисное обслуживание
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2">Широкий ассортимент продукции</h3>
              <p class="text-xs text-[#7B7B7B]">
                В нашем ассортименте вы найдете краски для любых нужд – от интерьерных до промышленных покрытий, в
                разнообразии цветов и текстур.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="mt-32 overflow-hidden sm:mt-40">
        <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div
              class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900">
                Для кого предназначена продукция нашей компании?
              </h2>
              <p class="mt-6 text-xl leading-8 text-gray-600">
                Производимая нами продукция призвана с легкостью удовлетворять требования самых строгих профессионалов
                высокой квалификации для использования на престижных объектах представительского уровня. Кроме того, она
                прекрасно подходит и обычным людям, выбирающим материалы для домашнего пользования и самостоятельного
                проведения косметического ремонта.
              </p>
            </div>
            <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img
                    src="@/assets/img/about/about-1.png"
                    alt="" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"/>
              </div>
              <div
                  class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <img
                      src="@/assets/img/about/about-2.png"
                      alt="" class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"/>
                </div>
                <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img
                      src="@/assets/img/about/about-3.png"
                      alt="" class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"/>
                </div>
                <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img
                      src="@/assets/img/about/about-4.png"
                      alt="" class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto flex w-full flex-col items-end justify-between gap-5 lg:mx-0 lg:max-w-none lg:flex-row">
          <div class="w-full lg:flex-auto">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">
              <span class="text-mainColor">REMALUX:</span> Все, что вам нужно для идеального результата
            </h2>
            <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
                alt=""
                class="mt-16 mb-5 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"/>
            <p class="text-[#7B7B7B] leading-8">
              REMALUX предлагает высококачественные лакокрасочные материалы с современными технологиями и отличным
              обслуживанием. Все продукты безопасны и соответствуют европейским стандартам.
            </p>
          </div>
          <div class="w-full lg:flex-auto">
            <ul class="flex flex-col gap-5">
              <li class="gap-3 border-b border-[#F0DFDF] pb-7">
                <p class="text-mainColor font-extrabold mb-3">Инновационные технологии и современные методы
                  производства</p>
                <p>
                  Производство лакокрасочных материалов в REMALUX основано на современных технологиях и достижениях
                  химической науки, что гарантирует высокое качество и безопасность продукции по конкурентоспособным
                  ценам.
                </p>
              </li>
              <li class="gap-3 border-b border-[#F0DFDF] pb-7">
                <p class="text-mainColor font-extrabold mb-3">Сервисное обслуживание</p>
                <p>
                  Мы обеспечиваем дозакупочное и послезакупочное обслуживание, удовлетворяя требования клиентов через
                  высокое качество продукции и отличный сервис.
                </p>
              </li>
              <li class="gap-3 border-b border-[#F0DFDF] pb-7">
                <p class="text-mainColor font-extrabold mb-3">Широкий ассортимент продукции</p>
                <p>
                  REMALUX предлагает текстурные покрытия, водоэмульсионные краски, лаки, акриловый клей и другие
                  материалы. Мы поможем выбрать нужный оттенок и гарантируем высокое качество по выгодным ценам.
                </p>
              </li>
              <li class="gap-3 border-b border-[#F0DFDF] pb-7">
                <p class="text-mainColor font-extrabold mb-3">Безопасность и комфорт в использовании</p>
                <p>
                  Продукция на водной основе не токсична и не имеет запаха, что обеспечивает комфортное использование
                  как для профессионалов, так и для домашних мастеров. Наши краски безопасны для людей и домашних
                  животных.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-5">
          Наш автопарк: Быстрая и надежная доставка
        </h2>

        <div class="flex flex-col md:flex-row gap-5 h-[600px] mb-5">
          <div class="flex flex-col gap-5">
            <img
                class="w-full h-full"
                src="@/assets/img/about/car-1.png"
                alt="">
            <img
                class="w-full h-full"
                src="@/assets/img/about/car-2.png"
                alt="">
          </div>
          <img
              class="w-full h-full"
              src="@/assets/img/about/car-3.png"
              alt="">
        </div>

        <p class="text-xl font-medium">
          Производимая нами продукция призвана с легкостью удовлетворять требования самых строгих профессионалов высокой
          квалификации для использования на престижных объектах представительского уровня. Кроме того, она прекрасно
          подходит и обычным людям, выбирающим материалы для домашнего пользования и самостоятельного проведения
          косметического ремонта.
        </p>
      </div>
    </main>

  </div>
</template>