<script setup>
import { useNotificationStore } from "~/stores/notifications.js";

const notifications = useNotificationStore();
const modals = useModalsStore();
const localePath = useLocalePath();

const languages = useLanguagesStore();
const { cur_lang } = storeToRefs(languages);
</script>

<template>
  <div v-if="modals.modal.modalData">
    <p class="text-lg md:text-xl font-semibold mb-6">
      {{ $t("shopOrCart.title") }}
    </p>
    <img
      :src="modals.modal.modalData.image_url"
      alt=""
      class="w-1/2 mx-auto h-auto"
    />
    <p class="text-lg md:text-xl font-semibold mb-6 text-center">
      {{ modals.modal.modalData.title[cur_lang] }}
    </p>
    <p class="text-sm md:text-base">
      {{ $t("shopOrCart.text") }}
    </p>
    <div
      class="flex flex-col md:flex-row justify-end gap-3 mt-6 text-sm md:text-base"
    >
      <button
        class="w-full px-6 py-2 text-mainColor text-center border border-mainColor rounded-lg"
        @click="modals.modal.show = false"
      >
        {{ $t("shopOrCart.button") }}
      </button>
      <NuxtLink
        :to="localePath('/cart')"
        class="w-full px-6 py-2 text-white text-center border border-mainColor bg-mainColor rounded-lg"
        @click="modals.modal.show = false"
      >
        {{ $t("shopOrCart.checkout") }}
      </NuxtLink>
    </div>
  </div>
</template>
