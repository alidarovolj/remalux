<script setup lang="ts">
import NewsCard from "~/components/cards/newsCard.vue";
import {ChevronRightIcon} from "@heroicons/vue/24/outline";

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
const posts = ref([
  {
    id: 1,
    title: 'Благородный эффект',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Качественно и на века!',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Отделать, а не отделаться!',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  }
])

const news = useNewsStore()
const { newsList } = storeToRefs(news)

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
            :to="localePath('/')"
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
    </div>
  </div>
</template>
