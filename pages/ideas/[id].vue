<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useIdeasStore} from "~/stores/ideas.js";
import {useLanguagesStore} from "~/stores/languages.js";

const ideas = useIdeasStore()
const {ideaDetail} = storeToRefs(ideas)
const route = useRoute()
const {t} = useI18n()
const localePath = useLocalePath()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.ideas'), link: localePath('/ideas')},
  {title: ideaDetail.value?.title[cur_lang.value], link: localePath(`/ideas/${ideaDetail.value?.id}`)},
]);

onMounted(async () => {
  await nextTick()
  await ideas.getIdeaDetail(route.params.id)
})
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <div v-if="ideaDetail">
      <div class="h-[500px] relative mb-7">
        <img
            :src="ideaDetail.image_url"
            alt=""
            class="w-full h-full object-cover absolute left-0 top-0">
        <div class="container mx-auto px-4 lg:px-0 relative z-10 h-full">
          <div class="text-4xl text-white font-bold bg-white h-full w-full md:w-1/3 flex items-end p-7">
            <p class="text-mainColor font-montserrat">{{ ideaDetail.title[cur_lang] }}</p>
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
            <div
                v-for="(value, key) of item"
                :key="key"
                class="w-full">
              <div v-if="value.type === 'text'">
                <div
                    v-for="(it, ind) of value.content.texts"
                    :key="ind"
                    class="px-7 py-16"
                >
                  <p class="mb-3 font-bold text-3xl">
                    {{ it.heading }}
                  </p>
                  <p class="text-xl">
                    {{ it.text }}
                  </p>
                </div>
              </div>
              <div v-if="value.type === 'colors'">
                <div
                    v-for="(it, ind) of value.content.colors"
                    :key="ind"
                    class="px-5 py-7"
                    :style="`background: #${it}`"
                >
                  <p class="text-white">
                    #{{ it }}
                  </p>
                </div>
              </div>
              <div
                  v-if="value.type === 'photos'"
                  class="flex gap-1">
                <div
                    v-for="(it, ind) of value.content.photos"
                    :key="ind"
                    class="w-full max-h-[400px]"
                >
                  <img class="w-full h-full object-cover" :src="it" alt="">
                </div>
              </div>
              <div v-if="value.type === 'color_combinations'">
                <div class="px-7 py-12 text-white" :style="`background: ${ideaDetail.color_title.hex}`">
                  <p class="text-3xl font-extrabold mb-5">
                    Цветовая схема:
                  </p>
                  <p class="mb-3 text-lg font-medium">
                    {{ value.content.title }}
                  </p>
                </div>
                <div class="py-5">
                  <ul
                      class="list-disc pr-4 pl-7 flex flex-col gap-8"
                  >
                    <li
                        v-for="(it, ind) of value.content.texts"
                        :key="ind"
                        class="text-sm">
                      {{ it }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>