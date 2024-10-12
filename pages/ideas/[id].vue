<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import { useIdeasStore } from "~/stores/ideas.js";
import { useLanguagesStore } from "~/stores/languages.js";
import NoResults from "~/components/general/noResults.vue";
import { useColorCookieStore } from "~/stores/colorCookie.js";
import { useModalsStore } from "~/stores/modals.js";
import { useProductsStore } from "~/stores/products.js";

const favouriteColorIds = computed(() => {
  return colors.favouriteColorsList?.data?.map((fav) => fav.color.id);
});

const ideas = useIdeasStore();
const { ideaDetail } = storeToRefs(ideas);
const modals = useModalsStore();
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();
const languages = useLanguagesStore();
const { cur_lang } = storeToRefs(languages);
const savedColor = useColorCookieStore();
const colors = useColorsStore();
const { colorCookie } = storeToRefs(savedColor);
const products = useProductsStore();

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

const saveColor = async (color) => {
  await savedColor.saveCookie(color);
  if (products.detailProduct) {
    modals.showModal("chosenColor", products.detailProduct);
  } else {
    modals.showModal("chosenColor", null);
  }
};

const links = computed(() => [
  { title: t("breadcrumbs.home"), link: localePath("/") },
  { title: t("breadcrumbs.ideas"), link: localePath("/ideas") },
  {
    title: ideaDetail.value?.title[cur_lang.value],
    link: localePath(`/ideas/${ideaDetail.value?.id}`),
  },
]);

onMounted(async () => {
  await nextTick();
  await ideas.getIdeaDetail(route.params.id);
});

const dynamicTitle = computed(() => {
  return ideaDetail.value?.title[cur_lang.value] + " - Remalux";
});

const dynamicMeta = computed(() => {
  return [
    {
      property: "description",
      content: t("headers.store.description"),
    },
    {
      property: "og:description",
      content: t("headers.store.description"),
    },
    {
      property: "og:title",
      content: dynamicTitle.value,
    },
    {
      property: "og:url",
      content: `${t("headers.store.og_url")}/${route.params.id}`,
    },
  ];
});

const dynamicLink = computed(() => {
  return [
    {
      rel: "canonical",
      href: `${t("headers.ideas.canonical")}/${route.params.id}`,
    },
  ];
});

useHead({
  title: dynamicTitle,
  meta: dynamicMeta,
  link: dynamicLink,
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links" />
    <div v-if="ideaDetail">
      <div class="h-[100px] md:h-[500px] relative mb-7">
        <img
          :src="ideaDetail.image_url"
          alt=""
          class="w-full h-full object-cover absolute left-0 top-0"
        />
        <div class="container mx-auto px-4 lg:px-0 relative z-10 h-full">
          <div
            class="text-xl md:text-4xl text-white font-bold bg-transparent md:bg-white h-full w-full md:w-1/3 flex items-end p-7"
          >
            <p
              class="text-mainColor font-montserrat bg-white md:bg-transparent p-3 md:p-0 rounded-md md:rounded-none"
            >
              {{ ideaDetail.title[cur_lang] }}
            </p>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4 md:px-0">
        <div class="flex flex-col gap-5 py-24">
          <div
            v-for="(item, index) of ideaDetail.values"
            :key="index"
            class="flex flex-col md:flex-row gap-5 w-full items-center"
          >
            <div v-for="(value, key) of item" :key="key" class="w-full">
              <div v-if="value.type === 'text'">
                <div
                  v-for="(it, ind) of value.content.texts"
                  :key="ind"
                  class="px-4 md:px-7 py-16"
                >
                  <p
                    class="mb-3 font-semibold text-xl md:text-3xl font-montserrat"
                  >
                    {{ it.heading }}
                  </p>
                  <p class="text-sm md:text-xl font-light">
                    {{ it.text }}
                  </p>
                </div>
              </div>
              <div v-if="value.type === 'colors'">
                <div
                  v-for="(it, ind) of value.content.colors"
                  :key="ind"
                  :style="`background: #${it}`"
                  class="px-5 py-7"
                >
                  <p class="bg-white w-max px-4 py-1 rounded-md text-sm">
                    #{{ it }}
                  </p>
                </div>
              </div>
              <div v-if="value.type === 'photos'" class="flex gap-1">
                <div
                  v-for="(it, ind) of value.content.photos"
                  :key="ind"
                  class="w-full max-h-[400px]"
                >
                  <img
                    :src="it"
                    alt=""
                    class="w-full h-full object-cover hover:scale-105 transition-all"
                  />
                </div>
              </div>
              <div v-if="value.type === 'color_combinations'">
                <div
                  :style="`background: ${ideaDetail.color_title.hex}`"
                  class="px-7 py-12 text-white"
                >
                  <p class="text-lg md:text-3xl font-bold mb-5 font-montserrat">
                    Цветовая схема:
                  </p>
                  <p class="mb-3 text-sm md:text-lg font-medium">
                    {{ value.content.title }}
                  </p>
                </div>
                <div class="py-5">
                  <ul class="list-disc pr-4 pl-7 flex flex-col gap-8">
                    <li
                      v-for="(it, ind) of value.content.texts"
                      :key="ind"
                      class="text-sm"
                    >
                      {{ it }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-10">
          <p
            class="mt-2 text-xl md:text-3xl font-montserrat font-semibold tracking-tight pb-5 border-b mb-5"
          >
            Используемые цвета
          </p>
          <div class="flex gap-3 justify-center w-full">
            <div class="w-full" v-if="ideaDetail.colors">
              <div
                v-if="ideaDetail.colors.length > 0"
                class="w-full grid md:flex grid-cols-2 gap-3"
              >
                <div
                  v-for="(item, index) of ideaDetail.colors"
                  :key="index"
                  class="w-full bg-white rounded-2xl p-4 text-sm pb-8 hover:bg-[#F0DFDF] !transition-all cursor-pointer relative"
                  :class="{
                    'border-2 border-mainColor': colorCookie?.id === item.id,
                  }"
                  style="box-shadow: 0px 0px 20px 0px #0000000d"
                  :data-aos="'fade-up'"
                  :data-aos-delay="index * 10"
                >
                  <div
                    @click="addOrRemoveFavouriteColor(item.id)"
                    class="absolute right-7 top-7 w-8 h-8 rounded-full bg-white flex items-center justify-center z-20"
                  >
                    <svg
                      v-if="favouriteColorIds?.includes(item.id)"
                      class="size-5 w-5 h-5 text-mainColor"
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
                    <svg
                      v-else
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
                  <div
                    :style="`background: ${item.hex}`"
                    @click="saveColor(item)"
                    class="mb-4 w-full h-[170px] rounded-2xl relative transition-all"
                  ></div>
                  <p @click="saveColor(item)">{{ item.title[cur_lang] }}</p>
                </div>
              </div>
              <NoResults v-else />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
