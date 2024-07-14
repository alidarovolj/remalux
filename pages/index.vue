<script setup>
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline"
import ProductCard from "~/components/cards/productCard.vue";
import IdeaCard from "~/components/cards/ideaCard.vue";
import NewsCard from "~/components/cards/newsCard.vue";

const leftPaneWidth = ref(200);
const isDragging = ref(false);
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

const startDragging = () => {
  isDragging.value = true;
};

const onDrag = (event) => {
  if (isDragging.value) {
    leftPaneWidth.value = event.clientX;
  }
};

const stopDragging = () => {
  isDragging.value = false;
};

onMounted(() => {
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDragging);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDragging);
});

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
const social = ref([
  {
    name: 'Facebook',
    href: '#',
    icon: defineComponent({
      render: () =>
          h('svg', {fill: 'currentColor', viewBox: '0 0 24 24'}, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
              'clip-rule': 'evenodd',
            }),
          ]),
    }),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: defineComponent({
      render: () =>
          h('svg', {fill: 'currentColor', viewBox: '0 0 24 24'}, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
              'clip-rule': 'evenodd',
            }),
          ]),
    }),
  },
  {
    name: 'X',
    href: '#',
    icon: defineComponent({
      render: () =>
          h('svg', {fill: 'currentColor', viewBox: '0 0 24 24'}, [
            h('path', {
              d: 'M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z',
            }),
          ]),
    }),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: defineComponent({
      render: () =>
          h('svg', {fill: 'currentColor', viewBox: '0 0 24 24'}, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
              'clip-rule': 'evenodd',
            }),
          ]),
    }),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: defineComponent({
      render: () =>
          h('svg', {fill: 'currentColor', viewBox: '0 0 24 24'}, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z',
              'clip-rule': 'evenodd',
            }),
          ]),
    }),
  },
])
</script>

