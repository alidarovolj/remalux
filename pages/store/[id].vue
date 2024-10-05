<script setup>
import {
  ArrowDownTrayIcon,
  CalculatorIcon,
  ClockIcon,
  CubeTransparentIcon,
  EyeDropperIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  MinusIcon,
  PaintBrushIcon,
  PlusIcon,
  ScaleIcon,
  Square3Stack3DIcon,
  SunIcon
} from "@heroicons/vue/24/outline";
import sert from "@/assets/pdf/sert.pdf"
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
import {useColorCookieStore} from "~/stores/colorCookie.js";
import {useColorForProductStore} from "~/stores/colorForProduct.js";
import ProductCard from "~/components/cards/productCard.vue";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import Heading from "~/components/general/heading.vue";

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
const savedColor = useColorCookieStore()
const {colorCookie} = storeToRefs(savedColor)
const localePath = useLocalePath();
const calculatorActive = ref(false);
const {t} = useI18n();
const modals = useModalsStore()
const imagesCarousel = ref(null);
const prodColor = useColorForProductStore()
const {colorForProduct} = storeToRefs(prodColor)
const compareCookie = useCompareCookieStore()

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
  color_id: null
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

const related = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  700: {
    itemsToShow: 3,
    snapAlign: "center",
  },
})

const addToFav = async () => {
  if (token.value) {
    await products.addToFavouriteProducts(detailProduct.value.id);
    await products.getDetailProduct(detailProduct.value.id)
  } else {
    notifications.showNotification("error", "Ошибка", "Для добавления товара в избранное необходимо авторизоваться.");
  }
}

const remFromFav = async () => {
  if (token.value) {
    await products.removeFromFavouriteProducts(detailProduct.value.id);
    await products.getDetailProduct(detailProduct.value.id)
  } else {
    notifications.showNotification("error", "Ошибка", "Для добавления товара в избранное необходимо авторизоваться.");
  }
}

const setHelpfulReview = async (form, comment) => {
  if (token.value) {
    if (comment.is_user_marked === false) {
      await products.setReviewHelpful(form, detailProduct.value.id, comment.id);
      await products.getProductReviews(detailProduct.value.id);
      await products.getProductReviewsRating(detailProduct.value.id);
    } else {
      notifications.showNotification("error", "Ошибка", "Вы уже оценили данный отзыв.");
    }
  } else {
    notifications.showNotification("error", "Ошибка", "Для оценки отзыва необходимо авторизоваться.");
  }
}

onMounted(async () => {
  await nextTick();
  await products.getDetailProduct(route.params.id);
  await products.getSameProducts(route.params.id);
  await products.getRelatedProducts(route.params.id);
  await products.getProductReviews(route.params.id);
  await products.getProductReviewsRating(route.params.id);
  // await products.isReviewed(route.params.id);
  await products.getProducts();
  if (products.savedVariant) {
    form.value.variant = products.savedVariant.id
    addToCart.value.product_variant_id = products.savedVariant.id
    prod_var.value = products.savedVariant.price;
  }
  if (colorCookie.value) {
    addToCart.value.color_id = colorCookie.value.id
  }
  console.log(addToCart.value.color_id)
});

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.store'), link: localePath('/store')},
  {title: detailProduct.value?.title[cur_lang.value], link: localePath(`/store/${route.params.id}`)},
]);

const reviews = computed(() => products.productReviews || []);
const productReviewsRating = computed(() => products.productReviewsRating || {});

const totalArea = computed(() => {
  return form.value.width * form.value.height;
});

