<script setup>
import {useLanguagesStore} from "~/stores/languages.js";

const localePath = useLocalePath()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)

const props = defineProps(['data', 'itemIndex'])
</script>

<template>
  <NuxtLink
      :data-aos-duration="itemIndex * 300"
      :to="`/ideas/${data.id}`"
      class="group relative flex flex-col overflow-hidden rounded-lg bg-white set_shadow w-full"
      data-aos="fade-up">
    <div class="absolute top-4 left-4 w-max p-2 rounded-xl border border-white flex gap-2 set-backdrop">
      <div class="w-[28px] h-[28px] rounded-full bg-[#020202]"></div>
      <div class="w-[28px] h-[28px] rounded-full bg-[#6E5651]"></div>
      <div class="w-[28px] h-[28px] rounded-full bg-[#E9E3DD]"></div>
      <div class="w-[28px] h-[28px] rounded-full bg-[#30364F]"></div>
    </div>
    <img :src="data.image_url" alt="" class="h-[230px] min-h-[230px] object-cover">
    <div class="px-5 pt-6 pb-12 text-start">
      <p class="flex font-montserrat items-center text-2xl font-medium truncate mb-5">
        {{ data.title[cur_lang] }}
      </p>
      <p class="text-base text-[#333333]">
        Цветах для интерьера можно говорить бесконечно В конце концов все зависит от вашего вкуса и того, какое влияние
        на вас оказывает определенный цвет. Но мы, как профессионалы лакокрасочных изделий, и так как работа с цветом –
        наше дело, расскажем вам о нескольких обсуждаемых цветах на 2024 год.
      </p>
    </div>
  </NuxtLink>
</template>