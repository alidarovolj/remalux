<script setup lang="ts">
import NewsCard from "~/components/cards/newsCard.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import ProductsPreloader from "~/components/general/productsPreloader.vue";

const localePath = useLocalePath()
const newsBreakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 3,
    snapAlign: "start"
  }
})

const artworkMainCarousel = ref(null);

const news = useNewsStore()
const {newsList} = storeToRefs(news)

onMounted(async () => {
  await nextTick()
  await news.getNews()
})
</script>

<template>
  <div class="mb-36">
    <div class="container mx-auto px-4 lg:px-0 mb-10">
      <div
          class="flex justify-between items-center pb-3 mb-10"
          style="box-shadow: 0px 6px 6.4px -4px #00000026;">
        <h2 class="text-lg md:text-3xl font-bold">
          {{ $t('mainPage.news.title') }}
        </h2>
        <NuxtLink
            :to="localePath('/news')"
            class="flex gap-2 items-center text-mainColor">
          <p class="text-sm md:text-xl">
            {{ $t('mainPage.news.link') }}
          </p>
          <ChevronRightIcon class="w-5 h-5"/>
        </NuxtLink>
      </div>
      <div v-if="newsList">
        <client-only>
          <my-carousel-carousel
              :breakpoints="newsBreakpoints"
              :mouse-drag="true"
              :touch-drag="true"
          >
            <my-carousel-slide
                ref="artworkMainCarousel"
                v-for="(post, index) of newsList.data"
                :key="index">
              <NewsCard :postData="post" class="mx-2"/>
            </my-carousel-slide>
          </my-carousel-carousel>
        </client-only>
      </div>
      <ProductsPreloader v-else/>
    </div>
  </div>
</template>
