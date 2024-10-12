<script setup>
import { useLanguagesStore } from "~/stores/languages.js";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";

const news = useNewsStore();
const { newsDetail } = storeToRefs(news);
const route = useRoute();
const language = useLanguagesStore();
const { cur_lang } = storeToRefs(language);
const localePath = useLocalePath();
const { t } = useI18n();

const links = computed(() => [
  { title: t("breadcrumbs.home"), link: localePath("/") },
  { title: t("breadcrumbs.news"), link: localePath("/news") },
  {
    title: newsDetail.value.title[cur_lang.value],
    to: localePath(`/news/${route.params.id}`),
  },
]);

onMounted(async () => {
  await nextTick();
  await news.getDetailNews(route.params.id);
});

const dynamicTitle = computed(() => {
  return newsDetail.value?.title[cur_lang.value] + " - Remalux";
});

const dynamicMeta = computed(() => {
  return [
    {
      property: "description",
      content: t("headers.store.description"),
    },
    {
      property: "og:description",
      content: t("headers.store.description"),
    },
    {
      property: "og:title",
      content: dynamicTitle.value,
    },
    {
      property: "og:url",
      content: `${t("headers.store.og_url")}/${route.params.id}`,
    },
  ];
});

const dynamicLink = computed(() => {
  return [
    {
      rel: "canonical",
      href: `${t("headers.news.canonical")}/${route.params.id}`,
    },
  ];
});

useHead({
  title: dynamicTitle,
  meta: dynamicMeta,
  link: dynamicLink,
});
</script>

<template>
  <div v-if="newsDetail" class="pb-32">
    <Breadcrumbs :links="links" />
    <div class="container mx-auto px-4 lg:px-0">
      <img
        :src="newsDetail.image_url"
        alt=""
        class="w-full h-[200px] md:h-[440px] object-contain mb-12"
      />
      <h1 class="text-lg md:text-3xl font-semibold mb-6 font-montserrat">
        {{ newsDetail.title[cur_lang] }}
      </h1>
      <p
        class="text-sm md:text-xl mb-12"
        v-html="newsDetail.description[cur_lang]"
      ></p>
      <div
        class="text-sm md:text-base"
        v-html="newsDetail.content[cur_lang]"
      ></div>
    </div>
  </div>
</template>
