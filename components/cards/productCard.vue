<script setup>
import {useLanguagesStore} from "~/stores/languages.js";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

const localePath = useLocalePath();
const props = defineProps(['productData', 'itemIndex']);
const language = useLanguagesStore();
const {cur_lang} = storeToRefs(language);
</script>

<template>
  <div class="mt-40 w-full relative">
    <NuxtLink
        :to="localePath('/store/' + productData.id)"
        class="w-full h-full bg-white block rounded-md pb-3 text-left transition-all product-hover relative pt-24 hover:-translate-y-3"
        style="box-shadow: 7px 7px 6.1px 0px #0000000D"
    >
      <img
          :src="productData.image_url"
          alt=""
          class="w-full min-w-full h-[210px] object-contain mx-auto mb-4 transition-all absolute -top-1/2 left-0">
      <div class="absolute right-3 top-3 w-8 h-8 rounded-full bg-[#F0DFDF] flex items-center justify-center">
        <svg
            v-if="productData.is_colorable"
            class="size-5 w-5 h-5 text-mainColor"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
          <path
              clip-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              fill-rule="evenodd"
          />
        </svg>
        <svg
            v-else
            class="size-5 w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
          <path
              clip-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              fill-rule="evenodd"
          />
        </svg>

      </div>
      <div class="px-4 flex flex-col gap-2 relative">
        <p class="text-[#191919] text-lg leading-6 truncate">
          {{ productData.title[cur_lang] }}
        </p>
        <div class="flex items-center gap-1">
          <svg
              v-for="(item, index) of 5"
              :key="index"
              class="size-6 text-mainColor" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fill-rule="evenodd"/>
          </svg>
          <p class="ml-1 text-lg">4.5 (265)</p>
        </div>
<!--        <p class="text-[#333333] font-light">-->
<!--          {{ productData.article }}-->
<!--        </p>-->
        <div class="flex justify-between items-center">
          <div>
<!--            <p class="text-[10px] text-[#7B7B7B] mb-1">-->
<!--              Цена-->
<!--            </p>-->
            <p class="text-lg font-medium">{{ productData.price_range[0] }}₸ - {{ productData.price_range[1] }}₸</p>
          </div>
          <NuxtLink
              :to="localePath(`/store/${productData.id}`)"
              class="w-10 h-10 text-mainColor transition-all p-2 flex items-center justify-center border border-mainColor rounded-full"
          >
            <ChevronRightIcon class="w-8 h-8"/>
          </NuxtLink>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>