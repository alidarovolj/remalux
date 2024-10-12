<script lang="ts" setup>
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

const localePath = useLocalePath()

const props = defineProps(['title', 'link', 'linkTitle'])
</script>

<template>
  <div class="flex justify-between items-center pb-2 mb-0 md:mb-12 md:shadow-custom">
    <h2 class="text-lg md:text-4xl font-medium font-montserrat text-center md:text-start w-full">
      {{ title }}
    </h2>
    <NuxtLink
        :to="localePath(link)"
        class="hidden md:flex gap-2 items-center text-mainColor hover:border-b hover:border-mainColor transition-all whitespace-nowrap">
      <p class="text-sm md:text-xl">
        {{ linkTitle }}
      </p>
      <ChevronRightIcon class="w-5 h-5"/>
    </NuxtLink>
  </div>
</template>
