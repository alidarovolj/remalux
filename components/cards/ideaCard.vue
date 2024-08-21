<script setup>
import {useLanguagesStore} from "~/stores/languages.js";

const localePath = useLocalePath()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)

const props = defineProps(['data', 'itemIndex'])
</script>

<template>
  <NuxtLink
      :to="`/ideas/${data.id}`"
      data-aos="fade-up"
      :data-aos-duration="itemIndex * 300"
      class="group relative flex flex-col overflow-hidden rounded-lg bg-white set_shadow w-full">
    <img class="h-[230px] min-h-[230px] object-cover" :src="data.image_url" alt="">
    <p class="flex items-center text-base font-semibold px-5 py-6 min-h-[100px]">
      {{ data.title[cur_lang] }}
    </p>
  </NuxtLink>
</template>