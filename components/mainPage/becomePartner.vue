<script setup>
const { t } = useI18n()

const stats = computed(() => [
  {id: 1, name: t('partners.stats.first'), value: '5'},
  {id: 2, name: t('partners.stats.second'), value: '42+'},
  {id: 3, name: t('partners.stats.third'), value: '150+'},
  {id: 4, name: t('partners.stats.fourth'), value: '200+'},
]);
</script>

<template>
  <div class="container mx-auto px-4 md:px-0 mb-16">
    <client-only>
      <div class="relative isolate overflow-hidden bg-gray-900 px-6 md:px-14 py-6 md:py-12 rounded-3xl">
        <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80&blend=111827&blend-mode=multiply&sat=-100&exp=15"
            alt="" class="absolute inset-0 -z-10 h-full w-full object-cover"/>
        <div class="relative mx-auto w-full">
          <div
              class="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
              aria-hidden="true">
            <div class="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                 style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"/>
          </div>
          <div class="mx-auto lg:mx-0">
            <p class="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
              {{ $t('partners.title') }}
            </p>
            <p class="mt-6 text-sm md:text-xl leading-5 md:leading-8 text-gray-300">
              {{ $t('partners.text') }}
            </p>
          </div>
          <dl class="mx-auto mt-16 grid grid-cols-2 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div v-for="stat in stats" :key="stat.id" class="flex flex-col gap-y-3 border-l-2 border-white pl-6">
              <dt class="text-sm md:text-xl">{{ stat.name }}</dt>
              <dd class="order-first text-3xl md:text-5xl font-bold tracking-tight">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </client-only>
  </div>
</template>
