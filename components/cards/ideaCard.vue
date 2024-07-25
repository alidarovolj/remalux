<script setup>
import {useLanguagesStore} from "~/stores/languages.js";

const localePath = useLocalePath()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)

const props = defineProps(['data'])
</script>

<template>
  <div
      class="w-full bg-white rounded-md"
      style="box-shadow: 0px 0px 20px 0px #0000000D;">
    <img
        class="w-full h-[230px] object-cover rounded-tr-md rounded-tl-md"
        :src="data.image_url"
        alt="">
    <div class="px-5 py-6 text-start">
      <p class="text-2xl font-semibold mb-5">
        Скандинавский минимализм
      </p>
      <p class="text-sm font-light">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus ornare vestibulum et,
        feugiat quis dui. Vivamus sit amet dolor et magna facilisis rhoncus. Curabitur maximus est sed porta
        scelerisque. Sed suscipit, arcu volutpat feugiat posuere, eros nisi tristique nibh, mollis vehicula lectus
        tortor eu purus. Donec ut tortor blandit, sagittis diam eget, suscipit eros.
      </p>
    </div>
    <div class="flex justify-between gap-5 mb-5">
      <div class="w-full h-8" :style="`background: ${data.color_title.hex}`"></div>
    </div>
    <NuxtLink
        :to="localePath('/')"
        class="block w-full py-4 text-center text-mainColor"
    >
      Подробнее
    </NuxtLink>
  </div>
</template>