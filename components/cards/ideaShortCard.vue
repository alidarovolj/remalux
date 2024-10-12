<script setup>
import { useLanguagesStore } from "~/stores/languages.js";

const localePath = useLocalePath();
const languages = useLanguagesStore();
const { cur_lang } = storeToRefs(languages);

const props = defineProps(["data", "itemIndex"]);
</script>

<template>
  <NuxtLink
    :data-aos-duration="itemIndex * 100"
    :to="`/ideas/${data.id}`"
    class="group relative flex flex-col overflow-hidden rounded-lg bg-white set_shadow w-full hov_element transition-all"
    data-aos="fade-up"
  >
    <img
      :src="data.image_url"
      alt=""
      class="transition-all h-[100px] md:h-[230px] min-h-[100px] md:min-h-[230px] object-cover"
    />
    <div class="p-3 text-start">
      <p
        class="flex font-montserrat items-center text-xs md:text-xl font-medium truncate mb-5"
      >
        {{ data.title[cur_lang] }}
      </p>
      <p class="text-[10px] md:text-sm">
        {{ data.room_title[cur_lang] }}
      </p>
    </div>
  </NuxtLink>
</template>
