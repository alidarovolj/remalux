<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useUserStore} from "~/stores/user.js";
import {useOrdersStore} from "~/stores/orders.js";
import {formatDate} from "@/utils/formatDate.js"
import { CubeIcon, TruckIcon } from "@heroicons/vue/24/outline"
import {TrashIcon} from "@heroicons/vue/24/outline/index.js";
import {useAddressesStore} from "~/stores/addresses.js";

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
              <CubeIcon class="text-mainColor w-8 h-8" />
              <p class="text-xl font-medium">Мои заказы</p>
            </div>
            <NuxtLink
                :to="localePath('/profile/orders')"
                class="text-[#2157E2]">
              Перейти в мои заказы
            </NuxtLink>
          </div>
          <div class="flex flex-col gap-4">
            <div
                v-for="(item, index) of orders.ordersList.data"
                :key="index"
                class="px-4 py-3 border border-[#F0DFDF] rounded-xl flex justify-between"
            >
              <div>
                <p class="text-xl font-medium mb-5">Заказ №{{ item.id }}</p>
                <p class="text-sm font-medium">Статус: <span v-if="item.status === 'created'" class="text-orange-500">Создан</span></p>
              </div>
              <div class="text-right">
                <p class="font-light mb-5">{{ formatDate(item.created_at) }}</p>
                <p class="font-semibold">Cумма заказа: {{ item.total_amount }} ₸</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl set_shadow">
          <div class="flex justify-between items-center mb-4">
            <div class="flex gap-3 items-center">
              <TruckIcon class="text-mainColor w-8 h-8" />
              <p class="text-xl font-medium">Мои адреса</p>
            </div>
            <NuxtLink
                :to="localePath('/profile/addresses')"
                class="text-[#2157E2]">
              Перейти в мои адреса
            </NuxtLink>
          </div>
          <div v-if="addressesList">
            <div
                v-if="addressesList.data.length > 0"
                class="flex flex-col gap-5">
              <div
                  v-for="(item, index) of addressesList.data"
                  :key="index"
                  class="p-4 border border-[#F0DFDF] rounded-lg flex items-center justify-between">
                <p>{{ item.country.title }}, {{ item.address }}, {{ item.entrance }} подъезд, этаж {{ item.floor }},
                  кв. {{ item.float }}</p>
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
          </div>
          <div v-else class="spinner p-3"></div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>