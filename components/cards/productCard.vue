<script setup>
import {useLanguagesStore} from "~/stores/languages.js";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

const localePath = useLocalePath();
const props = defineProps(['productData', 'itemIndex']);
const language = useLanguagesStore();
const {cur_lang} = storeToRefs(language);
</script>

<template>
  <NuxtLink
      :to="localePath('/store/' + productData.id)"
      data-aos="fade-up"
      v-bind="itemIndex !== undefined ? { 'data-aos-duration': itemIndex * 200 } : {}"
      class="w-full bg-white rounded-md mt-28 py-3 text-left transition-all product-hover"
      style="box-shadow: 7px 7px 20px 0px #0000000D"
  >
    <img
        class="w-[90%] h-[174px] object-contain mx-auto -mt-20 mb-4 transition-all"
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
            class="w-12 h-12 text-mainColor transition-all px-3 py-2 flex items-center justify-center border border-mainColor rounded-full"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </NuxtLink>
      </div>
    </div>
  </NuxtLink>
</template>