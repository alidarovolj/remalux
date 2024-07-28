<script setup>
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline/index.js";

const localePath = useLocalePath();
const leftPaneWidth = ref(500);
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
            {{ $t('mainPage.hero.title') }}
          </h2>
          <div class="flex gap-6">
            <NuxtLink
                :to="localePath('/')"
                class="w-full bg-white text-[#5B7986] rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
            >
              {{ $t('mainPage.hero.choose_paint') }}
            </NuxtLink>
            <NuxtLink
                :to="localePath('/')"
                class="w-full bg-none text-white rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
            >
              {{ $t('mainPage.hero.choose_color') }}
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
</template>