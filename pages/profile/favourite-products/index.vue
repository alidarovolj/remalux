<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {PlusIcon, TrashIcon, TruckIcon, HeartIcon} from "@heroicons/vue/24/outline"
import {storeToRefs} from "pinia";
import ColorCard from "~/components/cards/colorCard.vue";
import NoResults from "~/components/general/noResults.vue";
import {useProductsStore} from "~/stores/products.js";
import ProductCard from "~/components/cards/productCard.vue";

const {t} = useI18n()
const localePath = useLocalePath()
const modals = useModalsStore()
const products = useProductsStore()
const {favouriteProducts} = storeToRefs(products)

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.profile'), link: localePath('/profile')},
  {title: t('breadcrumbs.favourite-products'), link: localePath('/profile/favourite-products')},
]);

onMounted(async () => {
  await nextTick()
  await products.getFavouriteProducts()
})

useHead({
  title: t("headers.addresses.title"),
  meta: [
    {
      property: "description",
      content: t("headers.addresses.description"),
    },
    {
      property: "og:description",
      content: t("headers.addresses.description"),
    },
    {
      property: "og:title",
      content: t("headers.addresses.title"),
    },
    {
      property: "og:url",
      content: t("headers.addresses.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.addresses.canonical")}],
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <NuxtLayout name="profile">
      <div class="bg-white p-6 rounded-2xl set_shadow">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 mb-6">
            <HeartIcon class="w-8 h-8 text-mainColor"/>
            <h1 class="text-xl font-medium">
              {{ $t('breadcrumbs.favourite-products') }}
            </h1>
          </div>
        </div>
        <div v-if="favouriteProducts">
          <div
              v-if="favouriteProducts.data.length > 0"
              class="grid grid-cols-2 gap-y-5 sm:grid-cols-3 sm:gap-x-5">
            <div
                v-for="(item, index) of favouriteProducts.data"
                :key="index"
                class="w-full rounded-2xl flex items-center justify-between">
              <ProductCard
                  :productData="item.product"
                  :itemIndex="index"
              />
            </div>
          </div>
          <NoResults v-else/>

        </div>
        <div v-else class="spinner p-3"></div>
      </div>
    </NuxtLayout>
  </div>
</template>