const paintNeeded = computed(() => {
  return (totalArea.value * form.value.layers * detailProduct.value.expense) / 1000;
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

const dynamicTitle = computed(() => {
  return detailProduct.value?.title[cur_lang.value];
});

const dynamicMeta = computed(() => {
  return [
    {
      property: "description",
      content: t("headers.store.description"),
    },
    {
      property: "og:description",
      content: t("headers.store.description"),
    },
    {
      property: "og:title",
      content: dynamicTitle.value,
    },
    {
      property: "og:url",
      content: `${t("headers.store.og_url")}/${route.params.id}`,
    },
  ];
});

const dynamicLink = computed(() => {
  return [{rel: "canonical", href: `${t("headers.store.canonical")}/${route.params.id}`}];
});

useHead({
  title: dynamicTitle,
  meta: dynamicMeta,
  link: dynamicLink,
});
</script>

<template>
  <div class="pb-32">
    {{ compareCookie.compareCookie }}
    <Breadcrumbs :links="links"/>
    <div
        class="bg-white py-10 mb-10"
        style="box-shadow: 0px 4px 15px 0px #0000000D;">
      <div class="container mx-auto px-4 lg:px-0">
        <div v-if="detailProduct && sameProducts && productsList">
          <div class="flex flex-col md:flex-row items-start gap-7">
            <div
                :class="{ 'border-none' : colorCookie || !products.detailProduct.is_colorable }"
                class="h-auto md:h-[420px] w-full md:w-3/5 rounded-xl border-2 border-[#7B7B7B40] border-dashed hover:border-spacing-4 relative">

              <div
                  v-if="colorCookie && products.detailProduct.is_colorable"
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
                        :key="index"
                        class="md:h-full h-[150px]">
                      <div
                          :class="[{ 'bg-white' : !products.detailProduct.is_colorable }]"
                          class="w-full h-full absolute left-0 top-0 rounded-xl"
                          :style="`background: ${colorCookie.hex}`"
                      ></div>
                      <img :src="item" alt="" class="w-full h-full absolute left-0 top-0 z-10">
                    </my-carousel-slide>
                    <template #addons="{ currentSlide, slidesCount }">
                      <div
                          class="flex justify-center gap-4 w-full overflow-x-auto mt-4"
                      >
                        <div class="object-contain h-max z-20 bg-white rounded-tr-lg w-[100px] min-w-[100px]">
                          <img
                              :src="detailProduct.image_url"
                              alt="product"
                              class="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                        <div
                            v-for="(painting, index) of images"
                            :key="index"
                            @click="imagesCarousel.slideTo(index)"
                            :style="`background: ${colorCookie.hex}`"
                            :class="{ 'border-mainColor' : currentSlide === index }"
                            class="bg-cardBg border-2 rounded dark:bg-dElement cursor-pointer dark:text-dText"
                        >
                          <img
                              :src="painting"
                              alt=""
                              class="w-full object-contain"
                          />
                        </div>
                      </div>
                    </template>
                  </my-carousel-carousel>
                </client-only>
              </div>

              <div
                  v-else
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
                        :key="index"
                        class="md:h-full h-[150px]"
                    >
                      <div
                          :class="[{ 'bg-white' : !products.detailProduct.is_colorable }]"
                          class="w-full h-full absolute left-0 top-0"
                      ></div>
                      <img :src="item" alt="" class="w-full h-full absolute left-0 top-0 z-10">
                    </my-carousel-slide>
                    <template #addons="{ currentSlide, slidesCount }">

                      <div
                          class="flex items-center justify-center gap-4 w-full overflow-x-auto mt-4"
                      >
                        <div class="object-contain h-max z-20 bg-white rounded-tr-lg w-[100px] min-w-[100px]">
                          <img
                              :src="detailProduct.image_url"
                              alt="product"
                              class="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                        <div
                            v-for="(painting, index) of images"
                            :key="index"
                            @click="imagesCarousel.slideTo(index)"
                            :class="{ 'border-mainColor' : currentSlide === index }"
                            class="bg-cardBg border-2 rounded dark:bg-dElement cursor-pointer dark:text-dText"
                        >
                          <img
                              :src="painting"
                              alt=""
                              class="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </template>
                  </my-carousel-carousel>
                </client-only>
              </div>
            </div>
            <div
                class="w-full md:w-2/5 flex flex-col p-0 md:p-8 rounded-xl relative md:shadow-md"
            >
              <div class="absolute right-8 top-8 w-8 h-8 rounded-full bg-[#F0DFDF] flex items-center justify-center">
                <svg
                    v-if="detailProduct.is_favourite"
                    @click="remFromFav"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="size-6 text-mainColor">
                  <path
                      d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                </svg>

                <svg
                    v-else
                    @click="addToFav"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6 text-mainColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                </svg>
              </div>
              <div class="flex items-center gap-2 mb-4">
                <div
                    v-if="detailProduct.is_colorable"
                    class="w-8 h-8 flex items-center justify-center">
                  <img
                      class="w-6 h-6"
                      src="@/assets/img/rgb.png"
                      alt="">
                </div>
                <h1 class="text-2xl md:text-3xl font-medium font-montserrat w-[90%]">
                  {{ detailProduct.title[cur_lang] }}
                </h1>
              </div>
              <p class="text-sm text-[#7B7B7B] mb-8">
                {{ $t('products.details.article') }}: {{ detailProduct.article }}
              </p>
              <div class="flex justify-between items-center gap-1 mb-8">
                <div class="flex gap-1 items-center">
                  <svg class="size-6 text-[#FFE814]" fill="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill-rule="evenodd"/>
                  </svg>
                  <p class="ml-1 text-lg">{{ detailProduct.rating.rating }} ({{ detailProduct.rating?.count }})</p>
                </div>
                <div
                    @click="compareCookie.saveCookie(detailProduct)"
                    class="flex gap-3 items-center cursor-pointer hover:text-mainColor transition-all">
                  <ScaleIcon class="w-5 h-5 text-mainColor"/>
                  <p>Сравнить товар</p>
                </div>
              </div>
              <p
                  v-if="!prod_var"
                  class="text-2xl mb-8">
                {{ detailProduct.price_range[0] }}₸ - {{ detailProduct.price_range[1] }}₸
              </p>
              <p
                  v-else
                  class="text-2xl mb-8">
                {{ prod_var }}₸
              </p>
              <NuxtLink
                  v-if="!colorCookie && products.detailProduct.is_colorable"
                  :to="localePath('/colors')"
                  @click="colorForProduct.saveCookie(detailProduct)"
                  class="border border-[#7B7B7B40] border-dashed py-6 rounded flex items-center gap-4 justify-center mb-8 cursor-pointer">
                <div class="rounded-full flex items-center justify-center">
                  <PlusIcon class="w-7 h-7 bg-[#F0DFDF] text-mainColor rounded-full p-1"/>
                </div>
                <p class="text-xl text-mainColor">
                  {{ $t('products.details.choose_color') }}
                </p>
              </NuxtLink>
              <NuxtLink
                  v-else-if="colorCookie && products.detailProduct.is_colorable"
                  :to="localePath('/colors')"
                  @click="prodColor.saveCookie(detailProduct.id)"
                  :style="`background: ${colorCookie.hex}`"
                  class="border border-[#7B7B7B40] border-dashed mb-8 cursor-pointer rounded-xl p-3">
                <div class="flex items-center gap-2 mb-3">
                  <div
                      class="w-8 h-8 rounded-full bg-[#F0DFDF] flex items-center justify-center">
                    <svg
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
                  <div>
                    <p class="invert">{{ colorCookie.title[cur_lang] }}</p>
                  </div>
                </div>
                <div class="flex justify-end">
                  <p class="text-sm invert">{{ $t('products.colors_link') }}</p>
                </div>
              </NuxtLink>
              <div class="mb-8">
                <p class="mb-4">
                  {{ $t('products.details.weight') }}
                </p>
                <div class="flex flex-wrap gap-3">
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
              <div class="mb-8">
                <p>{{ $t('products.details.norm') }}: <span class="text-mainColor">{{
                    detailProduct.expense
                  }} г/м2</span></p>
              </div>
              <div v-if="calculatorActive" class="mb-8">
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
                        м
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
                        м
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
                <div class="flex justify-between text-md md:text-xl mt-8">
                  <p>{{ $t('products.details.area') }}: <span class="text-mainColor">{{ totalArea }} м²</span></p>
                  <p>{{ $t('products.details.on') }} {{ form.layers }} {{ $t('products.details.layer') }}: <span
                      class="text-mainColor">{{ paintNeeded.toFixed(2) }} {{ $t('products.details.liters') }}</span>
                  </p>
                </div>
              </div>
              <button
                  class="bg-white border border-mainColor text-md md:text-xl font-montserrat text-mainColor rounded-xl w-full py-4 transition-all hover:bg-mainColor hover:text-white"
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
                  class="py-4 px-6 flex items-center gap-4"
              >
                <EyeDropperIcon v-if="item.id === 10" class="w-6 h-6 min-w-6 min-h-6 text-mainColor"/>
                <Square3Stack3DIcon v-if="item.id === 16" class="w-6 h-6 min-w-6 min-h-6 text-mainColor"/>
                <PaintBrushIcon v-if="item.id === 13" class="w-6 h-6 min-w-6 min-h-6 text-mainColor"/>
                <CubeTransparentIcon v-if="item.id === 11" class="w-6 h-6 min-w-6 min-h-6 text-mainColor"/>
                <ClockIcon v-if="item.id === 14" class="w-6 h-6 min-w-6 min-h-6 text-mainColor"/>
                <SunIcon v-if="item.id === 15" class="w-6 h-6 min-w-6 min-h-6 text-mainColor"/>

                <div>
                  <p class="font-medium font-montserrat">{{ item.title[cur_lang] }}</p>
                  <p class="text-sm text-[#7B7B7B] font-montserrat">{{ item.value[cur_lang] }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
              v-if="detailProduct"
              class="w-full md:w-4/5 flex flex-col gap-10 info_block">
            <div v-html="detailProduct.description[cur_lang]"></div>
            <div>
              <p class="text-mainColor text-2xl font-medium font-montserrat mb-4">{{ $t('products.details.serts') }}</p>
              <div>
                <a
                    :href="sert"
                    download
                    class="flex items-center justify-between py-3 border-t border-b border-[#F0DFDF] cursor-pointer">
                  <div class="flex gap-6">
                    <img
                        class="w-5 h-5 object-contain"
                        src="@/assets/img/sert/download.png"
                        alt="">
                    <p>{{ $t('products.details.sertificate') }}</p>
                  </div>
                  <ArrowDownTrayIcon class="w-5 h-5 text-green-500"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Reviews Section -->
    <div
        v-if="productReviewsRating.rating && productReviewsRating.recommendation"
        class="container mx-auto mt-10 px-4 md:px-0">
      <div class="flex flex-col md:flex-row items-center gap-10 md:gap-32 mb-6">
        <div class="w-full md:w-1/3 md:min-w-1/3">
          <h2 class="text-2xl font-bold">
            {{ t('products.details.customer_reviews') }}
          </h2>

          <!-- Rating by Stars -->
          <div class="mt-4">
            <div
                v-for="([rating, ratingData], index) in Object.entries(productReviewsRating.rating.by_rating).reverse()"
                :key="index"
                class="flex items-center gap-4 mb-2">
              <div class="flex items-center gap-1">
                <span class="font-bold">{{ rating }}</span>
                <svg
                    class="size-6 text-[#FFE814]"
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
              <div class="w-full bg-[#EEEEEE] h-3 rounded">
                <div :style="{ width: ratingData.percentage + '%' }" class="bg-[#FFE814] h-3 rounded"></div>
              </div>
              <span>{{ ratingData.value }}</span>
            </div>
          </div>
        </div>

        <div class="w-full md:w-max">
          <p class="mb-3">
            {{ $t('products.details.rating') }}
          </p>
          <div v-if="detailProduct.rating" class="flex gap-3 mb-4">
            <p class="text-6xl" v-if="detailProduct.rating">{{ detailProduct.rating.rating }}</p>
            <p class="text-6xl" v-else>0</p>
            <div class="flex flex-col justify-between">
              <div
                  v-if="detailProduct.rating"
                  class="flex gap-1">
                <svg
                    v-for="(item, index) of Math.round(detailProduct.rating.rating)"
                    :key="index"
                    class="size-6 text-[#FFE814]"
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
                    v-for="(item, index) of Math.round(5 - detailProduct.rating.rating)"
                    :key="index"
                    class="size-6 text-[#D6D6D6]"
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
              <div
                  v-else
                  class="flex gap-1">
                <svg
                    v-for="(item, index) of 5"
                    :key="index"
                    class="size-6 text-[#D6D6D6]"
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
              <p>
                {{ detailProduct.rating?.count }} {{ t('products.details.reviews') }}
              </p>
            </div>

          </div>
          <div
              v-else
              class="flex gap-3 mb-4">
            <p class="text-6xl">0.0</p>
            <div class="flex flex-col justify-between">
              <div class="flex gap-1">
                <svg
                    v-for="(item, index) of 5"
                    :key="index"
                    class="size-6 text-[#D6D6D6]"
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
              <p>
                {{ reviews.data.length }} {{ t('products.details.reviews') }}
              </p>
            </div>

          </div>
          <p>{{ products.productReviewsRating.recommendation.recommended }} {{ $t('products.details.out') }}
            {{ products.productReviewsRating.recommendation.total }}
            ({{ products.productReviewsRating.recommendation.percentage }}%) {{ $t('products.details.outOfTotal') }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-full md:w-1/3">
        <h3 class="text-xl font-bold">{{ $t('products.details.share.title') }}</h3>
        <p>{{ $t('products.details.share.subtitle') }}</p>
        <p
            @click="modals.showModal('addReview', detailProduct.id)"
            class="w-full flex items-center justify-center border border-mainColor text-mainColor py-3 rounded-lg hover:text-white hover:bg-mainColor transition-all cursor-pointer">
          {{ $t('products.details.share.addReview') }}
        </p>
      </div>
    </div>

    <!-- Existing Reviews Section -->
    <div
        v-if="products.productReviews"
        class="container mx-auto px-4 md:px-0">
      <div
          v-if="reviews.data.length > 0"
          class="mt-10">

        <div class="flex items-center gap-2 mt-4 border-b pb-5">
          <p>{{ reviews.data.length }} {{ $t('products.details.reviewsTotal') }}</p>
        </div>

        <div
            v-for="review in reviews.data"
            :key="review.id"
            class="py-6 border-b border-[#F0DFDF] flex items-start"
        >
          <div class="block md:flex items-center gap-4 w-full md:w-1/5">
            <img
                class="w-9 h-9"
                src="@/assets/img/avatar.png" alt="">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col">
                <p class="text-xl font-bold mb-2">
                  {{ review.user.name }}
                </p>
                <div class="flex gap-1">
                  <svg
                      v-for="(item, index) of review.rating"
                      :key="index"
                      class="size-6 text-[#FFE814]"
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
                      v-for="(item, index) of Math.round(5 - review.rating)"
                      :key="index"
                      class="size-6 text-[#D6D6D6]"
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

              </div>
              <div class="flex gap-4">
                <div class="flex gap-3 items-center">
                  <HandThumbUpIcon @click="setHelpfulReview({
                    is_helpful: 1
                  }, review)" class="w-5 h-5 text-green-500 cursor-pointer"/>
                  <p class="font-bold">({{ review.helpful_data.helpful }})</p>
                </div>
                <div class="flex gap-3 items-center">
                  <HandThumbDownIcon @click="setHelpfulReview({
                  is_helpful: 0
                  }, review)" class="w-5 h-5 text-red-500 cursor-pointer"/>
                  <p class="font-bold">({{ review.helpful_data.not_helpful }})</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-4/5 flex flex-col gap-4">
            <p class="text-xl pb-3 border-b border-[#F0DFDF]">{{ $t('products.details.review') }}:</p>
            <p class="italic">
              "{{ review.comment }}"
            </p>
            <div>
              <div class="flex gap-4">
                <p>{{ $t('products.details.worthIt') }}?</p>
                <div class="flex gap-3 items-center">
                  <HandThumbUpIcon class="w-5 h-5 text-green-500"/>
                  <p class="font-bold">({{ review.helpful_data.helpful }})</p>
                </div>
                <div class="flex gap-3 items-center">
                  <HandThumbDownIcon class="w-5 h-5 text-red-500"/>
                  <p class="font-bold">({{ review.helpful_data.not_helpful }})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
          v-else
          class="mt-10">

        <div class="flex items-center gap-2 mt-4 border-b pb-5">
          <p>0 {{ $t('products.details.reviewsTotal') }}</p>
        </div>

        <div>
          <p class="text-center mt-12 text-2xl text-[#7B7B7B]">
            {{ t('products.details.no_reviews') }}
          </p>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mt-10">
      <div v-if="products.relatedProducts">
        <div v-if="products.relatedProducts.data.length > 0">
          <Heading
              :linkTitle="$t('products.related.more')"
              :title="$t('products.related.title')"
              class="!mb-0"
              link="/store"
          />
          <client-only>
            <my-carousel-carousel
                :breakpoints="related"
                :mouse-drag="true"
                :touch-drag="true"
                :wrap-around="true"
            >
              <my-carousel-slide
                  v-for="(item, index) of products.relatedProducts.data"
                  :key="index"
                  class="px-2">
                <ProductCard :itemIndex="index" :product-data="item.product"/>
              </my-carousel-slide>
              <template #addons>
                <my-carousel-navigation/>
                <my-carousel-pagination/>
              </template>
            </my-carousel-carousel>
          </client-only>
        </div>
      </div>
      <ProductsPreloader v-else/>
    </div>
  </div>
</template>

<style>
.related_products .carousel__viewport,
.related_products .carousel__track {
  height: 400px;
  width: 100%;
  padding: 0 !important
}

.related_products .carousel__slide img {
  height: 100%;
  object-fit: cover;
}

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

.info_block h2,
.info_block h3 {
  font-size: 24px;
  font-weight: 500;
  font-family: "Montserrat Alternates", sans-serif;
  color: #AD2724;
  margin-bottom: 1rem;
}
</style>