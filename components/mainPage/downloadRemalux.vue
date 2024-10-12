<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';

const boundRef = ref(null);
const videoRef = ref(null);
let scrollAnimationFrame;

const scrollVideo = () => {
  if (videoRef.value && videoRef.value.duration && boundRef.value) {
    const boundRect = boundRef.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (boundRect.top < windowHeight && boundRect.bottom > 0) {
      const totalScrollableHeight = windowHeight + boundRect.height;
      const scrolledAmount = windowHeight - boundRect.bottom;
      const percentScrolled = scrolledAmount / (totalScrollableHeight - windowHeight);
      const clampedPercentScrolled = Math.min(Math.max(percentScrolled, 0), 1);
      videoRef.value.currentTime = videoRef.value.duration * clampedPercentScrolled;
    }
  }
};

const handleScroll = () => {
  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame);
  }
  scrollAnimationFrame = requestAnimationFrame(scrollVideo);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame);
  }
});
</script>

<template>
  <div
      class="container mx-auto px-4 lg:px-0"
      data-aos="fade-up">
    <div class="block">
      <div class="relative">
        <div class="absolute z-20 left-9 hidden md:flex flex-col justify-center h-full w-[30%]">
          <h2 class="text-4xl font-medium text-white mb-5 font-montserrat">
            {{ $t('mainPage.download_remalux.title') }}
          </h2>
          <p class="text-white text-base mb-12">
            {{ $t('mainPage.download_remalux.description') }}
          </p>
          <div class="flex gap-3 md:gap-7">
            <a
                href="#"
                class="hover:scale-110 transition-all cursor-pointer">
              <img
                  alt=""
                  class="w-auto h-12"
                  src="~/assets/img/apple.png">
            </a>
            <a
                href="#"
                class="hover:scale-110 transition-all cursor-pointer">
              <img
                  alt=""
                  class="w-auto h-12"
                  src="~/assets/img/android.png">
            </a>
          </div>
        </div>
        <div id="bound-two" ref="boundRef" class="scroll-bound">
          <client-only>
            <div class="content">
              <video
                  ref="videoRef" class="w-full h-auto" muted playsinline
                  preload>
                <source src="@/assets/video/4.mp4" type="video/mp4">
                Your browser does not support HTML video.
              </video>
            </div>
          </client-only>
        </div>
        <div class="block md:hidden flex-col justify-center h-full w-full mt-12">
          <h2 class="text-lg font-medium mb-3 font-montserrat">
            {{ $t('mainPage.download_remalux.title') }}
          </h2>
          <p class="text-xs mb-12">
            {{ $t('mainPage.download_remalux.description') }}
          </p>
          <div class="flex gap-4">
            <a
                href="#"
                class="hover:scale-110 transition-all cursor-pointer">
              <img
                  alt=""
                  class="w-auto h-12"
                  src="~/assets/img/apple.png">
            </a>
            <a
                href="#"
                class="hover:scale-110 transition-all cursor-pointer">
              <img
                  alt=""
                  class="w-auto h-12"
                  src="~/assets/img/android.png">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-bound {
  height: 100%;
}

.scroll-bound .content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scroll-bound video {
  width: 100%;
}
</style>
