<script setup>
import { UserIcon, ArchiveBoxIcon, GlobeAmericasIcon, HeartIcon, ChevronRightIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/vue/24/outline"

const {t} = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  {title: 'Профиль', icon: UserIcon, link: localePath('/profile')},
  {title: 'Заказы', icon: ArchiveBoxIcon, link: localePath('/profile')},
  {title: 'Адреса доставок', icon: GlobeAmericasIcon, link: localePath('/profile')},
  {title: 'Избранное', icon: HeartIcon, link: localePath('/profile')},
]);
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 pt-8 pb-32">
    <div class="flex items-start w-full gap-5">
      <div class="hidden md:block w-1/5">
        <div class="bg-white set_shadow flex flex-col px-6 py-2">
          <div
              v-for="(link, index) in links"
              :key="index"
              class="flex w-full items-center justify-between py-4 cursor-pointer transition-all hover:text-mainColor border-b border-[#F0DFDF]">
            <div class="flex gap-3">
              <component :is="link.icon" class="w-6 h-6" />
              <p>{{ link.title }}</p>
            </div>
            <ChevronRightIcon class="w-6 h-6" />
          </div>
        </div>
        <div
            class="bg-white text-red-500 mt-4 set_shadow px-6 py-4 flex w-full items-center justify-between cursor-pointer transition-all">
          <div class="flex gap-3">
            <ArrowLeftEndOnRectangleIcon class="w-6 h-6" />
            <p>Выход из профиля</p>
          </div>
          <ChevronRightIcon class="w-6 h-6" />
        </div>
      </div>
      <div class="w-full md:w-4/5 h-full">
        <slot />
      </div>
    </div>
  </div>
</template>