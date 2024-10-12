<script setup>
import Counter from "~/components/general/counter.vue";

const {t} = useI18n()

const localePath = useLocalePath()

const stats = computed(() => [
  {id: 1, name: t('partners.stats.first'), value: '5'},
  {id: 2, name: t('partners.stats.second'), value: '42'},
  {id: 3, name: t('partners.stats.third'), value: '150'},
  {id: 4, name: t('partners.stats.fourth'), value: '200'},
]);
</script>

<template>
  <div
      class="container mx-auto px-4 md:px-0"
      data-aos="fade-up">
    <client-only>
      <div
          style="background: linear-gradient(294.9deg, #E7A263 34.96%, #D59A62 62.31%);"
          class="relative flex bg-[#BAA287] rounded-3xl">
        <div
            class="relative w-full px-0 md:px-12 py-0 md:py-9 lg:w-3/4 z-10">
          <div class="mx-auto lg:mx-0 px-4 pt-4 mb-10 md:mb-0">
            <p class="mt-2 text-xl md:text-3xl font-bold tracking-tight text-white pb-5 border-b border-white">
              {{ $t('partners.title') }}
            </p>
            <p class="mt-6 text-sm md:text-xl leading-5 md:leading-8 text-white">
              {{ $t('partners.text') }}
            </p>
          </div>
          <NuxtLink
              :to="localePath('/partnership')"
              class="hidden md:block my-9 font-semibold w-max rounded-xl bg-white text-mainColor py-3 px-16 hover:bg-mainColor hover:text-white transition-all">
            {{ $t('partners.button') }}
          </NuxtLink>
          <dl class="hidden w-full mx-auto md:grid grid-cols-2 gap-x-8 gap-y-10 text-white sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div v-for="stat in stats" :key="stat.id" class="flex flex-col gap-y-2 border-l border-white pl-3">
              <dt class="text-sm md:text-xl">{{ stat.name }}</dt>
              <dd class="order-first text-3xl md:text-4xl font-bold tracking-tight">
                <Counter :endValue="stat.value"/>
                <span v-if="stat.id !== 1">+</span></dd>
            </div>
          </dl>
          <div class="flex md:hidden">
            <div class="w-1/2 pl-4">
              <dl class="w-full mx-auto grid grid-cols-2 gap-x-8 gap-y-10 text-white sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                <div v-for="stat in stats" :key="stat.id" class="flex flex-col gap-y-2 border-l border-white pl-3">
                  <dt class="text-sm md:text-xl">{{ stat.name }}</dt>
                  <dd class="order-first text-3xl md:text-4xl font-bold tracking-tight">
                    <Counter :endValue="stat.value"/>
                    <span v-if="stat.id !== 1">+</span></dd>
                </div>
              </dl>
              <NuxtLink
                  :to="localePath('/partnership')"
                  class="text-sm block md:hidden mt-9 mb-4 font-semibold w-full rounded-xl bg-white text-mainColor py-2 px-5 text-center hover:bg-mainColor hover:text-white transition-all">
                {{ $t('partners.button') }}
              </NuxtLink>
            </div>
            <div class="w-1/2 flex items-end md:hidden md:w-1/4 min-h-full">
              <img
                  src="~/assets/img/sert/partners.png"
                  alt="partners-bg"
                  class="w-full h-auto object-contain z-10"
              />
            </div>
          </div>
        </div>
        <img
            class="h-6 md:h-10 w-auto absolute right-5 md:right-12 top-5 md:top-9"
            src="@/assets/img/logos/mainLogo.svg" alt="">
        <div class="hidden w-full md:w-1/4 min-h-full lg:flex items-end">
          <img
              src="~/assets/img/mainPage/partners.png"
              alt="partners-bg"
              class="w-full h-auto object-contain z-10"
          />
        </div>
      </div>
    </client-only>
  </div>
</template>
