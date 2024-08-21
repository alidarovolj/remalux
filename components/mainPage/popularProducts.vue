<script setup lang="ts">
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import ProductCard from "~/components/cards/productCard.vue";
import {useProductsStore} from "~/stores/products";
import ProductsPreloader from "~/components/general/productsPreloader.vue";

const localePath = useLocalePath();
const products = useProductsStore()
const router = useRouter()

const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 4,
    snapAlign: "start"
  }
})

onMounted(async () => {
  await nextTick()
  await router.push({ query: {} });
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
          class="flex gap-2 items-center text-mainColor hover:border-b hover:border-mainColor transition-all">
        <p class="text-sm md:text-xl">
          {{ $t('mainPage.popular_products.link') }}
        </p>
        <ChevronRightIcon class="w-5 h-5"/>
      </NuxtLink>
    </div>
    <div v-if="products.productsList">
      <client-only>
        <my-carousel-carousel
            :breakpoints="breakpoints"
            :mouse-drag="true"
            :touch-drag="true"
            :wrap-around="true"
            :autoplay="4000"
        >
          <my-carousel-slide
              v-for="(item, index) of products.productsList.data"
              :key="index"
          class="px-2">
            <ProductCard :product-data="item" :itemIndex="index" />
          </my-carousel-slide>
          <template #addons>
            <my-carousel-navigation/>
            <my-carousel-pagination/>
          </template>
        </my-carousel-carousel>
      </client-only>
    </div>
    <ProductsPreloader v-else/>
  </div>
</template>
