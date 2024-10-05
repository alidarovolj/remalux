<script setup>
import {useLanguagesStore} from "~/stores/languages.js";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import {useProductsStore} from "~/stores/products.js";

const localePath = useLocalePath();
const props = defineProps(['productData', 'itemIndex']);
const language = useLanguagesStore();
const {cur_lang} = storeToRefs(language);
const products = useProductsStore()
</script>

<template>
  <div class="mt-40 w-full relative">
    <div
        class="w-full h-full bg-white block rounded-md pb-3 text-left transition-all product-hover relative hover:bg-white pt-24 hover:-translate-y-3"
        style="box-shadow: 7px 7px 6.1px 0px #0000000D"
    >
      <img
          :src="productData.image_url"
          alt=""
          class="w-full min-w-full h-[210px] object-contain mx-auto mb-4 transition-all absolute -top-1/2 left-0">
      <div
          v-if="productData.is_colorable"
          class="absolute left-3 top-3 w-8 h-8 flex items-center justify-center">
        <img
            class="w-6 h-6"
            src="@/assets/img/rgb.png"
            alt="">
      </div>
      <div
          class="absolute right-3 top-3 p-2 w-8 h-8 rounded-full bg-[#F0DFDF] flex items-center justify-center cursor-pointer">
        <svg
            v-if="productData.is_favourite"
            @click="products.removeFromFavouriteProducts(productData.id)"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            class="size-6 text-mainColor">
          <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
        </svg>

        <svg
            v-else
            @click="products.addToFavouriteProducts(productData.id)"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6 text-mainColor">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>


      </div>
      <NuxtLink :to="localePath('/store/' + productData.id)" class="px-4 flex flex-col gap-2 relative">
        <div v-if="productData.rating" class="flex gap-1 items-center">
          <svg class="size-6 text-[#FFE814]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fill-rule="evenodd"/>
          </svg>
          <p class="ml-1 text-lg">{{ productData.rating?.rating }} ({{ productData.rating?.count }})</p>
        </div>
        <div v-else class="flex gap-1 items-center">
          <svg class="size-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fill-rule="evenodd"/>
          </svg>
          <p
              class="ml-1 text-lg">0.0 (0)</p>
        </div>
        <p class="text-[#191919] text-lg leading-6 truncate">
          {{ productData.title[cur_lang] }}
        </p>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-xl font-semibold">{{ productData.price_range[0] }}₸ - {{ productData.price_range[1] }}₸</p>
          </div>
          <NuxtLink
              :to="localePath(`/store/${productData.id}`)"
              class="w-10 h-10 text-mainColor transition-all p-2 flex items-center justify-center border border-mainColor rounded-full"
          >
            <ChevronRightIcon class="w-8 h-8"/>
          </NuxtLink>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>