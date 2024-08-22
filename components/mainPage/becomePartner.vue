<script setup>
const { t } = useI18n()

const localePath = useLocalePath()

const stats = computed(() => [
  {id: 1, name: t('partners.stats.first'), value: '5'},
  {id: 2, name: t('partners.stats.second'), value: '42+'},
  {id: 3, name: t('partners.stats.third'), value: '150+'},
  {id: 4, name: t('partners.stats.fourth'), value: '200+'},
]);
</script>

<template>
  <div
      data-aos="fade-up"
      class="container mx-auto px-4 md:px-0 mb-16">
    <client-only>
      <div class="relative isolate overflow-hidden bg-[#BAA287] rounded-3xl">
        <div class="relative w-full px-6 md:px-12 py-6 md:py-9 md:w-3/4 z-10">
          <div class="mx-auto lg:mx-0">
            <p class="mt-2 text-xl md:text-3xl font-bold tracking-tight text-white pb-5 border-b border-white">
              {{ $t('partners.title') }}
            </p>
            <p class="mt-6 text-sm md:text-xl leading-5 md:leading-8 text-white">
              {{ $t('partners.text') }}
            </p>
          </div>
          <NuxtLink class="my-9 font-semibold block w-max rounded-xl bg-white text-mainColor py-3 px-16" :to="localePath('/')">
            {{ $t('partners.button') }}
          </NuxtLink>
          <dl class="mx-auto grid grid-cols-2 gap-x-8 gap-y-10 text-white sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div v-for="stat in stats" :key="stat.id" class="flex flex-col gap-y-2 border-l border-white pl-3">
              <dt class="text-sm md:text-xl">{{ stat.name }}</dt>
              <dd class="order-first text-3xl md:text-4xl font-bold tracking-tight">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
        <div class="w-auto absolute right-0 top-0 h-full hidden md:block">
          <img class="h-full w-auto object-cover object-right-top" src="@/assets/img/hero/partners.png" alt="">
        </div>
      </div>
    </client-only>
  </div>
</template>
