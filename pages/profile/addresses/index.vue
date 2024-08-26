<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {PlusIcon, TrashIcon, TruckIcon} from "@heroicons/vue/24/outline"
import {useAddressesStore} from "~/stores/addresses.js";

const {t} = useI18n()
const localePath = useLocalePath()
const addresses = useAddressesStore()
const {addressesList} = storeToRefs(addresses)
const modals = useModalsStore()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.profile'), link: localePath('/profile')},
  {title: t('breadcrumbs.addresses'), link: localePath('/profile/addresses')},
]);

onMounted(async () => {
  await nextTick()
  await addresses.getAddresses()
})

useHead({
  title: t("headers.addresses.title"),
  meta: [
    {
      property: "description",
      content: t("headers.addresses.description"),
    },
    {
      property: "og:description",
      content: t("headers.addresses.description"),
    },
    {
      property: "og:title",
      content: t("headers.addresses.title"),
    },
    {
      property: "og:url",
      content: t("headers.addresses.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.addresses.canonical")}],
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <NuxtLayout name="profile">
      <div class="bg-white p-6 rounded-2xl set_shadow">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 mb-6">
            <TruckIcon class="w-8 h-8 text-mainColor"/>
            <h1 class="text-xl font-medium">
              {{ t('profile.my_addresses') }}
            </h1>
          </div>
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
        <div
            class="cursor-pointer flex items-center justify-center py-4 border rounded-lg border-dashed border-mainColor text-mainColor text-center text-xl gap-3 mt-5"
            @click="modals.showModal('createAddress')">
          <PlusIcon class="w-7 h-7"/>
          <p>
            {{ t('profile.add_address') }}
          </p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>