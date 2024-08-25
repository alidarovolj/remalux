<script setup>
import {useLanguagesStore} from "~/stores/languages.js";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";

const news = useNewsStore()
const {newsDetail} = storeToRefs(news)
const route = useRoute()
const language = useLanguagesStore()
const {cur_lang} = storeToRefs(language)
const localePath = useLocalePath()
const {t} = useI18n()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.news'), link: localePath('/news')},
  {title: newsDetail.value.title[cur_lang.value], to: localePath(`/news/${route.params.id}`)},
])

onMounted(async () => {
  await nextTick()
  await news.getDetailNews(route.params.id)
})
</script>

<template>
  <div
      v-if="newsDetail"
      class="pb-32">
    <Breadcrumbs :links="links"/>
    <div class="container mx-auto px-4 lg:px-0">
      <img
          :src="newsDetail.image_url"
          alt=""
          class="w-full h-[440px] object-contain mb-12">
      <h1 class="text-3xl font-semibold mb-6 font-montserrat">
        {{ newsDetail.title[cur_lang] }}
      </h1>
      <p class="text-xl mb-12" v-html="newsDetail.description[cur_lang]"></p>
      <div v-html="newsDetail.content[cur_lang]"></div>
    </div>
  </div>
</template>