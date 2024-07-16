<script setup lang="ts">
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import ProductCard from "~/components/cards/productCard.vue";
import {useProductsStore} from "~/stores/products";
import ProductsPreloader from "~/components/general/productsPreloader.vue";

const localePath = useLocalePath();
const products = useProductsStore()

onMounted(async () => {
  await nextTick()
  await products.getProducts()
})
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 mb-36">
    <div
        class="flex justify-between items-center pb-3"
        style="box-shadow: 0px 6px 6.4px -4px #00000026;">
      <h2 class="text-lg md:text-3xl font-bold">
        {{ $t('mainPage.popular_products.title') }}
      </h2>
      <NuxtLink
          :to="localePath('/')"
          class="flex gap-2 items-center text-mainColor">
        <p class="text-sm md:text-xl">
          {{ $t('mainPage.popular_products.link') }}
        </p>
        <ChevronRightIcon class="w-5 h-5"/>
      </NuxtLink>
    </div>
    <div
        v-if="products.productsList"
        class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
      <div
          v-for="(item, index) in products.productsList.data"
          :key="index"
          class="">
        <ProductCard :product-data="item" />
      </div>
    </div>
    <ProductsPreloader v-else/>
  </div>
</template>
