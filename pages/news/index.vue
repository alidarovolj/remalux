<script setup>
import {useNewsStore} from "~/stores/news.js";
import {useLanguagesStore} from "~/stores/languages.js";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Pagination from "~/components/general/pagination.vue";
import Banner from "~/components/general/banner.vue";

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
    <Banner
        :sec_title="$t('news.page_title.second')"
        :title="$t('news.page_title.first')"
        image="news"
        text_color="main"
    />
    <div
        v-if="newsList"
        class="container mx-auto px-4 lg:px-0">
      <div class="flex flex-col gap-10">
        <div
            v-for="(news, index) in newsList.data"
            :key="news.id"
            :class="{ 'flex-col md:!flex-row-reverse' : index % 2 === 0 }"
            :data-aos-duration="index * 500"
            class="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center"
            data-aos="fade-up">
          <img
              :src="news.image_url"
              alt=""
              class="w-full md:w-1/2 min-w-[50%] h-[414px] object-cover rounded-t-lg">
          <div class="p-5 md:p-14">
            <h2 class="text-xl font-semibold mb-4 font-montserrat">
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
      <Pagination :meta-data="newsList.meta"/>
    </div>
  </div>
</template>