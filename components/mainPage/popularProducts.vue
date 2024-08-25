<script setup lang="ts">
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import ProductCard from "~/components/cards/productCard.vue";
import {useProductsStore} from "~/stores/products";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import Heading from "~/components/general/heading.vue";

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
  <div class="container mx-auto px-4 lg:px-0">
    <Heading
        class="!mb-0"
        :title="$t('mainPage.popular_products.title')"
        link="/store"
        :linkTitle="$t('mainPage.popular_products.link')"
    />
    <div v-if="products.productsList">
      <client-only>
        <my-carousel-carousel
            :breakpoints="breakpoints"
            :mouse-drag="true"
            :touch-drag="true"
            :wrap-around="true"
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
