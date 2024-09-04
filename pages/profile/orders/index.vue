<template>
  <div>
    <Breadcrumbs :links="links"/>
    <NuxtLayout name="profile">
      <div class="flex flex-col gap-4">
        <div
            v-if="orders.ordersList"
            class="bg-white p-6 rounded-2xl set_shadow">
          <div class="flex justify-between items-center mb-4">
            <div class="flex gap-3 items-center">
              <CubeIcon class="text-mainColor w-8 h-8"/>
              <p class="text-xl font-medium">Мои заказы</p>
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <Disclosure
                as="div"
                v-for="(item, index) in orders.ordersList.data"
                :key="index"
                class="px-4 py-3 border border-[#F0DFDF] rounded-xl w-full"
                v-slot="{ open }">
              <dt class="w-full">
                <DisclosureButton class="flex w-full items-start justify-between text-left text-gray-900">
                  <div>
                    <p class="text-xl font-medium mb-5">Заказ №{{ item.id }}</p>
                    <p class="text-sm font-medium">Статус: <span v-if="item.status === 'created'"
                                                                 class="text-orange-500">Создан</span>
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="font-light mb-5">{{ formatDate(item.created_at) }}</p>
                    <p class="font-semibold">Cумма заказа: {{ item.total_amount }} ₸</p>
                  </div>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" class="mt-2 pr-12">
                <table
                    class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-[#FAFAFA]">
                  <tr class="px-4">
                    <th class="py-3.5 pl-4 pr-3 text-left  font-semibold text-gray-900" scope="col">
                      {{ t('cart.table.product') }}
                    </th>
                    <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                      {{ t('cart.table.color') }}
                    </th>
                    <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                      {{ t('cart.table.quantity') }}
                    </th>
                    <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                      {{ t('cart.table.price') }}
                    </th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                  <tr
                      v-for="(it, ind) in item.order_items"
                      :key="ind"
                      class="border-b news-card cursor-pointer"
                  >
                    <td class="whitespace-nowrap py-5 pl-4 pr-3  sm:pl-0">
                      <div class="flex items-center">
                        <div class="h-24 w-24 flex-shrink-0">
                          <img
                              :src="it.product_image"
                              alt=""
                              class="h-24 w-24 rounded-full object-cover transition-all"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="font-medium text-gray-900">{{ it.product_name[cur_lang] }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-5  ">
                      <div>
                        <div v-if="it.color_id" class="relative show_on_hover">
                          <div
                              class="text-gray-900 w-8 h-8 rounded-md shadow"
                              :style="`background: ${it.color_id.hex}`"
                          >
                          </div>
<!--                          <p class="opacity-0 transition-all absolute left-0 text-center top-[105%]">{{ it.color_id.title[cur_lang] }}</p>-->
                        </div>
                        <div v-else class="w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center text-sm font-semibold"><p class="">N/A</p></div>
                      </div>

                    </td>
                    <td class="whitespace-nowrap px-3 py-5  ">
                      <div class="text-mainColor flex items-center gap-5">
                        <p class=" text-sm">
                          {{ it.quantity }} шт.
                        </p>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-3 py-5  ">
                      <div class="text-gray-900">
                        {{ it.price }}₸
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {formatDate} from "~/utils/formatDate";
import {CubeIcon, PlusIcon} from "@heroicons/vue/24/outline";
import {useOrdersStore} from "~/stores/orders";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useLocalePath} from "#i18n";
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {useLanguagesStore} from "~/stores/languages";
import {storeToRefs} from "pinia";

const orders = useOrdersStore()
const localePath = useLocalePath()
const {t} = useI18n()
const language = useLanguagesStore()
const {cur_lang} = storeToRefs(language)

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.profile'), link: localePath('/profile')},
  {title: t('breadcrumbs.orders'), link: localePath('/profile/orders')}
]);

onMounted(async () => {
  await nextTick()
  await orders.getOrders()
})
</script>