<script setup>
import {useLanguagesStore} from "~/stores/languages.js";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import Pagination from "~/components/general/pagination.vue";
import AOS from 'aos';

const projects = useProjectsStore();
const {projectsList} = storeToRefs(projects);
const language = useLanguagesStore();
const {cur_lang} = language;

const carousels = ref([]); // Массив для всех каруселей

const {t} = useI18n();
const localePath = useLocalePath();

const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
});

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.projects'), link: localePath('/projects')},
]);

onMounted(async () => {
  await nextTick();
  await projects.getProjects();
});

watch(
    () => projectsList,
    async () => {
      await nextTick();
      AOS.refresh();
    }
);

const slideToImage = (index, carouselIndex) => {
  if (carousels.value[carouselIndex]) {
    carousels.value[carouselIndex].slideTo(index); // Привязываем конкретный реф карусели
  }
};

useHead({
  title: t("headers.projects.title"),
  meta: [
    {
      property: "description",
      content: t("headers.projects.description"),
    },
    {
      property: "og:description",
      content: t("headers.projects.description"),
    },
    {
      property: "og:title",
      content: t("headers.projects.title"),
    },
    {
      property: "og:url",
      content: t("headers.projects.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.projects.canonical")}],
});
</script>

<template>
  <Breadcrumbs :links="links"/>
  <div class="py-16">
    <div v-if="projectsList" class="container mx-auto px-4 lg:px-0">
      <h1 class="text-3xl font-medium mb-5 text-mainColor font-montserrat">
        {{ t('projects.title') }}
      </h1>
      <div class="flex flex-col gap-10">
        <div
            v-for="(project, carouselIndex) in projectsList.data"
            :key="project.id"
            :class="[
            { 'flex-col md:!flex-row-reverse text-check': carouselIndex % 2 === 1 },
            { 'border-none': projectsList.data.length === carouselIndex + 1 }
          ]"
            class="bg-white flex flex-col md:flex-row items-center border-b border-[#F0DFDF] pb-16"
            :data-aos-duration="carouselIndex * 100"
            data-aos="fade-up"
        >
          <div class="w-full md:w-1/2 min-w-[50%] h-full product-carousel">
            <client-only>
              <my-carousel-carousel
                  :ref="el => carousels[carouselIndex] = el"
                  :autoplay="4000"
                  :breakpoints="breakpoints"
                  :mouse-drag="true"
                  :touch-drag="true"
                  :wrap-around="true"
                  class="w-full h-full"
              >
                <my-carousel-slide
                    v-for="(item, index) of project.images"
                    :key="index"
                    class="w-full h-[350px] relative"
                >
                  <img
                      :src="item"
                      alt=""
                      class="w-full h-full absolute left-0 top-0 z-10 object-cover"
                  />
                </my-carousel-slide>
                <template v-if="project.images.length > 1" #addons="{ currentSlide, slidesCount }">
                  <div class="flex justify-center gap-4 w-full overflow-x-auto mt-4 h-[100px] max-h-[100px]">
                    <div
                        v-for="(painting, index) of project.images"
                        :key="index"
                        @click="slideToImage(index, carouselIndex)"
                        :class="{ 'border-mainColor': currentSlide === index }"
                        class="bg-cardBg border-2 rounded dark:bg-dElement cursor-pointer dark:text-dText"
                    >
                      <img
                          :src="painting"
                          alt=""
                          class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </template>
              </my-carousel-carousel>
            </client-only>
          </div>
          <div class="p-5 md:p-14">
            <h2 class="text-3xl font-medium text-mainColor mb-4 font-montserrat">
              {{ project.title[cur_lang] }}
            </h2>
            <p class="text-lg text-gray-500 mb-8" v-html="project.description[cur_lang]"></p>
          </div>
        </div>
      </div>
      <Pagination :meta-data="projectsList.meta"/>
    </div>
  </div>
</template>

<style>
.text-check p span {
  color: #000;
  background: #F5F5F5 !important;
}
</style>
