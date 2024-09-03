<script setup>
import {useLanguagesStore} from "~/stores/languages.js";

const localePath = useLocalePath()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)

const props = defineProps(['data', 'itemIndex'])
</script>

<template>
  <NuxtLink
      :data-aos-duration="itemIndex * 100"
      :to="`/ideas/${data.id}`"
      class="group relative flex flex-col overflow-hidden rounded-lg bg-white set_shadow w-full hov_element transition-all"
      data-aos="fade-up">
    <div class="absolute top-4 left-4 w-max p-2 rounded-xl flex gap-2 set-backdrop z-10">
      <div
          v-for="(item, index) of data.colors.slice(0, 3)"
          :key="index"
          class="w-[28px] h-[28px] rounded-full"
          :style="`background: ${item.hex}`"
      ></div>
    </div>
    <img :src="data.image_url" alt="" class="transition-all h-[230px] min-h-[230px] object-cover">
    <div class="px-5 pt-6 pb-12 text-start">
      <p class="flex font-montserrat items-center text-xl font-medium truncate mb-5">
        {{ data.title[cur_lang] }}
      </p>
      <p class="text-sm text-[#333333] h-24 max-h-24 overflow-hidden">
        {{ data.short_description[cur_lang] }}
      </p>
    </div>
  </NuxtLink>
</template>