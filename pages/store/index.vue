<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import ProductCard from "~/components/cards/productCard.vue";
import {ChevronDownIcon, PlusIcon} from '@heroicons/vue/20/solid'
import {XMarkIcon} from '@heroicons/vue/24/outline'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
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
    <div class="relative py-16 bg-[#ff7828]">
      <div class="container mx-auto relative z-10 px-4 md:px-0">
        <div class="text-4xl text-white font-bold">
          <p>{{ $t('products.title') }}</p>
          <div class="flex items-center gap-2">
            <p>{{ $t('products.sec_title') }}</p>
            <img
                src="~/assets/img/logos/whiteLogo.png"
                alt="">
          </div>
        </div>
      </div>
      <img
          class="absolute right-0 top-0 h-full w-full object-cover object-right hidden md:block"
          src="~/assets/img/products/main.png"
          alt="">
    </div>
    <div class="container mx-auto px-4 lg:px-0 pt-10 pb-16">
      <div
          v-if="categories.categoriesList"
          class="flex flex-col md:flex-row gap-5">
        <div
            v-bind="index !== undefined ? { 'data-aos-duration': index * 200 } : {}"
            data-aos="fade-up"
            v-for="(category, index) in categories.categoriesList.data"
            :key="index"
            :class="{ '!bg-mainColor text-white' : parseInt(route.query['filters[category_id]']) === category.id }"
            class="w-full set_shadow rounded-xl flex items-center bg-[#F9F9F9] hover:bg-gray-100 transition-all cursor-pointer"
            @click="updateCategoryFilter(category.id)">
          <div class="flex flex-col gap-5 w-2/3 pl-7">
            <p class="text-sm font-bold">
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
          class="relative z-40 lg:hidden"
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
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">
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
                        <span class="text-sm font-medium text-gray-900">
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
                              class="ml-3 text-sm text-gray-500">
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

        <div class="pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>

            <div class="flex items-center justify-between lg:hidden">
              <button
                  type="button"
                  class="inline-flex items-center"
                  @click="mobileFiltersOpen = true">
                <span class="text-base font-medium text-gray-700">{{ $t('products.filters') }}</span>
                <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
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
                    <h2 class="text-2xl font-medium text-gray-900">
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
              <span class="text-lg font-medium text-gray-900">
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
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    @change="updateFilter(section.id, option.id)"
                                    :checked="route.query[`filter_ids[${option.id}]`]?.includes(option.id.toString())"
                                />
                                <label
                                    :for="`${section.id}-${optionIdx}-mobile`"
                                    class="ml-3 text-sm text-gray-500"
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