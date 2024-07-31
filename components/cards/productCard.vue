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
      class="w-full bg-white rounded-md mt-28 py-3 text-left"
      style="box-shadow: 7px 7px 20px 0px #0000000D"
  >
    <img
        class="w-[90%] h-[174px] object-contain mx-auto -mt-20 mb-4"
        :src="productData.image_url"
        alt="">
    <div class="px-4">
      <p class="text-[#191919] mb-4 text-sm h-14">
        {{ productData.title[cur_lang] }}
      </p>
      <p class="text-[10px] mb-4">
        {{ productData.article }}
      </p>
      <div class="flex justify-between items-center">
        <div>
          <p class="font-semibold">
            {{ productData.price_range }}
          </p>
        </div>
        <NuxtLink
            :to="localePath(`/store/${productData.id}`)"
            class="bg-mainColor text-white px-3 py-2 rounded-md flex items-center"
        >
          {{ $t('cards.more') }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLink>
</template>