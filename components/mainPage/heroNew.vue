<script setup>
const localePath = useLocalePath()
</script>

<template>
  <div class="flex w-full h-[500px] relative">
    <img
        class="absolute left-0 top-0 w-full h-full z-10"
        src="@/assets/img/hero/1.png"
        alt="">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-0 relative">
      <div class="w-full md:w-1/3 h-full md:h-auto mt-10 md:mt-0 px-4 md:px-0">
        <div class="relative z-20 flex flex-col gap-7">
          <h2 class="text-xl md:text-4xl font-bold text-white font-montserrat">
            {{ $t('mainPage.hero.title') }}
          </h2>
          <div class="flex gap-6 font-montserrat">
            <NuxtLink
                :to="localePath('/')"
                class="w-full bg-none hover:text-mainColor hover:bg-white transition-all text-white rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
            >
              {{ $t('mainPage.hero.choose_paint') }}
            </NuxtLink>
            <NuxtLink
                :to="localePath('/')"
                class="w-full bg-none hover:text-mainColor hover:bg-white transition-all text-white rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
            >
              {{ $t('mainPage.hero.choose_color') }}
            </NuxtLink>
          </div>
        </div>
      </div>
<!--      <div class="w-full md:w-2/3 relative h-full hidden md:block">-->
<!--        <img-->
<!--            class="w-[25%] mx-auto md:mx-0 absolute right-[30%] translate-x-1/2 top-1/3 -translate-y-1/2 z-50"-->
<!--            src="~/assets/img/hero/pinpng.com-wall-art-png-2436294%203.png"-->
<!--            alt="">-->
<!--        <img-->
<!--            class="w-full md:w-[60%] absolute right-[10%] -bottom-1/3 -translate-y-1/2 lg:-translate-y-1/3 z-40"-->
<!--            src="~/assets/img/mainPage/tableSofa.png"-->
<!--            alt="">-->
<!--        <img-->
<!--            class="w-full md:w-[60%] absolute right-[10%] -bottom-[30%] -translate-y-1/2 lg:-translate-y-1/3 z-30"-->
<!--            src="~/assets/img/hero/shadow.png"-->
<!--            alt="">-->
<!--      </div>-->
      
      <div class="w-full relative h-full block md:hidden z-20">
        <img
            class="w-1/2 mx-auto absolute -top-14 left-1/2 -translate-x-1/2"
            src="~/assets/img/hero/pinpng.com-wall-art-png-2436294%203.png"
            alt="">
        <div class="w-full translate-y-2/3">
          <div class="flex items-end">
            <div class="w-[70%]">
              <img
                  class="w-full"
                  src="~/assets/img/mainPage/tableSofa.png"
                  alt="">
              <img
                  class="w-full -translate-y-1/2"
                  src="~/assets/img/hero/shadow.png"
                  alt="">
            </div>
            <img
                class="w-[30%] -translate-y-1/4"
                src="~/assets/img/hero/lamp.png"
                alt="">
          </div>
        </div>
      </div>
    </div>
<!--    <img-->
<!--        class="w-full md:w-[15%] absolute hidden md:block right-0 -bottom-[30%] -translate-y-1/2 lg:-translate-y-[10%] z-50"-->
<!--        src="~/assets/img/hero/lamp.png"-->
<!--        alt="">-->
    <div class="w-full md:w-1/2 absolute right-0 bottom-0 h-auto hidden md:block z-20">
      <img
          class="w-full h-full object-contain translate-y-1/4"
          src="@/assets/img/hero/elements.png" alt="">
    </div>
  </div>
</template>