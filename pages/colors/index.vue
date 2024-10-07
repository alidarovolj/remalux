<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Banner from "~/components/general/banner.vue";
import NoResults from "~/components/general/noResults.vue";
import Pagination from "~/components/general/pagination.vue";
import AOS from 'aos';
import {useColorCookieStore} from "~/stores/colorCookie";
import {useNotificationStore} from "~/stores/notifications.js";
import {CheckCircleIcon} from "@heroicons/vue/24/outline"
import {useColorForProductStore} from "~/stores/colorForProduct.js";
import {useProductsStore} from "~/stores/products.js";
import ColorCard from "~/components/cards/colorCard.vue";

const colors = useColorsStore()
const {colorsList, mainColorsList} = storeToRefs(colors)
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)
const localePath = useLocalePath()
const {t} = useI18n()
const router = useRouter()
const route = useRoute()
const savedColor = useColorCookieStore()
const {colorCookie} = storeToRefs(savedColor)
const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)
const notifications = useNotificationStore()
const modals = useModalsStore()
const prodCol = useColorForProductStore()
const products = useProductsStore()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.colors'), link: localePath('/colors')},
]);

const updateCategoryFilter = async (colorID) => {
  if (parseInt(route.query['filters[parentColor.id]']) === colorID) {
    delete route.query['filters[parentColor.id]']
    await router.push({
      query: {
        ...route.query,
        page: 1,
        perPage: 10
      }
    });
  } else {
    await router.push({
      query: {
        ...route.query,
        'filters[parentColor.id]': colorID,
        page: 1,
        perPage: 10
      }
    });
  }
  await colors.getColors()
};

onMounted(async () => {
  await nextTick()
  await colors.getColors()
  await colors.getMainColors()
  await colors.getFavouriteColors()
  if (prodCol.colorForProduct) {
    await products.getDetailProduct(prodCol.colorForProduct.id);
    await router.push({query: {...route.query, product_id: prodCol.colorForProduct.id}});
  }
})

watch(
    () => colorsList,
    async () => {
      await nextTick();
      AOS.refresh();
    }
);

useHead({
  title: t("headers.colors.title"),
  meta: [
    {
      property: "description",
      content: t("headers.colors.description"),
    },
    {
      property: "og:description",
      content: t("headers.colors.description"),
    },
    {
      property: "og:title",
      content: t("headers.colors.title"),
    },
    {
      property: "og:url",
      content: t("headers.colors.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.colors.canonical")}],
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <Banner
        :sec_title="$t('colors.sec_title')"
        :title="$t('colors.title')"
        image="colors"
        text_color="main"
    />
    <div class="container mx-auto px-4 md:px-0">
      <div>
        <p class="text-2xl font-montserrat font-medium mb-9">
          {{ $t('colors.choose_color') }}
        </p>
        <div v-if="mainColorsList" class="mb-10">
          <div v-if="mainColorsList.length > 0" class="flex">
            <div
                v-for="(item, index) in mainColorsList"
                @click="updateCategoryFilter(item.id)"
                :key="index"
                :style="{ background: item.hex }"
                class="color-block"
                :class="{ 'selected': parseInt(route.query['filters[parentColor.id]']) === item.id }"
            >
              <CheckCircleIcon
                  v-if="parseInt(route.query['filters[parentColor.id]']) === item.id"
                  class="check-icon invert"
              />
            </div>
          </div>
          <NoResults v-else/>
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-lg md:text-4xl font-medium font-montserrat border-b-2 border-[#F0DFDF] w-full pb-4">
          {{ $t('colors.style_text') }}
        </h2>
      </div>
      <div v-if="colorsList">
        <div
            v-if="colorsList.data.length > 0"
            class="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-x-5 md:grid-cols-6">
          <div
              v-for="(item, index) of colorsList.data"
              :key="index"
              :data-aos="'fade-up'"
              :data-aos-delay="index * 10"
          >
            <ColorCard :id="item.id" :hex="item.hex" :title="item.title" :ral="item.ral"/>
          </div>
        </div>
        <NoResults v-else/>
      </div>
      <div
          v-else
          class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
        <div
            v-for="(_, index) of 8"
            :key="index"
            class="set_shadow p-4 bg-white"
        >
          <div class="w-2/3 skeleton h-[212px] mx-auto mb-12"></div>
          <div class="w-full h-4 skeleton mb-3"></div>
          <div class="w-2/3 h-4 skeleton mb-3"></div>
          <div class="w-full h-8 skeleton mb-3"></div>
        </div>
      </div>
      <div v-if="colorsList">
        <Pagination
            :meta-data="colorsList.meta"
            @updatePage="colors.getColors()"
        />
      </div>
    </div>
  </div>
</template>

<style>
.color-block {
  width: 100%;
  height: 80px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, padding 0.3s ease-in-out;
  position: relative;
}

.color-block.selected {
  transform: scale(1.1); /* Increase size by 10% */
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10; /* Ensure selected block is above others */
}

.check-icon {
  position: absolute;
  left: 8px;
  top: 8px;
  width: 20px;
  height: 20px;
}
</style>
