<script setup>
const localePath = useLocalePath()
</script>

<template>
  <div
      class="container mx-auto px-4 lg:px-0"
      data-aos="fade-up">
    <div
        style="box-shadow: 0px 0px 20px 0px #0000000D;"
        class="flex flex-col md:flex-row items-center rounded-3xl bg-white">
      <img
          class="w-full md:w-2/5 rounded-l-3xl"
          src="@/assets/img/mainPage/about.png"
          alt="">
      <div class="w-full md:w-3/5 px-4 md:px-20 py-4 md:py-12">
        <h2 class="font-medium md:font-bold text-lg md:text-3xl mb-4 md:mb-7 font-montserrat">
          {{ $t('mainPage.about_us.title') }}
        </h2>
        <p class="text-xs md:text-xl font-light mb-12 leading-5 md:leading-7">
          {{ $t('mainPage.about_us.description') }}
        </p>
        <NuxtLink
            :to="localePath('about')"
            class="block w-full py-2 md:py-4 border-2 hover:bg-mainColor hover:text-white transition-all text-center border-mainColor text-mainColor rounded-xl text-sm md:text-xl font-medium">
          {{ $t('mainPage.about_us.button') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>