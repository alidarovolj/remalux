<script setup>
import {useCategoriesStore} from "~/stores/categories.js";
import {useLanguagesStore} from "~/stores/languages.js";

const categories = useCategoriesStore()
const { categoriesList } = storeToRefs(categories)
const languages = useLanguagesStore()
const { cur_lang } = storeToRefs(languages)
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 mt-40 mb-32">
    <div v-if="categoriesList">
      <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        <div
            v-for="(category, index) in categoriesList.data"
            :key="index"
            class="w-full set_shadow rounded-xl flex items-center bg-white">
          <div class="flex flex-col gap-5 w-2/3 pl-7">
            <p class="text-2xl font-bold">
              {{ category.title[cur_lang] }}
            </p>
<!--            <p class="text-xs text-[#525252]">-->
<!--              {{ $t('mainPage.choose_type.coating.description') }}-->
<!--            </p>-->
          </div>
          <img
              class="w-1/3 h-[190px] rounded-tr-xl rounded-br-xl object-cover object-right"
              :src="category.image_url"
              alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.set_shadow {
  box-shadow: 7px 7px 20px 0px #0000000D;
}
</style>