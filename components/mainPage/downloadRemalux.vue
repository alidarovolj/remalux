<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const boundRef = ref(null);
const videoRef = ref(null);

const scrollVideo = () => {
  if (videoRef.value && videoRef.value.duration && boundRef.value) {
    const boundRect = boundRef.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (boundRect.top < windowHeight && boundRect.bottom > 0) {
      // Calculate the scroll position relative to the entire scrollable area
      const totalScrollableHeight = windowHeight + boundRect.height;
      const scrolledAmount = windowHeight - boundRect.bottom;

      // Calculate the percentage of the video that should be played
      const percentScrolled = scrolledAmount / (totalScrollableHeight - windowHeight);
      const clampedPercentScrolled = Math.min(Math.max(percentScrolled, 0), 1);

      // Update the video currentTime
      videoRef.value.currentTime = videoRef.value.duration * clampedPercentScrolled;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', scrollVideo);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollVideo);
});
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 mb-36">
    <div class="rounded-xl relative flex md:hidden flex-col md:flex-row">
      <img
          class="w-full h-full absolute rounded-xl object-cover object-right-bottom"
          src="~/assets/img/bg-app.jpg"
          alt="">
      <div
          class="w-full md:w-1/2 py-14 px-4 md:px-9 rounded-xl relative z-10"
          style="background: linear-gradient(90deg, #C37F7F 72.63%, rgba(115, 115, 115, 0) 100%);">
        <h2 class="text-3xl font-bold text-white mb-5">
          {{ $t('mainPage.download_remalux.title') }}
        </h2>
        <p class="font-medium text-white mb-9">
          {{ $t('mainPage.download_remalux.description') }}
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
    <!-- Content before the video -->
    <div class="hidden md:block">
      <div class="relative">
        <div class="absolute left-9 flex flex-col justify-center h-full w-[30%]">
          <h2 class="text-3xl font-bold text-white mb-5">
            {{ $t('mainPage.download_remalux.title') }}
          </h2>
          <p class="font-medium text-white mb-9">
            {{ $t('mainPage.download_remalux.description') }}
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
        <div id="bound-two" class="scroll-bound" ref="boundRef">
          <client-only>
            <div class="content">
              <video
                  muted preload playsinline ref="videoRef"
                  class="w-full h-auto">
                <source src="@/assets/video/4.mp4" type="video/mp4">
                Your browser does not support HTML video.
              </video>
            </div>
          </client-only>
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
