<script setup>

const localePath = useLocalePath();
const leftPaneWidthPercent = ref(30); // Start with 50% as the initial width
const isDragging = ref(false);

const startDragging = (event) => {
  isDragging.value = true;
  event.preventDefault(); // Prevent default behavior to avoid issues with touch events
};

const onDrag = (event) => {
  if (isDragging.value) {
    let clientX;
    if (event.type === 'mousemove') {
      clientX = event.clientX;
    } else if (event.type === 'touchmove') {
      clientX = event.touches[0].clientX;
    }
    if (clientX !== undefined) {
      const newWidthPercent = (clientX / window.innerWidth) * 100;
      leftPaneWidthPercent.value = Math.min(Math.max(newWidthPercent, 0), 100); // Ensure it stays between 0% and 100%
    }
  }
};

const stopDragging = (event) => {
  isDragging.value = false;
  event.preventDefault();
};

onMounted(() => {
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('touchmove', onDrag);
  window.addEventListener('mouseup', stopDragging);
  window.addEventListener('touchend', stopDragging);
  window.addEventListener('touchcancel', stopDragging); // Handle touch cancel events
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('mouseup', stopDragging);
  window.removeEventListener('touchend', stopDragging);
  window.removeEventListener('touchcancel', stopDragging);
});
</script>

<template>
  <div class="flex w-full h-[500px] relative">
    <div
        :style="{ width: leftPaneWidthPercent + '%' }"
        class="h-full absolute bg-[#5B7986]">
    </div>
    <div
        :style="{ left: leftPaneWidthPercent + '%' }"
        class="h-full w-[10px] bg-[#5B7986] absolute z-10 bg-none flex justify-center">
      <div class="relative w-full">
        <div
            class="w-[40px] h-[40px] rounded-full cursor-ew-resize flex items-center justify-center gap-2 absolute z-10 bg-white mt-8 right-0 translate-x-1/2"
            @mousedown="startDragging"
            @touchstart="startDragging"> <!-- Added touchstart for mobile -->
          <div :style="`color: #8E9D74`" class="rounded triangle-left"></div>
          <div :style="`color: #5B7986`" class="rounded triangle-right"></div>
        </div>
      </div>
    </div>
    <div
        :style="{ left: `calc(${leftPaneWidthPercent}% + 10px)`, width: `calc(100% - ${leftPaneWidthPercent}% - 10px)` }"
        class="h-full absolute bg-[#8E9D74]">
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
              alt=""
              class="w-1/2 mx-auto md:mx-0"
              src="~/assets/img/mainPage/photoFrame.png">
        </div>
      </div>
      <img
          alt=""
          class="w-full md:w-1/2 absolute right-0 -bottom-1/2 -translate-y-1/2 lg:-translate-y-1/3"
          src="~/assets/img/mainPage/tableSofa.png">
    </div>
  </div>
</template>

<style scoped>
.triangle-right {
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-left: 13px solid #5B7986;
  border-bottom: 8px solid transparent;
}

.triangle-left {
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 13px solid #8E9D74;
  border-bottom: 8px solid transparent;
}
</style>