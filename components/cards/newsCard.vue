<script setup>
import {useLanguagesStore} from "~/stores/languages.js";
import {NewspaperIcon} from "@heroicons/vue/24/outline"

const props = defineProps(['postData', 'itemIndex']);
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)

const localePath = useLocalePath()
</script>

<template>
  <div
      v-if="postData"
      :data-aos-duration="itemIndex * 300"
      class="w-full h-[420px] relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 pt-80 sm:pt-48 lg:pt-80 text-start news-card"
      data-aos="fade-up">
    <div>
      <img :src="postData.image_url" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover transition-all"/>

      <div class="bg-white bg-opacity-15 set-backdrop py-4 px-6 text-white hover:py-5 transition-all">
        <div class="flex items-center gap-2">
          <NewspaperIcon class="w-8 h-8 min-w-8 min-h-8 text-white"/>
          <h3 class="text-lg font-semibold truncate">
            <NuxtLink :to="localePath(`/news/${postData.id}`)">
              <span class="absolute inset-0"/>
              {{ postData.title[cur_lang] }}
            </NuxtLink>
          </h3>
        </div>
        <p
            class="text-sm font-light truncate-2-lines"
            v-html="postData.description[cur_lang]"></p>
      </div>
    </div>
  </div>
</template>

<style>
.set-backdrop {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.news-card:hover img {
  transform: scale(1.1);
}
</style>