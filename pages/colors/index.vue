<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Banner from "~/components/general/banner.vue";
import NoResults from "~/components/general/noResults.vue";
import Pagination from "~/components/general/pagination.vue";
import AOS from "aos";
import { useColorCookieStore } from "~/stores/colorCookie";
import { useNotificationStore } from "~/stores/notifications.js";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useColorForProductStore } from "~/stores/colorForProduct.js";
import { useProductsStore } from "~/stores/products.js";
import ColorCard from "~/components/cards/colorCard.vue";

const colors = useColorsStore();
const { colorsList, mainColorsList } = storeToRefs(colors);
const languages = useLanguagesStore();
const { cur_lang } = storeToRefs(languages);
const localePath = useLocalePath();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const savedColor = useColorCookieStore();
const { colorCookie } = storeToRefs(savedColor);
const auth = useAuthStore();
auth.initCookieToken();
const { token } = storeToRefs(auth);
const notifications = useNotificationStore();
const modals = useModalsStore();
const prodCol = useColorForProductStore();
const products = useProductsStore();

const links = computed(() => [
  { title: t("breadcrumbs.home"), link: localePath("/") },
  { title: t("breadcrumbs.colors"), link: localePath("/colors") },
]);

const removeProdCookie = async () => {
  await prodCol.removeCookie();
  const updatedQuery = { ...route.query };
  delete updatedQuery.product_id;
  await router.push({ query: updatedQuery });
  products.detailProduct = null;
  await nextTick();
  await colors.getColors();
};

const updateCategoryFilter = async (colorID) => {
  if (parseInt(route.query["filters[parentColor.id]"]) === colorID) {
    delete route.query["filters[parentColor.id]"];
    await router.push({
      query: {
        ...route.query,
        page: 1,
        perPage: 10,
      },
    });
  } else {
    await router.push({
      query: {
        ...route.query,
        "filters[parentColor.id]": colorID,
        page: 1,
        perPage: 10,
      },
    });
  }
  await colors.getColors();
};

onMounted(async () => {
  await nextTick();
  await colors.getColors();
  await colors.getMainColors();
  await colors.getFavouriteColors();
  if (prodCol.colorForProduct) {
    await products.getDetailProduct(prodCol.colorForProduct.id);
    await router.push({
      query: { ...route.query, product_id: prodCol.colorForProduct.id },
    });
  }
});

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
  link: [{ rel: "canonical", href: t("headers.colors.canonical") }],
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links" />
    <Banner
      :sec_title="$t('colors.sec_title')"
      :title="$t('colors.title')"
      image="colors"
      text_color="main"
    />
    <div class="container mx-auto px-4 md:px-0">
      <div v-if="products.detailProduct" class="mb-10">
        <div
          class="w-full md:w-max mt-10 md:mt-0 h-full bg-white block rounded-md pb-3 text-left transition-all product-hover relative hover:bg-white"
          style="box-shadow: 7px 7px 6.1px 0px #0000000d"
        >
          <img
            :src="products.detailProduct.image_url"
            alt=""
            class="w-full md:w-[210px] h-[210px] mx-auto object-contain mb-4 transition-all"
          />
          <div
            v-if="products.detailProduct.is_colorable"
            class="absolute left-3 top-3 w-8 h-8 flex items-center justify-center"
          >
            <img class="w-6 h-6" src="@/assets/img/rgb.png" alt="" />
          </div>
          <div
            class="absolute right-12 top-3 p-2 w-8 h-8 rounded-full bg-[#F0DFDF] flex items-center justify-center cursor-pointer"
          >
            <svg
              v-if="products.detailProduct.is_favourite"
              @click="
                products.removeFromFavouriteProducts(products.detailProduct.id)
              "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 text-mainColor"
            >
              <path
                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
              />
            </svg>

            <svg
              v-else
              @click="
                products.addToFavouriteProducts(products.detailProduct.id)
              "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-mainColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <div
            @click="removeProdCookie"
            class="absolute right-3 top-3 p-2 w-8 h-8 rounded-full bg-[#F0DFDF] flex items-center justify-center cursor-pointer"
          >
            <XMarkIcon class="w-5 h-5 text-mainColor" />
          </div>
          <NuxtLink
            :to="localePath('/store/' + products.detailProduct.id)"
            class="px-4 flex flex-col gap-2 relative"
          >
            <div
              v-if="products.detailProduct.rating"
              class="flex gap-1 items-center"
            >
              <svg
                class="size-6 text-[#FFE814]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fill-rule="evenodd"
                />
              </svg>
              <p class="ml-1 text-sm md:text-lg">
                {{ products.detailProduct.rating?.rating }} ({{
                  products.detailProduct.rating?.count
                }})
              </p>
            </div>
            <div v-else class="flex gap-1 items-center">
              <svg
                class="size-6 text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fill-rule="evenodd"
                />
              </svg>
              <p class="ml-1 text-sm md:text-lg">0.0 (0)</p>
            </div>
            <p class="text-[#191919] text-base md:text-lg leading-6 truncate">
              {{ products.detailProduct.title[cur_lang] }}
            </p>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-base md:text-xl font-semibold">
                  {{ products.detailProduct.price_range[0] }}₸ -
                  {{ products.detailProduct.price_range[1] }}₸
                </p>
              </div>
              <NuxtLink
                :to="localePath(`/store/${products.detailProduct.id}`)"
                class="w-7 md:w-10 h-7 md:h-10 text-mainColor transition-all p-2 flex items-center justify-center border border-mainColor rounded-full"
              >
                <ChevronRightIcon class="w-8 h-8" />
              </NuxtLink>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div>
        <p class="text-2xl font-montserrat font-medium mb-9">
          {{ $t("colors.choose_color") }}
        </p>
        <div v-if="mainColorsList" class="mb-10">
          <div
            v-if="mainColorsList.length > 0"
            class="grid md:flex grid-cols-4 gap-y-5"
          >
            <div
              v-for="(item, index) in mainColorsList"
              @click="updateCategoryFilter(item.id)"
              :key="index"
              :style="{ background: item.hex }"
              class="color-block"
              :class="{
                selected:
                  parseInt(route.query['filters[parentColor.id]']) === item.id,
              }"
            >
              <CheckCircleIcon
                v-if="
                  parseInt(route.query['filters[parentColor.id]']) === item.id
                "
                class="check-icon invert"
              />
            </div>
          </div>
          <NoResults v-else />
        </div>
      </div>
      <div class="mb-8">
        <h2
          class="text-lg md:text-4xl font-medium font-montserrat border-b-2 border-[#F0DFDF] w-full pb-4"
        >
          {{ $t("colors.style_text") }}
        </h2>
      </div>
      <div v-if="colorsList">
        <div
          v-if="colorsList.data.length > 0"
          class="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-x-5 md:grid-cols-6"
        >
          <div
            v-for="(item, index) of colorsList.data"
            :key="index"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 10"
          >
            <ColorCard
              :id="item.id"
              :hex="item.hex"
              :title="item.title"
              :ral="item.ral"
            />
          </div>
        </div>
        <NoResults v-else />
      </div>
      <div
        v-else
        class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3"
      >
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
