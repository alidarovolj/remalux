<script setup>
import { useColorCookieStore } from "~/stores/colorCookie.js";
import { PlusIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

const savedColor = useColorCookieStore();
const { colorCookie } = storeToRefs(savedColor);
const localePath = useLocalePath();
const languages = useLanguagesStore();
const { cur_lang } = storeToRefs(languages);
const auth = useAuthStore();
auth.initCookieToken();
const { token } = storeToRefs(auth);
const notifications = useNotificationStore();
const colors = useColorsStore();
const modals = useModalsStore();

const favouriteColorIds = computed(() => {
  return colors.favouriteColorsList?.data?.map((fav) => fav.color.id);
});

const addOrRemoveFavouriteColor = async (colorId) => {
  if (token.value) {
    if (favouriteColorIds.value.includes(colorId)) {
      await colors.removeFromFavourites(colorId);
    } else {
      await colors.addToFavouriteColors(colorId);
    }
  } else {
    notifications.showNotification(
      "error",
      "Необходимо авторизоваться",
      "Для добавления в избранное необходимо авторизоваться"
    );
  }
};
</script>

<template>
  <div>
    <div class="bg-white text-sm cursor-pointer mt-5">
      <div class="flex items-center gap-6 mb-4">
        <div class="flex gap-2 items-center">
          <p class="text-xl md:text-3xl font-medium whitespace-nowrap">
            {{ colorCookie.title[cur_lang] }}
          </p>
        </div>
        <div class="border-t h-[1px] w-full border-[#F0DFDF]"></div>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <div
          class="h-[200px] md:h-full w-full p-6"
          style="box-shadow: 0px 0px 20px 0px #0000000d"
        >
          <div
            :style="`background: ${colorCookie.hex}`"
            class="w-full h-full rounded-2xl relative"
          >
            <div
              @click="addOrRemoveFavouriteColor(colorCookie.id)"
              class="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center"
            >
              <svg
                :class="{
                  'text-mainColor': favouriteColorIds?.includes(colorCookie.id),
                }"
                class="size-5 w-5 h-5 text-[#E8E8E5]"
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
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-9 w-full">
          <NuxtLink
            v-if="!modals.modal.modalData"
            :to="localePath('/store')"
            @click="modals.modal.show = false"
            class="px-6 md:px-14 py-6 md:py-12 flex flex-col md:flex-row items-center gap-7 border border-mainColor rounded-xl border-dashed element_hover"
          >
            <img
              class="transition-all w-1/3 h-32 object-contain"
              src="@/assets/img/colors/paint.png"
              alt=""
            />
            <div class="flex items-center gap-6">
              <div class="p-3 bg-[#F0DFDF] rounded-full">
                <PlusIcon class="h-3 w-3 text-mainColor" />
              </div>
              <p class="text-mainColor text-lg md:text-2xl">
                {{ $t("colors_modal.first") }}
              </p>
            </div>
          </NuxtLink>
          <NuxtLink
            v-else
            :to="localePath(`/store/${modals.modal.modalData.id}`)"
            @click="modals.modal.show = false"
            class="px-6 md:px-14 py-6 md:py-12 flex flex-col md:flex-row items-center gap-7 border border-mainColor rounded-xl border-dashed element_hover"
          >
            <img
              class="transition-all w-1/3 h-32 object-contain"
              :src="modals.modal.modalData.image_url"
              alt=""
            />
            <div class="flex items-center gap-6">
              <p class="text-mainColor text-sm md:text-2xl">
                {{ modals.modal.modalData.title[cur_lang] }}
              </p>
              <div class="p-3 bg-[#F0DFDF] rounded-full">
                <ChevronRightIcon class="h-3 w-3 text-mainColor" />
              </div>
            </div>
          </NuxtLink>
          <div
            class="bg-[#F0DFDF] rounded-xl flex flex-col md:flex-row items-center gap-6 element_hover p-6 md:p-0"
          >
            <img class="" src="@/assets/img/colors/hand.png" alt="" />
            <div class="flex items-center justify-between">
              <p class="text-sm md:text-2xl text-mainColor">
                {{ $t("colors_modal.second") }}
              </p>
              <ChevronRightIcon
                class="text-mainColor w-10 md:w-20 h-10 md:h-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.element_hover:hover img {
  transform: scale(1.1);
}
</style>
