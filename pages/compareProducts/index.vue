<template>
  <div>
    <Breadcrumbs :links="links"/>
    <div class="container mx-auto px-4 md:px-0">
      <div class="my-8">
        <!-- Заголовок -->
        <div class="flex">
          <h1 class="w-full md:w-1/4 text-2xl font-medium border-r pr-4">
            {{ t('compare.list') }}
          </h1>
          <div
              v-for="(item, index) of compareCookie.allProducts"
              :key="index"
              class="w-full md:w-1/4 text-center border-r px-2 relative"
          >
            <TrashIcon
                class="w-6 h-6 absolute top-0 right-2 cursor-pointer text-red-500"
                @click="compareCookie.removeCookie(item)"
            />
            <p class="text-base font-medium font-montserrat mb-2 whitespace-nowrap pt-7">
              {{ item.title[cur_lang] }}
            </p>
            <img
                class="w-full h-44 object-contain mx-auto mb-3"
                :src="item.image_url"
                alt=""
            />
            <p class="text-xl font-semibold mb-3">
              {{ item.price_range[0] }}₸ - {{ item.price_range[1] }}₸
            </p>
            <div class="flex gap-1 items-center justify-center">
              <svg
                  class="w-6 h-6 text-[#FFE814]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    clip-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    fill-rule="evenodd"
                />
              </svg>
              <p class="ml-1 text-lg">
                {{ item.rating?.rating }} ({{ item.rating?.count }})
              </p>
            </div>
          </div>
          <router-link
              :to="localePath('/store')"
              class="w-full md:w-1/4 text-center px-2 relative flex flex-col justify-center cursor-pointer">
            <img
                class="w-full h-32 object-contain mx-auto mb-3"
                src="@/assets/img/colors/paint.png"
                alt="">
            <div class="flex gap-3 items-center justify-center">
              <PlusIcon
                  class="w-8 h-8 text-mainColor bg-[#F0DFDF] p-2 rounded-full"
              />
              <p class="text-base">
                {{ t('compare.add_product') }}
              </p>
            </div>
          </router-link>
        </div>

        <!-- Другие характеристики -->
        <div v-for="(section, index) in sections" :key="index" class="flex mt-4">
          <h1 class="w-full md:w-1/4 text-base font-semibold border-r py-3 pr-4">
            {{ section.title }}
          </h1>
          <div
              v-for="(item, idx) of compareCookie.allProducts"
              :key="idx"
              class="w-full md:w-1/4 text-center flex items-center justify-center border-r px-2"
          >
            <p class="text-xl">{{ section.getValue(item) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useCompareCookieStore} from "~/stores/compareCookie";
import {useLanguagesStore} from "~/stores/languages";
import {storeToRefs} from "pinia";
import {TrashIcon, PlusIcon} from "@heroicons/vue/24/outline"

const {t} = useI18n();
const localePath = useLocalePath();
const compareCookie = useCompareCookieStore();
const languages = useLanguagesStore();
const {cur_lang} = storeToRefs(languages);

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.compare'), link: localePath('/compareProducts')},
]);

onMounted(async () => {
  await nextTick();
  await compareCookie.getCompareProducts();
});

const sections = computed(() => [
  {
    title: t("compare.colorable"),
    getValue: (item) => (item.is_colorable ? t("compare.yes") : t("compare.no")),
  },
  {
    title: t("compare.expense"),
    getValue: (item) => `${item.expense} ${t("compare.metrika")}`,
  },
]);

useHead({
  title: t("headers.compareProducts.title"),
  meta: [
    {
      property: "description",
      content: t("headers.compareProducts.description"),
    },
    {
      property: "og:description",
      content: t("headers.compareProducts.description"),
    },
    {
      property: "og:title",
      content: t("headers.compareProducts.title"),
    },
    {
      property: "og:url",
      content: t("headers.compareProducts.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.compareProducts.canonical")}],
});
</script>
