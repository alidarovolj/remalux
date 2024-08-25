<script setup>
import {CalculatorIcon, MinusIcon, PlusIcon} from "@heroicons/vue/24/outline";
import {useProductsStore} from "~/stores/products.js";
import {useLanguagesStore} from "~/stores/languages.js";
import {storeToRefs} from "pinia";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useNotificationStore} from "~/stores/notifications.js";
import {useCartStore} from "~/stores/cart.js";
import {useAuthStore} from "~/stores/auth.js";
import img1 from "~/assets/img/store/1.png";
import img2 from "~/assets/img/store/2.png";
import img3 from "~/assets/img/store/3.png";
import img4 from "~/assets/img/store/4.png";
import img5 from "~/assets/img/store/5.png";
import {useModalsStore} from "~/stores/modals.js";

const products = useProductsStore();
const cart = useCartStore()
const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)
const loading = ref(false);
const notifications = useNotificationStore()
const prod_var = ref(null);
const {detailProduct, sameProducts, productsList} = storeToRefs(products);
const route = useRoute();
const router = useRouter()
const language = useLanguagesStore();
const {cur_lang} = storeToRefs(language);
const activeTab = ref(1);
const localePath = useLocalePath();
const calculatorActive = ref(false);
const {t} = useI18n();
const modals = useModalsStore()
const imagesCarousel = ref(null);

const images = ref([
  img1, img2, img3, img4, img5
])

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
});

onMounted(async () => {
  await nextTick();
  await products.getDetailProduct(route.params.id);
  await products.getSameProducts(route.params.id);
  await products.getRelatedProducts(route.params.id);
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
  return (totalArea.value * form.value.layers) / 3.5;
});

const addToCartLocal = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  if (!token.value) {
    notifications.showNotification("error", "Ошибка", "Для добавления товара в корзину необходимо авторизоваться.");
    loading.value = false;
    await router.push(localePath('/login'));
    return;
  } else {
    try {
      const response = await api(`/api/carts/add`, "POST", {
        body: JSON.stringify(addToCart.value)
      }, route.query);

      notifications.showNotification("success", "Успешно", "Вы успешно добавили товар в корзину");

      await nextTick()
      await cart.getCart()
      await modals.showModal('shopOrCart', detailProduct.value)
    } catch (e) {
      notifications.showNotification("error", "Произошла ошибка", e);
    }
  }

}
</script>

