<script setup>
import {useLanguagesStore} from "~/stores/languages.js";

const localePath = useLocalePath();
const props = defineProps(['productData']);
const language = useLanguagesStore();
const {cur_lang} = storeToRefs(language);
</script>

<template>
  <NuxtLink
      :to="localePath('/store/' + productData.id)"
      class="w-full bg-white rounded-md mt-28 px-4 py-3"
      style="box-shadow: 7px 7px 20px 0px #0000000D"
  >
    <img
        class="w-2/3 h-[174px] object-contain mx-auto -mt-20 mb-4"
        :src="productData.image_url"
        alt="">
    <p class="text-[#191919] mb-4">
      {{ productData.title[cur_lang] }}
    </p>
    <p class="text-[10px] mb-4">
      {{ productData.article }}
    </p>
    <div class="flex justify-between">
      <div>
        <p class="text-[#B0B0B0] text-[10px]">
          3 850 ₸
        </p>
        <p class="font-semibold">
          2 730₸
        </p>
      </div>
      <NuxtLink
          :to="localePath('/')"
          class="bg-mainColor text-white px-3 rounded-md flex items-center"
      >
        {{ $t('cards.more') }}
      </NuxtLink>
    </div>
  </NuxtLink>
</template>