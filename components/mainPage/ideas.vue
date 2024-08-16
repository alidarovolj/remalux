<script setup lang="ts">
import IdeaCard from "~/components/cards/ideaCard.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import ProductsPreloader from "~/components/general/productsPreloader.vue";

const localePath = useLocalePath()
const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 3,
    snapAlign: "start"
  }
})

const ideas = useIdeasStore()
const { ideasList } = storeToRefs(ideas)

onMounted(async () => {
  await nextTick()
  await ideas.getIdeas()
})
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 mb-32">
    <div
        class="flex justify-between items-center pb-3 mb-8"
        style="box-shadow: 0px 6px 6.4px -4px #00000026;">
      <h2 class="text-lg md:text-3xl font-bold">
        {{ $t('mainPage.ideas.title') }}
      </h2>
      <NuxtLink
          :to="localePath('/')"
          class="flex gap-2 items-center text-mainColor">
        <p class="text-sm md:text-xl">
          {{ $t('mainPage.ideas.link') }}
        </p>
        <ChevronRightIcon class="w-5 h-5"/>
      </NuxtLink>
    </div>
    <div v-if="ideasList">
      <client-only>
        <my-carousel-carousel
            :breakpoints="breakpoints"
            :mouse-drag="true"
            :touch-drag="true"
            :wrap-around="true"
            :autoplay="4000"
        >
          <my-carousel-slide
              v-for="(item, index) of ideasList.data"
              :key="index">
            <IdeaCard :data="item" class="mx-2"/>
          </my-carousel-slide>
          <template #addons>
            <my-carousel-navigation/>
            <my-carousel-pagination/>
          </template>
        </my-carousel-carousel>
      </client-only>
    </div>
    <ProductsPreloader v-else/>
  </div>
</template>
