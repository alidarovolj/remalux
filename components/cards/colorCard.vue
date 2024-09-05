<script setup>
import {useColorCookieStore} from "~/stores/colorCookie.js";
import {useNotificationStore} from "~/stores/notifications.js";

const colors = useColorsStore()
const props = defineProps(['id', 'hex', 'title'])
const savedColor = useColorCookieStore()
const { colorCookie } = storeToRefs(savedColor)
const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)
const notifications = useNotificationStore()
const modals = useModalsStore()
const products = useProductsStore()

const favouriteColorIds = computed(() => {
  return colors.favouriteColorsList?.data?.length
      ? colors.favouriteColorsList.data.map(fav => fav.color.id)
      : [];
});

const addOrRemoveFavouriteColor = async (colorId) => {
  if(token.value) {
    if (favouriteColorIds.value.includes(colorId)) {
      await colors.removeFromFavourites(colorId)
    } else {
      await colors.addToFavouriteColors(colorId)
    }
  } else {
    notifications.showNotification('error', 'Необходимо авторизоваться', 'Для добавления в избранное необходимо авторизоваться')
  }
};

const saveColor = async () => {
  let obj = {
    id: props.id,
    hex: props.hex,
    title: props.title,
  }
  await savedColor.saveCookie(obj)
  if(products.detailProduct) {
    modals.showModal('chosenColor', products.detailProduct)
  } else {
    modals.showModal('chosenColor', null)
  }
}
</script>

<template>
  <div
      class="bg-white rounded-2xl p-4 text-sm pb-8 hover:bg-[#F0DFDF] transition-all cursor-pointer relative"
      :class="{ 'border-2 border-mainColor' : colorCookie?.id === id }"
      style="box-shadow: 0px 0px 20px 0px #0000000D;"
      :data-aos="'fade-up'"
  >
    <div
        @click="addOrRemoveFavouriteColor(id)"
        class="absolute right-7 top-7 w-8 h-8 rounded-full bg-white flex items-center justify-center z-20">
      <svg
          v-if="favouriteColorIds?.includes(id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-mainColor">
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
      </svg>

      <svg
          v-else
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-mainColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>

    </div>
    <div
        :style="`background: ${hex}`"
        @click="saveColor()"
        class="mb-4 w-full h-[170px] rounded-2xl relative"
    >
    </div>
    <p @click="saveColor()">
      {{ title[cur_lang] }}
    </p>
  </div>
</template>