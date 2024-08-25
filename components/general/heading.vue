<script setup lang="ts">
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

const localePath = useLocalePath()

const props = defineProps(['title', 'link', 'linkTitle'])
</script>

<template>
  <div
      class="flex justify-between items-center pb-2 mb-12"
      style="box-shadow: 0px 6px 6.4px -4px #00000026;">
    <h2 class="text-lg md:text-4xl font-medium font-montserrat">
      {{ title }}
    </h2>
    <NuxtLink
        :to="localePath(link)"
        class="flex gap-2 items-center text-mainColor hover:border-b hover:border-mainColor transition-all">
      <p class="text-sm md:text-xl">
        {{ linkTitle }}
      </p>
      <ChevronRightIcon class="w-5 h-5"/>
    </NuxtLink>
  </div>
</template>