<template>
  <div class="pb-32">
    <Breadcrumbs :links="links"/>
    <div
        class="bg-white py-10 mb-10"
        style="box-shadow: 0px 4px 15px 0px #0000000D;">
      <div class="container mx-auto px-4 lg:px-0">
        <div v-if="detailProduct && sameProducts && productsList">
          <div class="flex flex-col md:flex-row items-start gap-7">
            <div
                class="h-auto md:h-[420px] w-full md:w-3/5 rounded-xl border-2 border-[#7B7B7B40] border-dashed relative">

              <div class="w-[150px] h-[150px] absolute left-0 bottom-0 z-20 bg-white rounded-tr-lg">
                <img
                    :src="detailProduct.image_url"
                    alt="product"
                    class="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div
                  v-if="colorCookie || !products.detailProduct.is_colorable"
                  class="w-full h-full product-carousel">
                <client-only>
                  <my-carousel-carousel
                      ref="imagesCarousel"
                      :autoplay="4000"
                      :breakpoints="breakpoints"
                      :mouse-drag="true"
                      :touch-drag="true"
                      :wrap-around="true"
                      class="w-full h-full"
                  >
                    <my-carousel-slide
                        v-for="(item, index) of images"
                        :key="index">
                      <div
                          :class="[{ 'bg-white' : !products.detailProduct.is_colorable }]"
                          class="w-full h-full absolute left-0 top-0"></div>
                      <img :src="item" alt="" class="w-full h-full absolute left-0 top-0 z-10">
                    </my-carousel-slide>
                    <template #addons="{ currentSlide, slidesCount }">
                      <div
                          class="flex justify-center gap-4 w-full md:pl-14 overflow-x-auto"
                      >
                        <div
                            v-for="(painting, index) of images"
                            :key="index"
                            class="bg-cardBg dark:bg-dElement cursor-pointer dark:text-dText"
                        >
                          <img
                              :src="painting"
                              alt=""
                              class="max-w-36 max-h-36 min-w-36 min-h-36 object-contain"
                          />
                        </div>
                      </div>
                    </template>
                  </my-carousel-carousel>
                </client-only>
              </div>

              <NuxtLink
                  v-else
                  :to="localePath('/colors')"
                  class="py-6 rounded flex items-center gap-4 justify-center mb-8 cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div class="rounded-full flex items-center justify-center">
                  <PlusIcon class="w-7 h-7 bg-[#F0DFDF] text-mainColor rounded-full p-1"/>
                </div>
                <p class="text-xl text-mainColor">
                  {{ $t('products.details.choose_color') }}
                </p>
              </NuxtLink>
            </div>
            <div
                class="w-full md:w-2/5 flex flex-col p-8 rounded-xl relative"
                style="box-shadow: 0px 0px 20px 0px #0000000D;"
            >
              <div class="absolute right-8 top-8 w-8 h-8 rounded-full bg-[#F0DFDF] flex items-center justify-center">
                <svg
                    v-if="detailProduct.title[cur_lang]"
                    class="size-5 w-5 h-5 text-mainColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      clip-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill-rule="evenodd"
                  />
                </svg>
                <svg
                    v-else
                    class="size-5 w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      clip-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill-rule="evenodd"
                  />
                </svg>

              </div>
              <h1 class="text-3xl font-medium font-montserrat mb-4 w-[90%]">
                {{ detailProduct.title[cur_lang] }}
              </h1>
              <p class="text-sm text-[#7B7B7B] mb-8">
                {{ $t('products.details.article') }}: {{ detailProduct.article }}
              </p>
              <div class="flex items-center gap-1 mb-8">
                <svg
                    v-for="(item, index) of 5"
                    :key="index"
                    class="size-6 text-mainColor" fill="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill-rule="evenodd"/>
                </svg>
                <p class="ml-1 text-lg">4.5 (265)</p>
              </div>
              <p
                  v-if="!prod_var"
                  class="text-2xl mb-8">
                {{ detailProduct.price_range }}
              </p>
              <p
                  v-else
                  class="text-2xl mb-8">
                {{ prod_var }}₸
              </p>
              <NuxtLink
                  v-if="products.detailProduct.is_colorable"
                  :to="localePath('/colors')"
                  class="border border-[#7B7B7B40] border-dashed py-6 rounded flex items-center gap-4 justify-center mb-8 cursor-pointer">
                <div class="rounded-full flex items-center justify-center">
                  <PlusIcon class="w-7 h-7 bg-[#F0DFDF] text-mainColor rounded-full p-1"/>
                </div>
                <p class="text-xl text-mainColor">
                  {{ $t('products.details.choose_color') }}
                </p>
              </NuxtLink>
              <div class="mb-8">
                <p class="mb-4">
                  {{ $t('products.details.weight') }}
                </p>
                <div class="flex gap-3">
                  <button
                      v-for="(item, index) of detailProduct.product_variants"
                      :key="index"
                      :class="[{ 'bg-mainColor text-white': form.variant === item.id }, { '!border !border-red-500': v$.product_variant_id.$error }]"
                      class="transition-all px-6 w-max text-center text-xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                      @click="form.variant = item.id; prod_var = item.price; addToCart.product_variant_id = item.id"
                  >
                    {{ item.value }}{{ $t('products.details.kg') }}
                  </button>
                </div>
              </div>
              <div class="flex flex-col md:flex-row gap-6 mb-8">
                <div class="w-full md:w-1/3">
                  <p class="mb-4">
                    {{ $t('products.details.quantity') }}
                  </p>
                  <div class=" flex border-[#F0DFDF] border px-5 py-3 rounded-lg justify-between">
                    <button
                        :class="{ 'text-mainColor' : addToCart.quantity !== 1 }"
                        class="text-[#7B7B7B]"
                        @click="addToCart.quantity > 1 && (addToCart.quantity = addToCart.quantity - 1)"
                    >
                      <MinusIcon class="w-5 h-5"/>
                    </button>
                    <p class="text-[#7B7B7B] text-xl">
                      {{ addToCart.quantity }}
                    </p>
                    <button
                        class="text-mainColor"
                        @click="addToCart.quantity = addToCart.quantity + 1"
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
                      class="transition-all border-[#F0DFDF] text-xl border px-5 py-3 rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-mainColor hover:text-white"
                      @click="calculatorActive = !calculatorActive"
                  >
                    <CalculatorIcon
                        class="w-5 h-5"
                    />
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
                          v-model="form.width"
                          class="pl-4 pr-10 transition-all font-normal w-full text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                          placeholder="10"
                          type="number"
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
                          v-model="form.height"
                          class="pl-4 pr-10 transition-all font-normal w-full text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                          placeholder="10"
                          type="number"
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
                        v-model="form.layers"
                        class="px-4 transition-all font-normal w-full text-2xl border border-[#7B7B7B] border-opacity-25 py-2 text-[#7B7B7B] rounded-lg"
                        placeholder="2"
                        type="number"
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
                  class="bg-white border border-mainColor text-xl font-montserrat text-mainColor rounded-xl w-full py-4 transition-all hover:bg-mainColor hover:text-white"
                  @click="addToCartLocal">
                {{ $t('products.details.add_to_cart') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container mx-auto px-4 md:px-0">
        <div class="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-32">
          <div class="w-full md:w-1/5">
            <div
                v-if="detailProduct"
                class="rounded-xl border border-[#F0DFDF] mb-10"
                style="box-shadow: 0px 0px 20px 0px #0000000D;"
            >
              <div class="p-6 rounded-t-xl bg-mainColor text-white font-semibold font-montserrat">
                <p>{{ $t('products.details.data') }}</p>
              </div>
              <div
                  v-for="(item, index) of detailProduct.filter_data"
                  :key="index"
                  :class="{ 'border-b border-[#F0DFDF]' : index !== detailProduct.filter_data.length - 1 }"
                  class="py-4 px-6"
              >
                <p class="font-medium font-montserrat">{{ item.title[cur_lang] }}</p>
                <p class="text-sm text-[#7B7B7B] font-montserrat">{{ item.value[cur_lang] }}</p>
              </div>
            </div>
            <div v-if="products.relatedProducts">
              <div
                  v-if="products.relatedProducts.data.length > 0"
                  class="rounded-xl border border-[#F0DFDF]"
                  style="box-shadow: 0px 0px 20px 0px #0000000D;"
              >
                <div class="p-6 rounded-t-xl bg-mainColor text-white font-semibold font-montserrat">
                  <p>{{ $t('products.details.also_bought') }}</p>
                </div>
                <div
                    v-for="(item, index) of products.relatedProducts.data"
                    :key="index"
                    :class="{ 'border-b border-[#F0DFDF]' : index !== products.relatedProducts.data.length - 1 }"
                    class="py-4 px-6 flex gap-6"
                >
                  <img
                      :src="item.image_url"
                      alt="product"
                      class="w-[60px] h-[60px] object-contain rounded-xl"
                  />
                  <div class="flex flex-col gap-3">
                    <p class="text-sm">
                      {{ item.title[cur_lang] }}
                    </p>
                    <p class="text-sm text-[#191919]">
                      {{ item.price_range }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
              v-if="detailProduct"
              class="w-full md:w-4/5 flex flex-col gap-10">
            <div>
              <p class="text-2xl font-medium text-mainColor mb-4 font-montserrat">
                Преимущества
              </p>
              <p v-html="detailProduct.description[cur_lang]"></p>
            </div>
            <div>
              <p class="text-2xl font-medium text-mainColor mb-4 font-montserrat">
                Подготовка поверхностей
              </p>
              <p v-html="detailProduct.description[cur_lang]"></p>
            </div>
            <div>
              <p class="text-2xl font-medium text-mainColor mb-4 font-montserrat">
                Сертификаты продукции
              </p>
              <p v-html="detailProduct.description[cur_lang]"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.product-carousel .carousel__viewport,
.product-carousel .carousel__track {
  height: 100%;
  width: 100%;
  padding: 0 !important
}

.product-carousel .carousel__slide img {
  height: 100%;
  object-fit: cover;
}
</style>