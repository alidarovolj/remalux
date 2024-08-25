<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Pagination from "~/components/general/pagination.vue";
import NoResults from "~/components/general/noResults.vue";
import {useLanguagesStore} from "~/stores/languages.js";
import IdeaCard from "~/components/cards/ideaCard.vue";
import Banner from "~/components/general/banner.vue";

const ideas = useIdeasStore()
const {ideasList, ideaColorsList, ideaRoomsList} = storeToRefs(ideas)

const {t} = useI18n()
const localePath = useLocalePath()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.ideas'), link: localePath('/ideas')},
]);

onMounted(async () => {
  await nextTick()
  await ideas.getIdeas()
  await ideas.getIdeaColors()
  await ideas.getIdeaRooms()
})
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>

    <Banner
        :title="$t('ideas.page_title.first')"
        :sec_title="$t('ideas.page_title.second')"
        text_color="main"
        image="ideas"
    />

    <div class="container mx-auto px-4 lg:px-0">
      <main class="mx-auto">
        <div class="pb-24">
          <section
              aria-labelledby="product-heading"
              class="mt-6 lg:mt-0 w-full">
            <div class="flex gap-5 flex-col md:flex-row justify-between items-center mb-9">
              <p class="text-2xl font-montserrat">
                {{ $t('ideas.direction') }}
              </p>
              <select
                  v-if="ideaRoomsList"
                  class="w-full md:w-1/3 p-4 rounded-lg border">
                <option :value="null">
                  {{ $t('ideas.select_room') }}
                </option>
                <option
                    v-for="(item, index) of ideaRoomsList"
                    :key="index"
                    :value="item">
                  {{ item.title }}
                </option>
              </select>
            </div>
            <div
                v-if="ideaColorsList"
                class="grid grid-cols-2 gap-y-5 sm:grid-cols-6 sm:gap-x-5 sm:gap-y-10 mb-28">
              <label
                  v-for="(item, index) of ideaColorsList.data"
                  :key="index"
                  class="w-full h-20 rounded-md p-3"
                  :style="`background: ${item.hex}`">
                <input type="checkbox" class="rounded-full w-5 h-5 bg-none">
              </label>
            </div>
            <div
                v-if="ideasList">
              <div
                  v-if="ideasList.data.length > 0"
                  class="grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-3">
                <IdeaCard
                    v-for="(idea, index) in ideasList.data"
                    :key="index"
                    :data="idea"
                    class="mx-2"
                />
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
            <div v-if="ideasList">
              <Pagination :meta-data="ideasList.meta"/>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>