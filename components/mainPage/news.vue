<script lang="ts" setup>
import NewsCard from "~/components/cards/newsCard.vue";
import ProductsPreloader from "~/components/general/productsPreloader.vue";
import Heading from "~/components/general/heading.vue";

const router = useRouter()
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
  await router.push({query: {}});
  await news.getNews()
})
</script>

<template>
  <div>
    <div class="container mx-auto px-4 lg:px-0">
      <Heading
          :linkTitle="$t('mainPage.news.link')"
          :title="$t('mainPage.news.title')"
          link="/news"
      />
      <div v-if="newsList">
        <client-only>
          <my-carousel-carousel
              :autoplay="4000"
              :breakpoints="newsBreakpoints"
              :mouse-drag="true"
              :touch-drag="true"
              :wrap-around="true"
          >
            <my-carousel-slide
                v-for="(post, index) of newsList.data"
                :key="index"
                ref="artworkMainCarousel">
              <NewsCard :item-index="index" :postData="post" class="mx-2"/>
            </my-carousel-slide>
          </my-carousel-carousel>
        </client-only>
      </div>
      <ProductsPreloader v-else/>
    </div>
  </div>
</template>
