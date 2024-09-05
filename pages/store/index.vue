<script setup>
import {ChevronDownIcon, PlusIcon} from '@heroicons/vue/20/solid'
import {BarsArrowDownIcon, ChevronRightIcon, MagnifyingGlassIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import AOS from 'aos';
import {useProductsStore} from "~/stores/products.js";
import {useCategoriesStore} from "~/stores/categories.js";
import {useLanguagesStore} from "~/stores/languages.js";
import {useFiltersStore} from "~/stores/filters.js";
import {useNotificationStore} from "~/stores/notifications.js";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import NoResults from "~/components/general/noResults.vue";
import Pagination from "~/components/general/pagination.vue";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Banner from "~/components/general/banner.vue";
import {useColorCookieStore} from "~/stores/colorCookie.js";
import VariantCard from "~/components/cards/variantCard.vue";
import PriceRange from "~/components/general/priceRange.vue";

const products = useProductsStore()
const {variantsList} = storeToRefs(products)
const categories = useCategoriesStore()
const mobileFiltersOpen = ref(false)
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)
const filtersStore = useFiltersStore()
const route = useRoute()
const notifications = useNotificationStore()
const savedColor = useColorCookieStore()
const {colorCookie} = storeToRefs(savedColor)
const colors = useColorsStore()
const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)
const {t} = useI18n()
const localePath = useLocalePath()

const searchForm = ref({
  searchKeyword: '',
  orderBy: 'name',  // default sorting order
  isColorable: null,  // no default filter on colorable
});

const updateSorting = async (orderBy, isColorable = null) => {
  const newQuery = {...route.query};

  // Toggle order_by sorting
  if (newQuery.order_by === orderBy) {
    delete newQuery.order_by; // Remove order_by if it's already selected
  } else {
    newQuery.order_by = orderBy; // Set order_by to the selected value
  }

  // Toggle is_colorable filter if provided
  if (isColorable !== null) {
    if (newQuery.is_colorable === String(isColorable)) {
      delete newQuery.is_colorable; // Remove is_colorable if it's already selected
    } else {
      newQuery.is_colorable = isColorable; // Set is_colorable to the selected value
    }
  }

  newQuery.page = 1; // Reset to the first page when sorting changes

  await router.push({query: newQuery});
  await products.getVariantsList(); // Fetch sorted products
};


const chosenCategory = computed(() => {
  if (route.query['filters[product.category_id]']) {
    return categories.categoriesList?.data?.find(category => category.id === parseInt(route.query['filters[product.category_id]']));
  }
  return null;
});

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.store'), link: localePath('/store')},
]);

const router = useRouter();

const updateCategoryFilter = async (categoryId) => {
  if (parseInt(route.query['filters[product.category_id]']) === categoryId) {
    delete route.query['filters[product.category_id]'];
    await router.push({
      query: {
        ...route.query,
        page: 1,
        perPage: 10
      }
    });
  } else {
    await router.push({
      query: {
        ...route.query,
        'filters[product.category_id]': categoryId,
        page: 1,
        perPage: 10
      }
    });
  }
  await products.getVariantsList();
  await filtersStore.getFilters()
};

const updateFilter = async (sectionId, optionId) => {
  const filterKey = `filter_ids[${optionId}]`;
  const newQuery = {...route.query};

  if (!newQuery[filterKey]) {
    newQuery[filterKey] = [];
  } else {
    newQuery[filterKey] = Array.isArray(newQuery[filterKey])
        ? newQuery[filterKey]
        : [newQuery[filterKey]];
  }

  if (newQuery[filterKey].includes(optionId.toString())) {
    newQuery[filterKey] = newQuery[filterKey].filter(id => id !== optionId.toString());
  } else {
    newQuery[filterKey].push(optionId.toString());
  }

  if (newQuery[filterKey].length === 0) {
    delete newQuery[filterKey];
  }

  newQuery.page = 1;
  newQuery.perPage = 10;

  await router.push({query: {...newQuery}});
  await products.getVariantsList();
};

const removeAllFilters = async () => {
  const newQuery = {...route.query};
  for (const key in newQuery) {
    if (key.includes('filter_ids')) {
      delete newQuery[key];
    }
  }
  // Set page and perPage parameters
  newQuery.page = 1;
  newQuery.perPage = 10;

  // Make sure to keep all existing query parameters
  await router.push({query: {...newQuery}});
  await products.getVariantsList();
  await notifications.showNotification('success', 'Успешно', 'Фильтры успешно сброшены')
};

