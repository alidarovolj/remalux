<script setup>
import {CalculatorIcon, MinusIcon, PlusIcon} from "@heroicons/vue/24/outline"
import {useProductsStore} from "~/stores/products.js";
import {useLanguagesStore} from "~/stores/languages.js";
import ProductCard from "~/components/cards/productCard.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline/index.js";
import ProductsPreloader from "~/components/general/productsPreloader.vue";

const products = useProductsStore()
const {detailProduct, sameProducts, productsList} = storeToRefs(products)
const route = useRoute()
const language = useLanguagesStore()
const {cur_lang} = storeToRefs(language)
const activeTab = ref(1)
const localePath = useLocalePath()

const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 3,
    snapAlign: "start"
  }
})

onMounted(async () => {
  await nextTick()
  await products.getDetailProduct(route.params.id)
  await products.getSameProducts(route.params.id)
  await products.getProducts()
})
</script>

<template>
  <div class="py-20">
    <div class="container mx-auto px-4 lg:px-0">
      <div v-if="detailProduct && sameProducts && productsList">
        <div class="flex flex-col md:flex-row items-start gap-7 mb-16">
          <div class="h-auto md:h-[420px] w-full md:w-1/2 rounded-xl border-2 border-mainColor border-dashed relative">
            <div class="w-[210px] h-[210px] absolute left-0 bottom-0">
              <img
                  :src="detailProduct.image_url"
                  alt="product"
                  class="w-full h-full object-contain rounded-xl">
            </div>
          </div>
          <div class="w-full md:w-1/2 shadow-xl flex flex-col gap-8 p-7 rounded-xl">
            <h1 class="text-3xl font-bold text-mainColor">
              {{ detailProduct.title[cur_lang] }}
            </h1>
            <p class="text-sm text-[#7B7B7B]">
              Артикул: {{ detailProduct.article }}
            </p>
            <div>
              <p class="mb-4">
                Вес
              </p>
              <div class="flex gap-3">
                <button
                    v-for="(item, index) of detailProduct.product_variants"
                    :key="index"
                    class="font-normal w-full text-center text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                >
                  {{ item.value }}кг
                </button>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-6">
              <div class="w-full md:w-1/3">
                <p class="mb-4">
                  Количество
                </p>
                <div class=" flex border-[#F0DFDF] border px-5 py-3 rounded-lg justify-between">
                  <button class="text-[#7B7B7B]">
                    <PlusIcon class="w-5 h-5"/>
                  </button>
                  <p class="text-[#7B7B7B] text-xl">
                    1
                  </p>
                  <button class="text-[#7B7B7B]">
                    <MinusIcon class="w-5 h-5"/>
                  </button>
                </div>
              </div>
              <div class="w-full md:w-2/3">
                <p class="mb-4">
                  Калькулятор краски:
                </p>
                <div
                    class="border-[#F0DFDF] text-xl border px-5 py-3 rounded-lg flex text-mainColor items-center justify-center gap-3">
                  <CalculatorIcon class="w-5 h-5 text-mainColor"/>
                  <p>Рассчитать</p>
                </div>
              </div>
            </div>
            <button class="bg-mainColor text-white rounded-xl w-full py-4">
              Добавить в корзину
            </button>
          </div>
        </div>
        <div class="border-b border-[#F0DFDF] flex mb-9">
          <button
              @click="activeTab = 1"
              :class="{ '!border-mainColor text-mainColor' : activeTab === 1 }"
              class="border-b border-[#F0DFDF] px-11 py-4 font-semibold text-xl">
            Описание
          </button>
          <button
              @click="activeTab = 2"
              :class="{ '!border-mainColor text-mainColor' : activeTab === 2 }"
              class="border-b border-[#F0DFDF] px-11 py-4 font-semibold text-xl">
            Детали
          </button>
          <button
              @click="activeTab = 3"
              :class="{ '!border-mainColor text-mainColor' : activeTab === 3 }"
              class="border-b border-[#F0DFDF] px-11 py-4 font-semibold text-xl">
            Сертификаты
          </button>
        </div>
        <div class="flex flex-col md:flex-row mb-24">
          <div class="w-full md:w-2/3">
            <div v-if="activeTab === 1">
              <p class="text-black" v-html="detailProduct.description[cur_lang]"></p>
            </div>
          </div>
          <div class="w-full md:w-1/3">
            <p class="text-mainColor text-2xl font-bold mb-9">
              С этим товаром покупают
            </p>
            <div class="border rounded-xl border-[#F0DFDF]">
              <div
                  v-for="(item, index) of productsList.data"
                  :key="index"
                  class="flex gap-5 items-center p-3 border-b border-[#F0DFDF]">
                <img
                    :src="item.image_url"
                    alt="product"
                    class="w-[110px] h-[110px] object-contain rounded-xl">
                <div>
                  <p class="text-black text-lg font-semibold">
                    {{ item.title[cur_lang] }}
                  </p>
                  <p class="text-black text-lg">
                    {{ item.category.title[cur_lang] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-start">
          <div
              class="flex justify-between items-center pb-3"
              style="box-shadow: 0px 6px 6.4px -4px #00000026;">
            <h2 class="text-lg md:text-3xl font-bold">
              Похожие товары
            </h2>
          </div>
          <div v-if="products.productsList">
            <client-only>
              <my-carousel-carousel
                  :breakpoints="breakpoints"
                  :mouse-drag="true"
                  :touch-drag="true"
              >
                <my-carousel-slide
                    v-for="(item, index) of products.productsList.data"
                    :key="index">
                  <ProductCard :product-data="item"/>
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
      </div>
    </div>
  </div>
</template>