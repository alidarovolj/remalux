<script setup>
import {useNewsStore} from "~/stores/news.js";
import {useLanguagesStore} from "~/stores/languages.js";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Pagination from "~/components/general/pagination.vue";

const news = useNewsStore();
const {newsList} = storeToRefs(news);
const language = useLanguagesStore();
const {cur_lang} = language;

const {t} = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.news'), link: localePath('/news')},
]);

onMounted(async () => {
  await nextTick()
  await news.getNews();
});
</script>

<template>
  <div class="pb-16">
    <Breadcrumbs :links="links"/>
    <div class="bg-[#F0DFDF] relative py-16 mb-24">
      <div class="container mx-auto">
        <div class="text-4xl text-mainColor font-bold">
          <p>
            {{ $t('news.page_title.first') }}
          </p>
          <div class="flex items-center gap-2">
            <p>{{ $t('news.page_title.second') }}</p>
            <img
                src="~/assets/img/logos/mainLogo.svg"
                alt="">
          </div>
        </div>
      </div>
      <img
          class="absolute right-0 top-0 h-full w-auto"
          src="~/assets/img/products/main.png"
          alt="">
    </div>
    <div
        v-if="newsList"
        class="container mx-auto px-4 lg:px-0">
      <div class="flex flex-col gap-10">
        <div
            v-for="(news, index) in newsList.data"
            :key="news.id"
            :class="{ 'flex-row-reverse' : index % 2 === 0 }"
            class="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center">
          <img
              class="w-full md:w-1/2 min-w-[50%] h-[414px] object-cover rounded-t-lg"
              :src="news.image_url"
              alt="">
          <div class="p-5 md:p-14">
            <h2 class="text-xl font-semibold mb-4">
              {{ news.title[cur_lang] }}
            </h2>
            <p
                class="text-sm text-gray-500 mb-8"
                v-html="news.description[cur_lang]">
            </p>
            <nuxt-link
                :to="localePath(`/news/${news.id}`)"
                class="text-mainColor border-2 border-mainColor py-2 px-7 rounded">
              {{ $t('news.read_more') }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <Pagination :meta-data="newsList.meta" />
    </div>
  </div>
</template>