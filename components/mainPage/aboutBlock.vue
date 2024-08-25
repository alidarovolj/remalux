<script setup>
import img1 from "@/assets/img/social/1.png";
import img2 from "@/assets/img/social/2.png";
import img3 from "@/assets/img/social/3.png";
import img4 from "@/assets/img/social/4.png";
import img5 from "@/assets/img/social/5.png";

const social = ref([
  {
    name: "LinkedIn",
    icon: img1,
    href: "https://remalux.kz"
  },
  {
    name: "Facebook",
    icon: img2,
    href: "https://remalux.kz"
  },
  {
    name: "X",
    icon: img3,
    href: "https://remalux.kz"
  },
  {
    name: "Instagram",
    icon: img4,
    href: "https://remalux.kz"
  },
  {
    name: "TikTok",
    icon: img5,
    href: "https://remalux.kz"
  }
])
</script>

<template>
  <div
      data-aos="fade-up"
      class="container mx-auto px-4 lg:px-0">
    <div class="rounded-xl relative flex flex-col md:flex-row">
      <img
          class="w-full h-full absolute rounded-xl object-cover object-right-top"
          src="~/assets/img/mainPage/about.png"
          alt="">
      <div
          class="w-full md:w-1/2 py-14 px-4 md:px-9 rounded-xl relative z-10"
          style="background: linear-gradient(90deg, #ad2725 72.63%, rgba(115, 115, 115, 0) 100%);">
        <h2 class="text-3xl font-bold text-white mb-5 font-montserrat">
          {{ $t('mainPage.about_us.title') }}
        </h2>
        <p class="font-medium text-white mb-9">
          {{ $t('mainPage.about_us.description') }}
        </p>
        <div class="flex space-x-6">
          <a
              v-for="(item, index) in social"
              :key="index"
              :href="item.href"
              class="text-gray-500 hover:text-gray-400">
            <div class="border-2 border-white p-3 rounded-full">
              <img
                  class="w-5 h-5 object-contain"
                  :src="item.icon"
                  alt="">
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>