<script lang="ts" setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Banner from "~/components/general/banner.vue";
import NoResults from "~/components/general/noResults.vue";
import Pagination from "~/components/general/pagination.vue";

const colors = useColorsStore()
const {colorsList, mainColorsList} = storeToRefs(colors)
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)
const localePath = useLocalePath()
const {t} = useI18n()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.colors'), link: localePath('/colors')},
]);

onMounted(async () => {
  await nextTick()
  await colors.getColors()
  await colors.getMainColors()
})
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <Banner
        :sec_title="$t('colors.sec_title')"
        :title="$t('colors.title')"
        image="colors"
        text_color="main"
    />

    <div class="container mx-auto px-4 md:px-0">
      <div>
        <p class="text-2xl font-montserrat font-medium mb-9">
          {{ $t('colors.choose_color') }}
        </p>
        <div v-if="mainColorsList" class="mb-10">
          <div
              v-if="mainColorsList.length > 0"
              class="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-x-5 md:grid-cols-6">
            <label
                v-for="(item, index) of mainColorsList"
                :key="index"
                :style="`background: ${item.hex}`"
                class="w-full h-20 rounded-md p-3">
              <input class="rounded-full w-4 h-4 bg-none" type="checkbox">
            </label>
          </div>
          <NoResults v-else/>
        </div>
      </div>
      <div class="mb-8">
        <h2 class="text-lg md:text-4xl font-medium font-montserrat border-b-2 border-[#F0DFDF] w-full pb-4">
          {{ $t('colors.style_text') }}
        </h2>
      </div>
      <div v-if="colorsList">
        <div
            v-if="colorsList.data.length > 0"
            class="grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-x-5 md:grid-cols-6">
          <div
              v-for="(item, index) of colorsList.data"
              :key="index"
              class="bg-white rounded-2xl p-4 text-sm pb-8"
              style="box-shadow: 0px 0px 20px 0px #0000000D;"
          >
            <div
                :style="`background: ${item.hex}`"
                class="mb-4 w-full h-[170px] rounded-2xl relative"
            >
              <div class="absolute right-3 top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg
                    v-if="item.id"
                    class="size-5 w-5 h-5 text-mainColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      clip-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill-rule="evenodd"
                  />
                </svg>
                <svg
                    v-else
                    class="size-5 w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <path
                      clip-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill-rule="evenodd"
                  />
                </svg>

              </div>
            </div>
            <p>{{ item.title[cur_lang] }}</p>
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
      <div v-if="colorsList">
        <Pagination
            :meta-data="colorsList.meta"
            @updatePage="colors.getColors()"
        />
      </div>
    </div>
  </div>
</template>