<template>
  <div>
    <div class="flex w-full h-[500px] relative">
      <div
          class="h-full absolute bg-[#5B7986]"
          :style="{ width: leftPaneWidth + 'px' }">
      </div>
      <div
          class="h-full w-[10px] bg-[#5B7986] absolute bg-none flex justify-center"
          :style="{ left: leftPaneWidth + 'px' }">
        <div
            class="w-[50px] h-[50px] rounded-full cursor-ew-resize flex items-center gap-2 relative z-10 bg-white mt-8"
            @mousedown="startDragging">
          <ChevronLeftIcon class="w-5 h-5"/>
          <ChevronRightIcon class="w-5 h-5"/>
        </div>
      </div>
      <div
          class="h-full absolute bg-[#8E9D74]"
          :style="{ left: leftPaneWidth + 10 + 'px', width: 'calc(100% - ' + (leftPaneWidth + 10) + 'px)' }">
      </div>
      <div
          class="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-0 relative px-4 md:px-0">
        <div class="w-full md:w-1/3">
          <div class="relative z-20 flex flex-col gap-7">
            <h2 class="text-xl md:text-4xl font-bold text-white">
              Высокое евпропейское качество по доступной цене
            </h2>
            <div class="flex gap-6">
              <NuxtLink
                  to="/"
                  class="w-full bg-white text-[#5B7986] rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
              >
                Выбрать краску
              </NuxtLink>
              <NuxtLink
                  to="/"
                  class="w-full bg-none text-white rounded-xl py-3 text-center text-base md:text-xl font-bold border-2 border-white"
              >
                Выбрать цвет
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3">
          <div class="relative z-10">
            <img
                class="w-1/2 mx-auto md:mx-0"
                src="~/assets/img/mainPage/photoFrame.png"
                alt="">
          </div>
        </div>
        <img
            class="w-full md:w-1/2 absolute right-0 -bottom-1/2 -translate-y-1/2 lg:-translate-y-1/3"
            src="~/assets/img/mainPage/tableSofa.png"
            alt="">
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mt-40 mb-32">
      <div class="flex flex-col md:flex-row gap-5">
        <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
          <div class="flex flex-col gap-5 w-2/3 pl-7">
            <p class="text-2xl md:text-4xl font-bold">
              Фирменная краска
            </p>
            <p class="text-[#525252] text-xs md:text-base">
              Для любого типа поверхностей
            </p>
          </div>
          <img
              class="w-1/3"
              src="~/assets/img/mainPage/paint.png"
              alt="">
        </div>
        <div class="w-full md:w-1/2 flex flex-col gap-5">
          <div class="h-full flex flex-col md:flex-row gap-5">
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Покрытие
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/surface.png"
                  alt="">
            </div>
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Лак
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/lack.png"
                  alt="">
            </div>
          </div>
          <div class="h-full flex flex-col md:flex-row gap-5">
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Краска
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/paintbrush.png"
                  alt="">
            </div>
            <div class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white">
              <div class="flex flex-col gap-5 w-2/3 pl-7">
                <p class="text-2xl font-bold">
                  Шпатлевка
                </p>
                <p class="text-xs text-[#525252]">
                  Для любого типа поверхностей
                </p>
              </div>
              <img
                  class="w-1/3 h-full rounded-tr-xl rounded-br-xl object-cover object-right"
                  src="~/assets/img/mainPage/shpat.png"
                  alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mb-32">
      <div
          class="flex justify-between items-center pb-3 mb-8"
          style="box-shadow: 0px 6px 6.4px -4px #00000026;">
        <h2 class="text-lg md:text-3xl font-bold">
          Готовые решения для вашего дома
        </h2>
        <NuxtLink
            to="/"
            class="flex gap-2 items-center text-mainColor">
          <p class="text-sm md:text-xl">
            Больше идей
          </p>
          <ChevronRightIcon class="w-5 h-5"/>
        </NuxtLink>
      </div>
      <my-carousel-carousel
          :breakpoints="breakpoints"
          :mouse-drag="true"
          :touch-drag="true"
      >
        <my-carousel-slide
            v-for="(item, index) of 10"
            :key="index">
          <IdeaCard class="mx-2"/>
        </my-carousel-slide>
        <template #addons>
          <my-carousel-navigation/>
          <my-carousel-pagination/>
        </template>
      </my-carousel-carousel>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mb-36">
      <div
          class="flex justify-between items-center pb-3"
          style="box-shadow: 0px 6px 6.4px -4px #00000026;">
        <h2 class="text-lg md:text-3xl font-bold">
          Популярные товары
        </h2>
        <NuxtLink
            to="/"
            class="flex gap-2 items-center text-mainColor">
          <p class="text-sm md:text-xl">
            Больше товаров
          </p>
          <ChevronRightIcon class="w-5 h-5"/>
        </NuxtLink>
      </div>
      <div class="flex flex-col md:flex-row gap-5 h-full">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mb-36">
      <div class="rounded-xl relative flex flex-col md:flex-row">
        <img
            class="w-full h-full absolute rounded-xl object-cover object-right-bottom"
            src="~/assets/img/bg-app.jpg"
            alt="">
        <div
            class="w-full md:w-1/2 py-14 px-4 md:px-9 rounded-xl relative z-10"
            style="background: linear-gradient(90deg, #C37F7F 72.63%, rgba(115, 115, 115, 0) 100%);">
          <h2 class="text-3xl font-bold text-white mb-5">
            Remalux
          </h2>
          <p class="font-medium text-white mb-9">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus ornare vestibulum et,
            feugiat quis dui. Vivamus sit amet dolor et magna facilisis rhoncus. Curabitur maximus est sed porta
            scelerisque. Sed suscipit, arcu volutpat feugiat posuere, eros nisi tristique nibh, mollis vehicula lectus
            tortor eu purus. Donec ut tortor blandit, sagittis diam eget, suscipit eros.
          </p>
          <div class="flex gap-3 md:gap-7">
            <img
                class="w-auto h-12"
                src="~/assets/img/apple.png"
                alt="">
            <img
                class="w-auto h-12"
                src="~/assets/img/android.png"
                alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="mb-36">
      <div class="container mx-auto px-4 lg:px-0 mb-10">
        <div
            class="flex justify-between items-center pb-3 mb-10"
            style="box-shadow: 0px 6px 6.4px -4px #00000026;">
          <h2 class="text-lg md:text-3xl font-bold">
            Актуальные новости
          </h2>
          <NuxtLink
              to="/"
              class="flex gap-2 items-center text-mainColor">
            <p class="text-sm md:text-xl">
              Перейти в новости
            </p>
            <ChevronRightIcon class="w-5 h-5"/>
          </NuxtLink>
        </div>
        <my-carousel-carousel
            :breakpoints="newsBreakpoints"
            :mouse-drag="true"
            :touch-drag="true"
        >
          <my-carousel-slide
              ref="artworkMainCarousel"
              v-for="(post, index) of posts"
              :key="index">
            <NewsCard :postData="post" class="mx-2"/>
          </my-carousel-slide>
        </my-carousel-carousel>
      </div>
    </div>
    <div class="container mx-auto px-4 lg:px-0 mb-36">
      <div class="rounded-xl relative flex flex-col md:flex-row">
        <img
            class="w-full h-full absolute rounded-xl object-cover object-right-top"
            src="~/assets/img/mainPage/about.png"
            alt="">
        <div
            class="w-full md:w-1/2 py-14 px-4 md:px-9 rounded-xl relative z-10"
            style="background: linear-gradient(90deg, #C37F7F 72.63%, rgba(115, 115, 115, 0) 100%);">
          <h2 class="text-3xl font-bold text-white mb-5">
            О нас Remalux
          </h2>
          <p class="font-medium text-white mb-9">
            ТОО «К-КОЛОР» «K-COLOR» с торговой маркой «REMALUX» – высокое европейское качество по доступной цене.
            Компания ТОО «К-КОЛОР» «K-COLOR» с торговой маркой «REMALUX» – лидер в производстве лакокрасочных
            материалов, расположенный в Республике Казахстан. Мы предлагаем вниманию потребителей широкий ассортимент
            красок высшего качества, изготовленных по британской лицензии из сырья именитых французских, бельгийских,
            немецких, голландских и американских производителей.
          </p>
          <div class="flex space-x-6">
            <a v-for="item in social" :key="item.name" :href="item.href" class="text-gray-500 hover:text-gray-400">
              <span class="sr-only">{{ item.name }}</span>
              <div class="border-2 border-white p-3 rounded-full">
                <component :is="item.icon" class="h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.set_shadow {
  box-shadow: 7px 7px 20px 0px #0000000D;
}
</style>