const filterIds = computed(() => {
  const query = route.query;
  return Object.keys(query)
      .filter(key => key.startsWith('filter_ids'))
      .map(key => query[key]);
});

const filterElements = computed(() => {
  const ids = filterIds.value.flat();
  const elements = [];

  if (filtersStore.filtersList && Array.isArray(filtersStore.filtersList.data)) {
    filtersStore.filtersList.data.forEach(filter => {
      filter.values.forEach(value => {
        if (ids.includes(value.id.toString())) {
          elements.push(value);
        }
      });
    });
  }

  return elements;
});

const favouriteColorIds = computed(() => {
  return colors.favouriteColorsList?.data.map(fav => fav.color.id);
});

const addOrRemoveFavouriteColor = async (colorId) => {
  if (token.value) {
    if (favouriteColorIds.value.includes(colorId)) {
      await colors.removeFromFavourites(colorId)
    } else {
      await colors.addToFavouriteColors(colorId)
    }
  } else {
    notifications.showNotification('error', 'Необходимо авторизоваться', 'Для добавления в избранное необходимо авторизоваться')
  }
};

const searchByText = async () => {
  const newQuery = {...route.query};

  if (searchForm.value.searchKeyword) {
    newQuery.searchKeyword = searchForm.value.searchKeyword;
  } else {
    delete newQuery.searchKeyword;
  }

  newQuery.page = 1; // Reset page to 1 when a new search is performed

  await router.push({query: newQuery});
  await products.getVariantsList(); // Assuming this fetches the products based on the query
  await filtersStore.getFilters()
};

const removeColor = async () => {
  savedColor.removeCookie()
  await router.push({query: {...route.query, is_colorable: 0}});
  await products.getVariantsList();
};

onMounted(async () => {
  await nextTick()
  const {searchKeyword} = route.query;
  console.log(route.query['filters[product.category_id]'])
  if (searchKeyword) {
    searchForm.value.searchKeyword = searchKeyword;
  }
  if (colorCookie.value) {
    await router.push({query: {...route.query, is_colorable: 1}});
  }
  await nextTick()
  console.log(route.query)
  await categories.getCategories()
  await products.removeVariant()
  await colors.getFavouriteColors()
  await filtersStore.getFilters()
  await products.getVariantsList()

  if (route.query.order_by) {
    searchForm.value.orderBy = route.query.order_by;
  }
  if (route.query.is_colorable) {
    searchForm.value.isColorable = route.query.is_colorable;
  }

})

watch(
    () => [variantsList.value],
    async () => {
      await nextTick();
      AOS.refresh();
      console.log('AOS refreshed');
      AOS.refresh();
    }
);

// watch(
//     () => [route.query],
//     async () => {
//       await products.getVariantsList()
//       await filtersStore.getFilters()
//     }
// )

useHead({
  title: t("headers.store.title"),
  meta: [
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
      content: t("headers.store.title"),
    },
    {
      property: "og:url",
      content: t("headers.store.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.store.canonical")}],
});
</script>

