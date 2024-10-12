<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import { PlusIcon, TrashIcon, TruckIcon } from "@heroicons/vue/24/outline";
import { useAddressesStore } from "~/stores/addresses.js";

const { t } = useI18n();
const localePath = useLocalePath();
const addresses = useAddressesStore();
const { addressesList } = storeToRefs(addresses);
const modals = useModalsStore();

const links = computed(() => [
  { title: t("breadcrumbs.home"), link: localePath("/") },
  { title: t("breadcrumbs.profile"), link: localePath("/profile") },
  { title: t("breadcrumbs.addresses"), link: localePath("/profile/addresses") },
]);

onMounted(async () => {
  await nextTick();
  await addresses.getAddresses();
});

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
  link: [{ rel: "canonical", href: t("headers.addresses.canonical") }],
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links" />
    <NuxtLayout name="profile">
      <div class="bg-white p-4 md:p-6 rounded-2xl set_shadow">
        <div class="flex justify-between items-center mb-4">
          <div class="flex gap-3 items-center">
            <TruckIcon class="text-mainColor w-8 h-8" />
            <p class="text-sm md:text-xl font-medium">
              {{ $t("profile.my_addresses") }}
            </p>
          </div>
        </div>
        <div v-if="addressesList">
          <div
            v-if="addressesList.data.length > 0"
            class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5"
          >
            <div
              v-for="(item, index) of addressesList.data"
              :key="index"
              class="p-4 border border-[#F0DFDF] rounded-lg flex items-center justify-between text-sm md:text-base"
            >
              <p>
                {{ item.country.title }}, {{ item.address }},
                {{ item.entrance }} {{ $t("profile.entrance") }},
                {{ $t("profile.floor") }} {{ item.floor }},
                {{ $t("profile.apartment") }}. {{ item.float }}
              </p>
              <TrashIcon
                class="w-5 h-5 text-red-500 cursor-pointer"
                @click="modals.showModal('removeAddress', item)"
              />
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500 py-3">
              {{ t("profile.no_addresses") }}
            </p>
          </div>
          <div
            @click="modals.showModal('createAddress')"
            class="border border-dashed border-[#F0DFDF] text-center cursor-pointer transition-all hover:bg-mainColor hover:text-white justify-center items-center py-4 rounded-xl mt-4 flex gap-3 text-mainColor"
          >
            <PlusIcon class="w-5 h-5" />
            <p class="text-sm md:text-xl font-light">
              {{ t("profile.add_address") }}
            </p>
          </div>
        </div>
        <div v-else class="spinner p-3"></div>
      </div>
    </NuxtLayout>
  </div>
</template>
