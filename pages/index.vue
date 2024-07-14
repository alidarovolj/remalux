<script setup>
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline"
import ProductCard from "~/components/cards/productCard.vue";
import IdeaCard from "~/components/cards/ideaCard.vue";
import NewsCard from "~/components/cards/newsCard.vue";

const leftPaneWidth = ref(200);
const isDragging = ref(false);
const artworkMainCarousel = ref(null);

const startDragging = () => {
  isDragging.value = true;
};

const onDrag = (event) => {
  if (isDragging.value) {
    leftPaneWidth.value = event.clientX;
  }
};

const stopDragging = () => {
  isDragging.value = false;
};

onMounted(() => {
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDragging);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDragging);
});

const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 3,
    snapAlign: "start"
  }
})

const newsBreakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 2.25,
    snapAlign: "start"
  }
})
</script>

<template>
  <div>
    <div class="flex w-full h-[500px] relative">
      <div
          class="h-full absolute bg-[#5B7986]"
          :style="{ width: leftPaneWidth + 'px' }">
      </div>
      <div
          class="h-full w-[10px] bg-[#5B7986] absolute bg-none flex justify-center"
          :style="{ left: leftPaneWidth + 'px' }">
        <div
            class="w-[50px] h-[50px] rounded-full cursor-ew-resize flex items-center gap-2 relative z-10 bg-white mt-8"
            @mousedown="startDragging">
          <ChevronLeftIcon class="w-5 h-5"/>
          <ChevronRightIcon class="w-5 h-5"/>
        </div>
      </div>
      <div
          class="h-full absolute bg-[#8E9D74]"
          :style="{ left: leftPaneWidth + 10 + 'px', width: 'calc(100% - ' + (leftPaneWidth + 10) + 'px)' }">
      </div>
      <div
          class="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-0 relative px-4 md:px-0">
        <div class="w-full md:w-1/3">
          <div class="relative z-20 flex flex-col gap-7">
            <h2 class="text-xl md:text-4xl font-bold text-white">
              Высокое евпропейское качество по доступной цене
            </h2>
            <div class="flex gap-6">
              <NuxtLink
                  to="/"
                  class="w-full bg-white text-[#5B7986] rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
              >
                Выбрать краску
              </NuxtLink>
              <NuxtLink
                  to="/"
                  class="w-full bg-none text-white rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
              >
                Выбрать цвет
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <div class="relative z-10">
            <img
                class="w-1/2 mx-auto md:mx-0"
                src="~/assets/img/mainPage/photoFrame.png"
                alt="">
          </div>
        </div>
        <img
            class="w-full md:w-1/2 absolute right-0 -bottom-1/2 -translate-y-1/2 lg:-translate-y-1/3"
            src="~/assets/img/mainPage/tableSofa.png"
            alt="">
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mt-40 mb-32">
      <div class="flex flex-col md:flex-row gap-5">
        <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
          <div class="flex flex-col gap-5 w-2/3 md:w-1/3 pl-7">
            <p class="text-2xl md:text-4xl font-bold">
              Фирменная краска
            </p>
            <p class="text-[#525252] text-xs md:text-base">
              Для любого типа поверхностей
            </p>
          </div>
          <img
              class="w-1/3 md:w-2/3"
              src="~/assets/img/mainPage/paint.png"
              alt="">
        </div>
        <div class="w-full md:w-1/2 flex flex-col gap-5">
          <div class="h-full flex flex-col md:flex-row gap-5">
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Покрытие
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/surface.png"
                  alt="">
            </div>
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Лак
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/lack.png"
                  alt="">
            </div>
          </div>
          <div class="h-full flex flex-col md:flex-row gap-5">
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Краска
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/paintbrush.png"
                  alt="">
            </div>
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Шпатлевка
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/shpat.png"
                  alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mb-32">
      <div
          class="flex justify-between items-center pb-3 mb-8"
          style="box-shadow: 0px 6px 6.4px -4px #00000026;">
        <h2 class="text-lg md:text-3xl font-bold">
          Готовые решения для вашего дома
        </h2>
        <NuxtLink
            to="/"
            class="flex gap-2 items-center text-mainColor">
          <p class="text-sm md:text-xl">
            Больше идей
          </p>
          <ChevronRightIcon class="w-5 h-5"/>
        </NuxtLink>
      </div>
      <my-carousel-carousel
          :breakpoints="breakpoints"
          :mouse-drag="true"
          :touch-drag="true"
      >
        <my-carousel-slide
            v-for="(item, index) of 10"
            :key="index">
          <IdeaCard class="mx-2"/>
        </my-carousel-slide>
        <template #addons>
          <my-carousel-navigation/>
          <my-carousel-pagination/>
        </template>
      </my-carousel-carousel>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mb-36">
      <div
          class="flex justify-between items-center pb-3"
          style="box-shadow: 0px 6px 6.4px -4px #00000026;">
        <h2 class="text-lg md:text-3xl font-bold">
          Популярные товары
        </h2>
        <NuxtLink
            to="/"
            class="flex gap-2 items-center text-mainColor">
          <p class="text-sm md:text-xl">
            Больше товаров
          </p>
          <ChevronRightIcon class="w-5 h-5"/>
        </NuxtLink>
      </div>
      <div class="flex flex-col md:flex-row gap-5 h-full">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mb-36">
      <div class="rounded-xl relative flex flex-col md:flex-row">
        <img
            class="w-full h-full absolute rounded-xl object-cover object-right-bottom"
            src="~/assets/img/bg-app.jpg"
            alt="">
        <div
            class="w-full md:w-1/2 py-14 px-4 md:px-9 rounded-xl relative z-10"
            style="background: linear-gradient(90deg, #C37F7F 72.63%, rgba(115, 115, 115, 0) 100%);">
          <h2 class="text-3xl font-bold text-white mb-5">
            Remalux
          </h2>
          <p class="font-medium text-white mb-9">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus ornare vestibulum et,
            feugiat quis dui. Vivamus sit amet dolor et magna facilisis rhoncus. Curabitur maximus est sed porta
            scelerisque. Sed suscipit, arcu volutpat feugiat posuere, eros nisi tristique nibh, mollis vehicula lectus
            tortor eu purus. Donec ut tortor blandit, sagittis diam eget, suscipit eros.
          </p>
          <div class="flex gap-3 md:gap-7">
            <img
                class="w-auto h-12"
                src="~/assets/img/apple.png"
                alt="">
            <img
                class="w-auto h-12"
                src="~/assets/img/android.png"
                alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="mb-36">
      <div class="container mx-auto px-4 lg:px-0 mb-10">
        <div
            class="flex justify-between items-center pb-3"
            style="box-shadow: 0px 6px 6.4px -4px #00000026;">
          <h2 class="text-lg md:text-3xl font-bold">
            Актуальные новости
          </h2>
          <NuxtLink
              to="/"
              class="flex gap-2 items-center text-mainColor">
            <p class="text-sm md:text-xl">
              Перейти в новости
            </p>
            <ChevronRightIcon class="w-5 h-5"/>
          </NuxtLink>
        </div>
      </div>
      <ClientOnly>
        <my-carousel-carousel
            :breakpoints="newsBreakpoints"
            :mouse-drag="true"
            :touch-drag="true"
        >
          <my-carousel-slide
              ref="artworkMainCarousel"
              v-for="(item, index) of 10"
              :key="index">
            <NewsCard class="mx-2"/>
          </my-carousel-slide>
          <template #addons="{ currentSlide, slidesCount }">
            <div class="container mx-auto px-4 lg:px-0 mt-5">
              <div class="flex justify-between gap-4 w-full overflow-x-auto">
                <div
                    v-for="(item, index) of 6"
                    :key="index"
                    class="bg-cardBg dark:bg-dElement cursor-pointer dark:text-dText rounded-md"
                    @click="artworkMainCarousel.slideTo(index)"
                >
                  <img
                      src="~/assets/img/mainPage/news.png"
                      alt=""
                      :class="{
                      'border-2 border-mainColor': currentSlide === index,
                    }"
                      class="h-auto w-[200px] rounded-md"
                  />
                </div>
              </div>
            </div>
          </template>
        </my-carousel-carousel>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.set_shadow {
  box-shadow: 7px 7px 20px 0px #0000000D;
}
</style>