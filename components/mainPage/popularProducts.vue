<script lang="ts" setup>
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
  await router.push({query: {}});
  await products.getProducts()
})
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <Heading
        :linkTitle="$t('mainPage.popular_products.link')"
        :title="$t('mainPage.popular_products.title')"
        class="!mb-0"
        link="/store"
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
            <ProductCard :itemIndex="index" :product-data="item"/>
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