<template>
  <client-only>
    <div>
      <Breadcrumbs :links="links"/>
      <Banner
          v-if="!colorCookie"
          :sec_title="$t('products.sec_title')"
          :title="$t('products.title')"
          image="products"
          text_color="white"
      />
      <div v-else>
        <div class="container mx-auto px-4 md:px-0">
          <div class="my-8">
            <div
                class="bg-white rounded-2xl p-4 text-sm pb-8 cursor-pointer"
                style="box-shadow: 0px 0px 20px 0px #0000000D;"
                :data-aos="'fade-up'"
            >
              <div class="flex items-center gap-6 mb-4">
                <div class="flex gap-2 items-center">
                  <p class="text-2xl font-medium whitespace-nowrap">{{ colorCookie.title[cur_lang] }}</p>
                  <ChevronRightIcon class="w-6 h-6"/>
                </div>
                <div class="border-t h-[1px] w-full border-[#F0DFDF]"></div>
                <NuxtLink
                    :to="localePath('/colors')"
                    class="flex gap-2 items-center text-mainColor hover:underline transition-all">
                  <p class="whitespace-nowrap font-medium">
                    {{ $t('products.colors_link') }}
                  </p>
                  <ChevronRightIcon class="w-5 h-5"/>
                </NuxtLink>
              </div>
              <div
                  :style="`background: ${colorCookie.hex}`"
                  class="mb-4 w-full h-[170px] rounded-2xl relative"
              >
                <div
                    @click="addOrRemoveFavouriteColor(colorCookie.id)"
                    class="absolute right-12 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#E8E8E5] hover:bg-mainColor hover:!text-white transition-all">
                  <svg
                      :class="{ 'text-mainColor' : favouriteColorIds?.includes(colorCookie.id) }"
                      class="size-5 w-5 h-5"
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
                    @click="removeColor"
                    class="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-mainColor hover:bg-mainColor hover:!text-white transition-all">
                  <XMarkIcon class="w-5 h-5"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4 lg:px-0 pb-16">
        <div
            v-if="categories.categoriesList"
            class="flex flex-col md:flex-row gap-5">
          <div
              v-for="(category, index) in categories.categoriesList.data"
              :key="index"
              :class="{ 'for_gradient text-mainColor' : parseInt(route.query['filters[product.category_id]']) === category.id }"
              class="relative w-full set_shadow rounded-xl flex items-center bg-[#F9F9F9] transition-all cursor-pointer text-[#7B7B7B] hover:shadow-hovShadow"
              @click="updateCategoryFilter(category.id)">
            <div class="flex flex-col gap-5 w-2/3 pl-3">
              <p class="font-medium text-xs font-montserrat">
                {{ category.title[cur_lang] }}
              </p>
            </div>
            <img
                :src="category.image_url"
                alt=""
                class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right">
          </div>
        </div>
        <ProductsPreloader v-else/>
      </div>
      <!-- Mobile filter dialog -->
      <TransitionRoot
          :show="mobileFiltersOpen"
          as="template">
        <Dialog
            class="relative z-[1000000000000000] lg:hidden"
            @close="mobileFiltersOpen = false">
          <TransitionChild
              as="template"
              enter="transition-opacity ease-linear duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25"/>
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
                as="template"
                enter="transition ease-in-out duration-300 transform"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="translate-x-0"
                leave-to="translate-x-full">
              <DialogPanel
                  class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl font-manrope"
                  data-aos="fade-up"
                  data-aos-duration="500">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-2xl font-bold text-gray-900 font-montserrat">
                    {{ $t('products.filters') }}
                  </h2>
                  <button
                      class="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      type="button"
                      @click="mobileFiltersOpen = false">
                    <span class="absolute -inset-0.5"/>
                    <XMarkIcon aria-hidden="true" class="h-6 w-6"/>
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4">
                  <Disclosure
                      v-for="section in filtersStore.filtersList.data"
                      :key="section.id"
                      v-slot="{ open }"
                      as="div"
                      class="border-t border-gray-200 pb-4 pt-4">
                    <fieldset>
                      <legend class="w-full px-2">
                        <DisclosureButton
                            class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                        <span class="text-lg font-semibold text-gray-900">
                          {{ section.title[cur_lang] }}
                        </span>
                          <span class="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                                :class="[open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                                aria-hidden="true"
                            />
                          </span>
                        </DisclosureButton>
                      </legend>
                      <DisclosurePanel class="px-4 pb-2 pt-4">
                        <div class="space-y-4">
                          <div
                              v-for="(option, optionIdx) in section.values"
                              :key="option.id"
                              class="flex items-center">
                            <input
                                :id="`${section.id}-${optionIdx}-mobile`"
                                :checked="route.query[`filter_ids[${option.id}]`]?.includes(option.id.toString())"
                                :name="`${section.id}[]`"
                                :value="option.id"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                type="checkbox"
                                @change="updateFilter(section.id, option.id)"
                            />
                            <label
                                :for="`${section.id}-${optionIdx}-mobile`"
                                class="ml-3 text-base">
                              {{ option.values[cur_lang] }}
                            </label>
                          </div>
                        </div>
                      </DisclosurePanel>
                    </fieldset>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
      <div class="container mx-auto px-4 lg:px-0">
        <main class="mx-auto">

          <div class="pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 font-manrope">
            <aside>
              <form
                  @submit.prevent="searchByText"
                  class="mb-5 relative">
                <MagnifyingGlassIcon class="w-6 h-6 text-mainColor absolute left-4 top-1/2 -translate-y-1/2"/>
                <input
                    v-model="searchForm.searchKeyword"
                    :placeholder="$t('search.placeholder')"
                    class="w-full p-4 pl-14 border-b border-[#F0DFDF]"
                    type="text"
                />
              </form>
              <div class="flex items-center justify-between lg:hidden">
                <button
                    class="inline-flex items-center"
                    type="button"
                    @click="mobileFiltersOpen = true">
                  <span class="text-xl font-semibold">{{ $t('products.filters') }}</span>
                  <PlusIcon aria-hidden="true" class="ml-1 h-5 w-5 flex-shrink-0"/>
                </button>
                <p
                    class="text-mainColor cursor-pointer"
                    @click="removeAllFilters">
                  {{ $t('products.clear_filters') }}
                </p>
              </div>

              <div class="hidden lg:block border border-[#F0DFDF] rounded-md">
                <div class="flex">
                  <div class="relative ml-auto flex h-full w-full flex-col overflow-y-auto rounded-md pt-4">
                    <div class="flex items-center justify-between px-4">
                      <h2 class="text-2xl font-semibold text-gray-900 font-montserrat">
                        {{ $t('products.filters') }}
                      </h2>
                      <p
                          class="text-mainColor cursor-pointer underline"
                          @click="removeAllFilters">
                        {{ $t('products.clear_filters') }}
                      </p>
                    </div>

                    <!-- Filters -->
                    <client-only>
                      <form v-if="filtersStore.filtersList" class="mt-4">
                        <Disclosure
                            v-for="section in filtersStore.filtersList.data"
                            :key="section.name"
                            v-slot="{ open }"
                            as="div"
                            class="border-t border-[#F0DFDF]"
                            :defaultOpen="true"
                        >
                          <fieldset>
                            <legend class="w-full">
                              <DisclosureButton
                                  class="flex w-full items-center justify-between p-4 text-gray-400 hover:text-gray-500 border-b border-[#F0DFDF]">
                                <span class="text-xl text-start font-medium text-gray-900 font-montserrat">
                                  {{ section.title[cur_lang] }}
                                </span>
                                <span class="ml-6 flex h-7 items-center text-black">
                                  <ChevronDownIcon
                                      :class="[open ? '-rotate-180' : 'rotate-0', 'h-7 w-7 transform']"
                                      aria-hidden="true"
                                  />
                                </span>
                              </DisclosureButton>
                            </legend>

                            <div
                                :class="{
                                  'transition-max-height overflow-hidden overflow-y-auto': true,
                                  'max-h-0': !open,
                                  'max-h-96': open
                                }"
                            >
                              <DisclosurePanel>
                                <div class="space-y-4 bg-[#F9F9F9] px-4 py-4">
                                  <div
                                      v-for="(option, optionIdx) in section.values"
                                      :key="option.id"
                                      class="flex gap-3 items-center"
                                  >
                                    <input
                                        :id="`${section.id}-${optionIdx}-mobile`"
                                        :checked="route.query[`filter_ids[${option.id}]`]?.includes(option.id.toString())"
                                        :name="`${section.id}[]`"
                                        :value="option.id"
                                        class="h-4 w-4 min-w-4 min-h-4 rounded border-gray-300 text-mainColor focus:ring-indigo-500"
                                        type="checkbox"
                                        @change="updateFilter(section.id, option.id)"
                                    />
                                    <label
                                        :for="`${section.id}-${optionIdx}-mobile`"
                                        class="text-sm text-[#191919]"
                                    >
                                      {{ option.values[cur_lang] }}
                                    </label>
                                  </div>
                                </div>
                              </DisclosurePanel>
                            </div>
                          </fieldset>
                        </Disclosure>
                        <Disclosure
                            v-slot="{ open }"
                            as="div"
                            class="border-t border-[#F0DFDF]"
                            :defaultOpen="true"
                        >
                          <fieldset>
                            <legend class="w-full">
                              <DisclosureButton
                                  class="flex w-full items-center justify-between p-4 text-gray-400 hover:text-gray-500 border-b border-[#F0DFDF]">
                                <span class="text-xl font-medium text-gray-900 font-montserrat">
                                  {{ $t('cart.table.price') }}
                                </span>
                                <span class="ml-6 flex h-7 items-center text-black">
                                  <ChevronDownIcon
                                      :class="[open ? '-rotate-180' : 'rotate-0', 'h-7 w-7 transform']"
                                      aria-hidden="true"
                                  />
                                </span>
                              </DisclosureButton>
                            </legend>

                            <div
                                :class="{
                                  'transition-max-height overflow-hidden': true,
                                  'max-h-0': !open,
                                  'max-h-96': open
                                }"
                            >
                              <DisclosurePanel>
                                <PriceRange />
                              </DisclosurePanel>
                            </div>
                          </fieldset>
                        </Disclosure>
                      </form>
                    </client-only>
                  </div>
                </div>
              </div>
            </aside>

            <section
                aria-labelledby="product-heading"
                class="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <div class="flex justify-between items-center mb-5 pb-3 border-b border-[#F0DFDF]">
                <p class="text-3xl font-medium text-mainColor font-montserrat">
                  <span v-if="!chosenCategory">{{ $t('products.products_title') }}</span>
                  <span v-else>{{ chosenCategory.title[cur_lang] }}</span>
                </p>
                <p>
                  <span class="font-semibold">{{ variantsList?.meta?.total }}</span>
                  {{ $t('products.found_products') }}
                </p>
              </div>
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
                <div class="w-full text-[#7B7B7B] flex items-center gap-3">
                  <p>{{ $t('products.picked_filters') }}:</p>
                  <div class="flex gap-3 flex-wrap">
                    <div
                        v-for="(filter, filterInd) of filterElements"
                        :key="filterInd"
                        class="bg-[#C3808040] px-3 py-2 rounded-full flex gap-2 items-center"
                    >
                      {{ filter.values[cur_lang] }}
                      <XMarkIcon class="h-4 w-4 cursor-pointer" @click="updateFilter(null, filter.id)"/>
                    </div>
                  </div>
                </div>
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton class="flex items-center gap-2 text-sm">
                      <BarsArrowDownIcon aria-hidden="true" class="h-5 w-5"/>
                      <p>{{ $t('products.sort') }}</p>
                      <ChevronDownIcon aria-hidden="true" class="h-5 w-5"/>
                    </MenuButton>
                  </div>

                  <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <!-- Sort by Name Ascending -->
                        <MenuItem as="div">
                          <div
                              :class="{ 'bg-mainColor text-white': route.query.order_by === 'asc' }"
                              class="block px-4 py-2 text-sm cursor-pointer transition-all hover:bg-mainColor hover:text-white"
                              @click="updateSorting('asc')">
                            {{ $t('sorting.name_asc') }}
                          </div>
                        </MenuItem>
                        <!-- Sort by Name Descending -->
                        <MenuItem as="div">
                          <div
                              :class="{ 'bg-mainColor text-white': route.query.order_by === 'desc' }"
                              class="block px-4 py-2 text-sm cursor-pointer transition-all hover:bg-mainColor hover:text-white"
                              @click="updateSorting('desc')">
                            {{ $t('sorting.name_desc') }}
                          </div>
                        </MenuItem>
                        <!-- Sort by Colorable Products -->
                        <MenuItem as="div">
                          <div
                              :class="{ 'bg-mainColor text-white': route.query.is_colorable === '1' }"
                              class="block px-4 py-2 text-sm cursor-pointer transition-all hover:bg-mainColor hover:text-white"
                              @click="updateSorting('desc', 1)">
                            {{ $t('sorting.colorable') }}
                          </div>
                        </MenuItem>
                        <!-- Sort by Non-Colorable Products -->
                        <MenuItem as="div">
                          <div
                              :class="{ 'bg-mainColor text-white': route.query.is_colorable === '0' }"
                              class="block px-4 py-2 text-sm cursor-pointer transition-all hover:bg-mainColor hover:text-white"
                              @click="updateSorting('desc', 0)">
                            {{ $t('sorting.non_colorable') }}
                          </div>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>

              </div>
              <div>
                <div
                    v-if="variantsList?.data.length > 0"
                    class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5 xl:grid-cols-3">
                  <div
                      v-for="(product, index) in variantsList?.data"
                      :key="index"
                      class="group relative flex flex-col overflow-hidden rounded-lg bg-white p-2">
                    <VariantCard :item-index="index" :productData="product"/>
                  </div>
                </div>
                <NoResults v-else/>
              </div>
              <div
                  v-if="!products.variantsList"
                  class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
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
              <div v-if="products.variantsList">
                <Pagination
                    :meta-data="products.variantsList.meta"
                    @updatePage="products.getVariantsList"/>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </client-only>
</template>

<style scoped>
.transition-max-height {
  transition: max-height 0.5s ease-in-out;
}

input[type=range]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
  /* @apply w-6 h-6 appearance-none pointer-events-auto; */
}
</style>