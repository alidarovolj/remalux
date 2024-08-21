<script setup>
const localePath = useLocalePath()
const router = useRouter()
</script>

<template>
  <div
      data-aos="fade-up"
      class="container mx-auto px-4 lg:px-0 mt-40 mb-32">
    <div class="flex flex-col md:flex-row gap-5">
      <div
          @click="router.push({ path: localePath('/store'), query: { 'filters[category_id]': '14' } })"
          class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white transition-all cursor-pointer hov_element hover:shadow-hovShadow">
        <div class="flex flex-col gap-5 w-2/3 pl-7">
          <p class="text-2xl md:text-4xl font-bold font-montserrat">
            {{ $t('mainPage.choose_type.paint.title') }}
          </p>
          <p class="text-[#525252] text-xs md:text-base">
            {{ $t('mainPage.choose_type.paint.description') }}
          </p>
        </div>
        <img
            class="w-1/3 h-[155px] md:h-full object-contain transition-all"
            src="~/assets/img/mainPage/paint.png"
            alt="">
      </div>
      <div
          @click="router.push({ path: localePath('/store'), query: { 'filters[category_id]': '18' } })"
          class="w-full md:w-1/2 grid grid-cols-1 gap-y-4 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
        <div class="h-full flex flex-col md:flex-row gap-5">
          <div
              class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white transition-all cursor-pointer hov_element hover:shadow-hovShadow">
            <div class="flex flex-col gap-5 w-2/3 pl-7">
              <p class="text-2xl font-bold font-montserrat">
                {{ $t('mainPage.choose_type.coating.title') }}
              </p>
              <p class="text-xs text-[#525252]">
                {{ $t('mainPage.choose_type.coating.description') }}
              </p>
            </div>
            <img
                class="w-1/3 h-[155px] rounded-tr-xl rounded-br-xl object-cover object-right"
                src="~/assets/img/mainPage/surface.png"
                alt="">
          </div>
          <div
              @click="router.push({ path: localePath('/store'), query: { 'filters[category_id]': '15' } })"
              class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white transition-all cursor-pointer hov_element hover:shadow-hovShadow">
            <div class="flex flex-col gap-5 w-2/3 pl-7">
              <p class="text-2xl font-bold font-montserrat">
                {{ $t('mainPage.choose_type.varnish.title') }}
              </p>
              <p class="text-xs text-[#525252]">
                {{ $t('mainPage.choose_type.varnish.description') }}
              </p>
            </div>
            <img
                class="w-1/3 h-[155px] rounded-tr-xl rounded-br-xl object-cover object-right"
                src="~/assets/img/mainPage/lack.png"
                alt="">
          </div>
        </div>
        <div class="h-full flex flex-col md:flex-row gap-5">
          <div
              @click="router.push({ path: localePath('/store'), query: { 'filters[category_id]': '14' } })"
              class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white transition-all cursor-pointer hov_element hover:shadow-hovShadow">
            <div class="flex flex-col gap-5 w-2/3 pl-7">
              <p class="text-2xl font-bold font-montserrat">
                {{ $t('mainPage.choose_type.dye.title') }}
              </p>
              <p class="text-xs text-[#525252]">
                {{ $t('mainPage.choose_type.dye.description') }}
              </p>
            </div>
            <img
                class="w-1/3 h-[155px] rounded-tr-xl rounded-br-xl object-cover object-right"
                src="~/assets/img/mainPage/paintbrush.png"
                alt="">
          </div>
          <div
              @click="router.push({ path: localePath('/store'), query: { 'filters[category_id]': '16' } })"
              class="w-full md:w-1/2 set_shadow rounded-xl flex items-center bg-white transition-all cursor-pointer hov_element hover:shadow-hovShadow">
            <div class="flex flex-col gap-5 w-2/3 pl-7">
              <p class="text-2xl font-bold font-montserrat">
                {{ $t('mainPage.choose_type.putty.title') }}
              </p>
              <p class="text-xs text-[#525252]">
                {{ $t('mainPage.choose_type.putty.description') }}
              </p>
            </div>
            <img
                class="w-1/3 h-[155px] rounded-tr-xl rounded-br-xl object-cover object-right"
                src="~/assets/img/mainPage/shpat.png"
                alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.set_shadow {
  box-shadow: 7px 7px 20px 0px #0000000D;
}

.hov_element:hover img {
  transform: scale(1.1);
}

.hov_element:hover div p:first-child {
  color: #ad2725;
}

.hov_element:hover div p {
  transition: all 0.2s;
}
</style>
