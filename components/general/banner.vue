<script setup>
import {computed} from 'vue';
import img1 from '@/assets/img/logos/mainLogo.svg';
import img2 from '@/assets/img/logos/whiteLogo.png';

const props = defineProps(['title', 'sec_title', 'text_color', 'image']);

const logoSrc = computed(() => {
  if (props.text_color === 'main') {
    return img1;
  } else if (props.text_color === 'white') {
    return img2;
  }
  return '';
});
</script>

<template>
  <client-only>
    <div class="relative py-16 bg-white mb-10">
      <div class="container mx-auto relative z-10 px-4 md:px-0">
        <div
            :class="[
              { '!text-mainColor' : text_color === 'main' },
              { '!text-white' : text_color === 'white' },
              { '!text-black' : text_color === 'black' }
            ]"
            class="text-2xl md:text-[40px] font-medium font-montserrat">
          <p class="mb-3">{{ title }}</p>
          <div class="flex items-top gap-2">
            <p class="h-max leading-3">{{ sec_title }}</p>
            <img
                :src="logoSrc"
                class="h-14"
                alt="">
          </div>
        </div>
      </div>
      <img
          v-if="image === 'products'"
          class="absolute right-0 top-0 h-full w-full object-cover object-left md:object-right block"
          src="@/assets/img/products/main.png"
          alt="">
      <img
          v-if="image === 'ideas'"
          class="absolute right-0 top-0 h-full w-full object-cover object-left md:object-right block"
          src="~/assets/img/ideas/bg.png"
          alt="">
      <img
          v-if="image === 'colors'"
          class="absolute right-0 top-0 h-full w-full object-cover object-left md:object-right block"
          src="~/assets/img/colors/bg.png"
          alt="">
      <img
          v-if="image === 'news'"
          class="absolute right-0 top-0 h-full w-full object-cover object-right hidden md:block"
          src="~/assets/img/news/bg.png"
          alt="">
    </div>
  </client-only>
</template>