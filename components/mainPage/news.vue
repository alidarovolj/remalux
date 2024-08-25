<script setup lang="ts">
import NewsCard from "~/components/cards/newsCard.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import Heading from "~/components/general/heading.vue";

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
  <div>
    <div class="container mx-auto px-4 lg:px-0">
      <Heading
          :title="$t('mainPage.news.title')"
          link="/news"
          :linkTitle="$t('mainPage.news.link')"
      />
      <div v-if="newsList">
        <client-only>
          <my-carousel-carousel
              :breakpoints="newsBreakpoints"
              :mouse-drag="true"
              :touch-drag="true"
              :wrap-around="true"
              :autoplay="4000"
          >
            <my-carousel-slide
                ref="artworkMainCarousel"
                v-for="(post, index) of newsList.data"
                :key="index">
              <NewsCard :postData="post" :item-index="index" class="mx-2"/>
            </my-carousel-slide>
          </my-carousel-carousel>
        </client-only>
      </div>
      <ProductsPreloader v-else/>
    </div>
  </div>
</template>
