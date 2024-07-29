<script setup>
import {CalculatorIcon, MinusIcon, PlusIcon} from "@heroicons/vue/24/outline";
import {useProductsStore} from "~/stores/products.js";
import {useLanguagesStore} from "~/stores/languages.js";
import ProductCard from "~/components/cards/productCard.vue";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import {storeToRefs} from "pinia";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useVuelidate} from "@vuelidate/core";
import {email, required} from "@vuelidate/validators";
import {useNotificationStore} from "~/stores/notifications.js";
import {useCartStore} from "~/stores/cart.js";

const products = useProductsStore();
const cart = useCartStore()
const loading = ref(false);
const notifications = useNotificationStore()
const prod_var = ref(null);
const {detailProduct, sameProducts, productsList} = storeToRefs(products);
const route = useRoute();
const language = useLanguagesStore();
const {cur_lang} = storeToRefs(language);
const activeTab = ref(1);
const localePath = useLocalePath();
const calculatorActive = ref(false);
const {t} = useI18n();

const form = ref({
  product_id: null,
  variant: null,
  quantity: 1,
  width: 10,
  height: 10,
  layers: 2,
});

const addToCart = ref({
  product_variant_id: null,
  quantity: 1,
})

const v$ = useVuelidate({
  product_variant_id: {required},
  quantity: {required},
}, addToCart);

const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  700: {
    itemsToShow: 3,
    snapAlign: "start",
  },
});

onMounted(async () => {
  await nextTick();
  await products.getDetailProduct(route.params.id);
  await products.getSameProducts(route.params.id);
  await products.getProducts();
});

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.store'), link: localePath('/store')},
  {title: detailProduct.value?.title[cur_lang.value], link: localePath(`/store/${route.params.id}`)},
]);

const totalArea = computed(() => {
  return form.value.width * form.value.height;
});

const paintNeeded = computed(() => {
  return (totalArea.value * form.value.layers) / 3.5; // 3.5 - условный расход краски на м2
});

const addToCartLocal = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    const response = await api(`/api/carts/add`, "POST", {
      body: JSON.stringify(addToCart.value)
    }, route.query);

    notifications.showNotification("success", "Успешно", "Вы успешно добавили товар в корзину");

    await nextTick()
    await cart.getCart()
  } catch (e) {
    if (e.response) {
      if (e.response.status !== 500) {
        notifications.showNotification("error", "Произошла ошибка", e.response.data.message);
      } else {
        notifications.showNotification("error", "Ошибка сервера!", "Попробуйте позже.");
      }
    } else {
      console.error(e);
      notifications.showNotification("error", "Произошла ошибка", "Неизвестная ошибка");
    }
  }

}
</script>

