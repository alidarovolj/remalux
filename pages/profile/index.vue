<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useUserStore} from "~/stores/user.js";
import {useOrdersStore} from "~/stores/orders.js";
import {formatDate} from "@/utils/formatDate.js"
import {ChevronDownIcon, ChevronUpIcon, TrashIcon, PlusIcon, CubeIcon, TruckIcon } from "@heroicons/vue/24/outline"
import {useAddressesStore} from "~/stores/addresses.js";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";

const {t} = useI18n()
const localePath = useLocalePath()
const user = useUserStore()
const orders = useOrdersStore()
const addresses = useAddressesStore()
const {addressesList} = storeToRefs(addresses)
const modals = useModalsStore()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.profile'), link: localePath('/profile')}
]);

onMounted(async () => {
  await nextTick()
  await orders.getOrders()
  await addresses.getAddresses()
})

useHead({
  title: t("headers.profile.title"),
  meta: [
    {
      property: "description",
      content: t("headers.profile.description"),
    },
    {
      property: "og:description",
      content: t("headers.profile.description"),
    },
    {
      property: "og:title",
      content: t("headers.profile.title"),
    },
    {
      property: "og:url",
      content: t("headers.profile.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.profile.canonical")}],
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <NuxtLayout name="profile">
      <div class="flex flex-col gap-4">
        <div class="bg-white p-6 rounded-2xl set_shadow">
          <div class="flex items-center gap-8 border-b border-[#F0DFDF] pb-3 mb-4">
            <img
                alt=""
                class="w-[100px] h-[100px] rounded-full object-cover"
                src="@/assets/img/bg-app.jpg">
            <p
                v-if="user.userProfile"
                class="text-3xl font-semibold">
              {{ user.userProfile.name }}
            </p>
            <div v-else class="skeleton h-5 w-1/2"></div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center">
              <p class="w-1/2 md:w-1/6 text-lg text-[#7B7B7B]">{{ $t('profile.phone') }}:</p>
              <p v-if="user.userProfile">{{ user.userProfile.phone_number }}</p>
              <div v-else class="skeleton h-5 w-1/3"></div>
            </div>
            <div class="flex items-center">
              <p class="w-1/2 md:w-1/6 text-lg text-[#7B7B7B]">Email:</p>
              <p v-if="user.userProfile">{{ user.userProfile.email }}</p>
              <div v-else class="skeleton h-5 w-1/3"></div>
            </div>
          </div>
        </div>
        <div
            v-if="orders.ordersList"
            class="bg-white p-6 rounded-2xl set_shadow">
          <div class="flex justify-between items-center mb-4">
            <div class="flex gap-3 items-center">
              <CubeIcon class="text-mainColor w-8 h-8"/>
              <p class="text-xl font-medium">{{ $t('orders.title') }}</p>
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
                <DisclosureButton class="w-full">
                  <div class="flex w-full items-start justify-between text-left text-gray-900">
                    <div>
                      <p class="text-xl font-medium mb-5">{{ $t('orders.order.title') }} №{{ item.id }}</p>
                      <p class="text-sm font-medium">{{ $t('orders.order.status') }}: <span v-if="item.status === 'created'"
                                                                                            class="text-orange-500">Создан</span>
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="font-light mb-5">{{ formatDate(item.created_at) }}</p>
                      <p class="font-semibold">{{ $t('orders.order.amount') }}: {{ item.total_amount }} ₸</p>
                    </div>
                  </div>
                  <div
                      v-if="!open"
                      class="text-xs text-[#2157E2] flex items-center justify-center gap-2">
                    <p>{{ $t('orders.order.show') }}</p>
                    <ChevronDownIcon class="w-5 h-5" />
                  </div>
                  <div
                      v-else
                      class="text-xs text-[#2157E2] flex items-center justify-center gap-2">
                    <p>{{ $t('orders.order.hide') }}</p>
                    <ChevronUpIcon class="w-5 h-5" />
                  </div>
                </DisclosureButton>
              </dt>
              <DisclosurePanel as="dd" class="mt-2">
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
        <div class="bg-white p-6 rounded-2xl set_shadow">
          <div class="flex justify-between items-center mb-4">
            <div class="flex gap-3 items-center">
              <TruckIcon class="text-mainColor w-8 h-8" />
              <p class="text-xl font-medium">{{ $t('profile.my_addresses') }}</p>
            </div>
            <NuxtLink
                :to="localePath('/profile/addresses')"
                class="text-[#2157E2]">
              {{ $t('profile.to_addresses') }}
            </NuxtLink>
          </div>
          <div v-if="addressesList">
            <div
                v-if="addressesList.data.length > 0"
                class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
              <div
                  v-for="(item, index) of addressesList.data"
                  :key="index"
                  class="p-4 border border-[#F0DFDF] rounded-lg flex items-center justify-between">
                <p>{{ item.country.title }}, {{ item.address }}, {{ item.entrance }} {{ $t('profile.entrance') }}, {{ $t('profile.floor') }} {{ item.floor }},
                  {{ $t('profile.apartment') }}. {{ item.float }}</p>
                <TrashIcon
                    class="w-5 h-5 text-red-500 cursor-pointer"
                    @click="modals.showModal('removeAddress', item)"/>
              </div>
            </div>
            <div v-else>
              <p class="text-gray-500 py-3">
                {{ t('profile.no_addresses') }}
              </p>
            </div>
            <div
                @click="modals.showModal('createAddress')"
                class="border border-dashed border-[#F0DFDF] text-center cursor-pointer transition-all hover:bg-mainColor hover:text-white justify-center items-center py-4 rounded-xl mt-4 flex gap-3 text-mainColor">
              <PlusIcon class="w-5 h-5" />
              <p class="text-xl font-light">
                {{ t('profile.add_address') }}
              </p>
            </div>
          </div>
          <div v-else class="spinner p-3"></div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>