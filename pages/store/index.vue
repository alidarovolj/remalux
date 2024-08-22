<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import ProductCard from "~/components/cards/productCard.vue";
import {ChevronDownIcon, PlusIcon} from '@heroicons/vue/20/solid'
import {XMarkIcon, MagnifyingGlassIcon, BarsArrowDownIcon} from '@heroicons/vue/24/outline'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import {useProductsStore} from "~/stores/products.js";
import Pagination from "~/components/general/pagination.vue";
import {useCategoriesStore} from "~/stores/categories.js";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import NoResults from "~/components/general/noResults.vue";
import {useLanguagesStore} from "~/stores/languages.js";
import {useFiltersStore} from "~/stores/filters.js";
import {useNotificationStore} from "~/stores/notifications.js";

const products = useProductsStore()
const categories = useCategoriesStore()
const mobileFiltersOpen = ref(false)
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)
const filtersStore = useFiltersStore()
const route = useRoute()
const notifications = useNotificationStore()
const filtersList = ref([])

const {t} = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.store'), link: localePath('/store')},
]);

const router = useRouter();

const updateCategoryFilter = async (categoryId) => {
  if (parseInt(route.query['filters[category_id]']) === categoryId) {
    delete route.query['filters[category_id]']
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
        'filters[category_id]': categoryId,
        page: 1,
        perPage: 10
      }
    });
  }
  await products.getProducts()
};

const updateFilter = async (sectionId, optionId) => {
  const filterKey = `filter_ids[${optionId}]`;
  const newQuery = { ...route.query };

  // Initialize the filter array if it doesn't exist
  if (!newQuery[filterKey]) {
    newQuery[filterKey] = [];
  } else {
    newQuery[filterKey] = Array.isArray(newQuery[filterKey])
        ? newQuery[filterKey]
        : [newQuery[filterKey]];
  }

  // Add or remove the optionId from the filter array
  if (newQuery[filterKey].includes(optionId.toString())) {
    newQuery[filterKey] = newQuery[filterKey].filter(id => id !== optionId.toString());
  } else {
    newQuery[filterKey].push(optionId.toString());
  }

  // Clean up the query if the array is empty
  if (newQuery[filterKey].length === 0) {
    delete newQuery[filterKey];
  }

  // Make sure to keep all existing query parameters
  await router.push({ query: { ...newQuery } });
  await products.getProducts();
};

