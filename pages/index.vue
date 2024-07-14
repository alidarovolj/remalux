<script setup>
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline"
import ProductCard from "~/components/products/productCard.vue";

const leftPaneWidth = ref(200);
const isDragging = ref(false);

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
    <div class="container mx-auto px-4 lg:px-0">
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  </div>
</template>

<style scoped>
.set_shadow {
  box-shadow: 7px 7px 20px 0px #0000000D;
}
</style>