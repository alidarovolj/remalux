<script lang="ts" setup>
import IdeaCard from "~/components/cards/ideaCard.vue";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import Heading from "~/components/general/heading.vue";

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
const {ideasList} = storeToRefs(ideas)

onMounted(async () => {
  await nextTick()
  await ideas.getIdeas()
})

const preventAnchorNavigation = (event: MouseEvent) => {
  event.preventDefault()
}
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <Heading
        :linkTitle="$t('mainPage.ideas.link')"
        :title="$t('mainPage.ideas.title')"
        link="/ideas"
    />
    <div v-if="ideasList">
      <client-only>
        <my-carousel-carousel
            :autoplay="4000"
            :breakpoints="breakpoints"
            :mouse-drag="true"
            :touch-drag="true"
            :wrap-around="true"
            @mousedown="preventAnchorNavigation"
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