const removeAllFilters = async () => {
  const newQuery = { ...route.query };
  for (const key in newQuery) {
    if (key.includes('filter_ids')) {
      delete newQuery[key];
    }
  }
  await router.push({ query: { ...newQuery } });
  await products.getProducts();
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


onMounted(async () => {
  await nextTick()
  await products.getProducts()
  await categories.getCategories()
  await filtersStore.getFilters()
})
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <client-only>
      <div class="relative py-16 bg-white">
        <div class="container mx-auto relative z-10 px-4 md:px-0">
          <div class="text-4xl text-mainColor font-bold">
            <p>{{ $t('products.title') }}</p>
            <div class="flex items-center gap-2">
              <p>{{ $t('products.sec_title') }}</p>
              <img
                  src="~/assets/img/logos/mainLogo.svg"
                  alt="">
            </div>
          </div>
        </div>
        <img
            class="absolute right-0 top-0 h-full w-full object-cover object-right hidden md:block"
            src="~/assets/img/products/main.png"
            alt="">
      </div>
    </client-only>
    <div class="container mx-auto px-4 lg:px-0 pt-10 pb-16">
      <div
          v-if="categories.categoriesList"
          class="flex flex-col md:flex-row gap-5">
        <div
            v-for="(category, index) in categories.categoriesList.data"
            :key="index"
            :class="{ '!border-[#F0DFDF] for_gradient text-mainColor' : parseInt(route.query['filters[category_id]']) === category.id }"
            class="relative w-full set_shadow rounded-xl border border-white flex items-center bg-[#F9F9F9] hover:bg-gray-100 transition-all cursor-pointer"
            @click="updateCategoryFilter(category.id)">
          <div class="flex flex-col gap-5 w-2/3 pl-7">
            <p class="font-bold">
              {{ category.title[cur_lang] }}
            </p>
          </div>
          <img
              class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
              :src="category.image_url"
              alt="">
        </div>
      </div>
      <ProductsPreloader v-else/>
    </div>
    <!-- Mobile filter dialog -->
    <TransitionRoot
        as="template"
        :show="mobileFiltersOpen">
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
                data-aos="fade-up"
                data-aos-duration="500"
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl font-manrope">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-2xl font-bold text-gray-900">
                  {{ $t('products.filters') }}
                </h2>
                <button
                    type="button"
                    class="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    @click="mobileFiltersOpen = false">
                  <span class="absolute -inset-0.5"/>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4">
                <Disclosure
                    as="div"
                    v-for="section in filtersStore.filtersList.data"
                    :key="section.id"
                    class="border-t border-gray-200 pb-4 pt-4"
                    v-slot="{ open }">
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
                              :name="`${section.id}[]`"
                              :value="option.id"
                              type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              @change="updateFilter(section.id, option.id)"
                              :checked="route.query[`filter_ids[${option.id}]`]?.includes(option.id.toString())"
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
            <div class="mb-5 relative">
              <MagnifyingGlassIcon class="w-6 h-6 text-mainColor absolute left-4 top-1/2 -translate-y-1/2" />
              <input class="w-full p-4 pl-14 border-b border-[#F0DFDF]" type="text" :placeholder="$t('search.placeholder')">
            </div>
            <div class="flex items-center justify-between lg:hidden">
              <button
                  type="button"
                  class="inline-flex items-center"
                  @click="mobileFiltersOpen = true">
                <span class="text-xl font-bold">{{ $t('products.filters') }}</span>
                <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0" aria-hidden="true"/>
              </button>
              <p
                  @click="removeAllFilters"
                  class="text-mainColor cursor-pointer">
                Сбросить
              </p>
            </div>

            <div class="hidden lg:block border border-[#F0DFDF] rounded-md">
              <div class="flex">
                <div class="relative ml-auto flex h-full w-full flex-col overflow-y-auto rounded-md pt-4">
                  <div class="flex items-center justify-between px-4">
                    <h2 class="text-2xl font-bold text-gray-900">
                      {{ $t('products.filters') }}
                    </h2>
                    <p
                        @click="removeAllFilters"
                        class="text-mainColor cursor-pointer">
                      Сбросить
                    </p>
                  </div>

                  <!-- Filters -->
                  <client-only>
                    <form v-if="filtersStore.filtersList" class="mt-4">
                      <Disclosure
                          as="div"
                          v-for="section in filtersStore.filtersList.data"
                          :key="section.name"
                          class="border-t border-[#F0DFDF]"
                          v-slot="{ open }"
                      >
                        <fieldset>
                          <legend class="w-full">
                            <DisclosureButton
                                class="flex w-full items-center justify-between p-4 text-gray-400 hover:text-gray-500 border-b border-[#F0DFDF]"
                            >
              <span class="text-xl font-semibold text-gray-900">
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
                          <DisclosurePanel>
                            <div class="space-y-4 bg-[#F9F9F9] px-4 py-4">
                              <div
                                  v-for="(option, optionIdx) in section.values"
                                  :key="option.id"
                                  class="flex items-center"
                              >
                                <input
                                    :id="`${section.id}-${optionIdx}-mobile`"
                                    :name="`${section.id}[]`"
                                    :value="option.id"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-mainColor focus:ring-indigo-500"
                                    @change="updateFilter(section.id, option.id)"
                                    :checked="route.query[`filter_ids[${option.id}]`]?.includes(option.id.toString())"
                                />
                                <label
                                    :for="`${section.id}-${optionIdx}-mobile`"
                                    class="ml-3 text-base"
                                >
                                  {{ option.values[cur_lang] }}
                                </label>
                              </div>
                            </div>
                          </DisclosurePanel>
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
            <div class="flex justify-between items-center mb-8 border-b border-[#F0DFDF]">
              <p class="text-3xl font-bold text-mainColor">
                {{ $t('products.products_title') }}
              </p>
              <p>
                <span class="font-semibold">{{ products.productsList?.meta?.total }}</span>
                {{ $t('products.found_products') }}
              </p>
            </div>
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
              <div class="w-full text-[#7B7B7B] flex items-center gap-3">
                <p>Выбранные фильтры:</p>
                <div class="flex gap-3 flex-wrap">
                  <div
                      v-for="(filter, filterInd) of filterElements"
                      :key="filterInd"
                      class="bg-[#C3808040] px-3 py-2 rounded-full flex gap-2 items-center"
                  >
                    {{ filter.values[cur_lang] }} <XMarkIcon class="h-4 w-4 cursor-pointer" @click="updateFilter(null, filter.id)"/>
                  </div>
                </div>
              </div>
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton class="flex items-center gap-2 text-sm">
                    <BarsArrowDownIcon class="h-5 w-5" aria-hidden="true" />
                    <p>Сортировка</p>
                    <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                  </MenuButton>
                </div>

                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account settings</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">License</a>
                      </MenuItem>
                      <form method="POST" action="#">
                        <MenuItem v-slot="{ active }">
                          <button type="submit" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Sign out</button>
                        </MenuItem>
                      </form>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
            <div
                v-if="products.productsList">
              <div
                  v-if="products.productsList.data.length > 0"
                  class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                <div
                    v-for="(product, index) in products.productsList.data"
                    :key="index"
                    class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <ProductCard :productData="product" :item-index="index" />
                </div>
              </div>
              <NoResults v-else/>
            </div>
            <div
                v-else
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
            <div v-if="products.productsList">
              <Pagination
                  @updatePage="products.getProducts"
                  :meta-data="products.productsList.meta"/>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>