<template>
  <Breadcrumbs :links="links"/>
  <div class="py-20">
    <div class="container mx-auto px-4 lg:px-0">
      <div v-if="detailProduct && sameProducts && productsList">
        <div class="flex flex-col md:flex-row items-start gap-7 mb-16">
          <div class="h-auto md:h-[420px] w-full md:w-1/2 rounded-xl border-2 border-mainColor border-dashed relative">
            <div class="w-[210px] h-[210px] absolute left-0 bottom-0">
              <img
                  :src="detailProduct.image_url"
                  alt="product"
                  class="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>
          <div class="w-full md:w-1/2 shadow-xl flex flex-col gap-8 p-7 rounded-xl">
            <h1 class="text-3xl font-bold text-mainColor">
              {{ detailProduct.title[cur_lang] }}
            </h1>
            <p class="text-sm text-[#7B7B7B]">
              {{ $t('products.details.article') }}: {{ detailProduct.article }}
            </p>
            <p
                v-if="!prod_var"
                class="text-4xl text-mainColor">
              {{ detailProduct.price_range }}
            </p>
            <p
                v-else
                class="text-4xl text-mainColor">
              {{ prod_var }}₸
            </p>
            <div>
              <p class="mb-4">
                {{ $t('products.details.weight') }}
              </p>
              <div class="flex gap-3">
                <button
                    @click="form.variant = item.id; prod_var = item.price; addToCart.product_variant_id = item.id"
                    v-for="(item, index) of detailProduct.product_variants"
                    :class="[{ 'bg-mainColor text-white': form.variant === item.id }, { '!border !border-red-500': v$.product_variant_id.$error }]"
                    :key="index"
                    class="transition-all font-normal w-full text-center text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                >
                  {{ item.value }}{{ $t('products.details.kg') }}
                </button>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-6">
              <div class="w-full md:w-1/3">
                <p class="mb-4">
                  {{ $t('products.details.quantity') }}
                </p>
                <div class=" flex border-[#F0DFDF] border px-5 py-3 rounded-lg justify-between">
                  <button
                      @click="addToCart.quantity = addToCart.quantity - 1"
                      class="text-[#7B7B7B]"
                  >
                    <MinusIcon class="w-5 h-5"/>
                  </button>
                  <p class="text-[#7B7B7B] text-xl">
                    {{ addToCart.quantity }}
                  </p>
                  <button
                      @click="addToCart.quantity = addToCart.quantity + 1"
                      class="text-[#7B7B7B]"
                  >
                    <PlusIcon class="w-5 h-5"/>
                  </button>
                </div>
              </div>
              <div class="w-full md:w-2/3">
                <p class="mb-4">
                  {{ $t('products.details.paint_calculator') }}
                </p>
                <div
                    @click="calculatorActive = !calculatorActive"
                    class="transition-all border-[#F0DFDF] text-xl border px-5 py-3 rounded-lg flex text-mainColor items-center justify-center gap-3 cursor-pointer hover:bg-mainColor hover:text-white"
                >
                  <CalculatorIcon class="w-5 h-5"/>
                  <p>
                    {{ $t('products.details.calculate') }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="calculatorActive">
              <div class="flex gap-4 items-end">
                <div>
                  <p class="mb-4">
                    {{ $t('products.details.width') }}:</p>
                  <div class="relative">
                    <input
                        type="number"
                        v-model="form.width"
                        class="pl-4 pr-10 transition-all font-normal w-full text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                        placeholder="10"
                    />
                    <p class="absolute top-1/2 -translate-y-1/2 right-4 text-2xl">
                      М
                    </p>
                  </div>
                </div>
                <p class="text-4xl">*</p>
                <div>
                  <p class="mb-4">
                    {{ $t('products.details.height') }}:</p>
                  <div class="relative">
                    <input
                        type="number"
                        v-model="form.height"
                        class="pl-4 pr-10 transition-all font-normal w-full text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                        placeholder="10"
                    />
                    <p class="absolute top-1/2 -translate-y-1/2 right-4 text-2xl">
                      М
                    </p>
                  </div>
                </div>
                <div>
                  <p class="mb-4">
                    {{ $t('products.details.layers') }}:
                  </p>
                  <input
                      type="number"
                      v-model="form.layers"
                      class="px-4 transition-all font-normal w-full text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                      placeholder="2"
                  />
                </div>
              </div>
              <div class="flex justify-between text-xl mt-8">
                <p>{{ $t('products.details.area') }}: <span class="text-mainColor">{{ totalArea }} м²</span></p>
                <p>{{ $t('products.details.on') }} {{ form.layers }} {{ $t('products.details.layer') }}: <span
                    class="text-mainColor">{{ paintNeeded.toFixed(2) }} {{ $t('products.details.liters') }}</span>
                </p>
              </div>
            </div>
            <button
                @click="addToCartLocal"
                class="bg-mainColor text-white rounded-xl w-full py-4">
              {{ $t('products.details.add_to_cart') }}
            </button>
          </div>
        </div>
        <div class="border-b border-[#F0DFDF] flex mb-9">
          <button
              @click="activeTab = 1"
              :class="{ '!border-mainColor text-mainColor': activeTab === 1 }"
              class="border-b border-[#F0DFDF] px-11 py-4 font-semibold text-xl"
          >
            {{ $t('products.details.tabs.description') }}
          </button>
          <button
              @click="activeTab = 2"
              :class="{ '!border-mainColor text-mainColor': activeTab === 2 }"
              class="border-b border-[#F0DFDF] px-11 py-4 font-semibold text-xl"
          >
            {{ $t('products.details.tabs.details') }}
          </button>
          <button
              @click="activeTab = 3"
              :class="{ '!border-mainColor text-mainColor': activeTab === 3 }"
              class="border-b border-[#F0DFDF] px-11 py-4 font-semibold text-xl"
          >
            {{ $t('products.details.tabs.certificates') }}
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
              {{ $t('products.details.also_bought') }}
            </p>
            <div class="border rounded-xl border-[#F0DFDF]">
              <div
                  v-for="(item, index) of productsList.data"
                  :key="index"
                  class="flex gap-5 items-center p-3 border-b border-[#F0DFDF]"
              >
                <img
                    :src="item.image_url"
                    alt="product"
                    class="w-[110px] h-[110px] object-contain rounded-xl"
                />
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
              style="box-shadow: 0px 6px 6.4px -4px #00000026;"
          >
            <h2 class="text-lg md:text-3xl font-bold">
              {{ $t('products.details.similar_products') }}
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
                    :key="index"
                >
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
