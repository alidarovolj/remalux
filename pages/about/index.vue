<script setup>
import {ShieldCheckIcon} from "@heroicons/vue/24/outline";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

useHead({
  title: t("headers.about.title"),
  meta: [
    {
      property: "description",
      content: t("headers.about.description"),
    },
    {
      property: "og:description",
      content: t("headers.about.description"),
    },
    {
      property: "og:title",
      content: t("headers.about.title"),
    },
    {
      property: "og:url",
      content: t("headers.about.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.about.canonical")}],
});
</script>

<template>
  <div class="bg-white pb-32">
    <main class="isolate">
      <!-- Hero section -->
      <div
          class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-mainColor/20 pt-14">
        <div
            aria-hidden="true"
            class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-mainColor/10 ring-1 ring-mainColor sm:-mr-80 lg:-mr-96"
        />
        <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div
              class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8"
          >
            <h1
                class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 lg:col-span-2 xl:col-auto font-montserrat"
                data-aos="fade-up">
              {{ t('about_page.hero_section.title') }}
            </h1>
            <div
                class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1"
                data-aos="fade-up">
              <p class="text-base leading-8 text-gray-600">
                {{ t('about_page.hero_section.description') }}
              </p>
            </div>
            <div
                class="relative mt-10 aspect-[6/5] w-full rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                data-aos="fade-up"
            >
              <img alt="" class="relative z-10 w-full" src="@/assets/img/about/bg.png"/>
              <div class="bg-mainColor absolute -right-4 md:-right-9 top-4 md:top-9 rounded-2xl w-full h-3/4"></div>
            </div>
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"/>
      </div>

      <div
          class="max-w-7xl mx-auto px-6 lg:px-8"
          data-aos="fade-up">
        <div class="mb-20 text-center">
          <h2 class="text-3xl font-bold mb-5 font-montserrat">
            {{ t('about_page.why_choose_us.title') }}
          </h2>
          <p class="font-medium w-full md:w-1/2 mx-auto leading-8">
            {{ t('about_page.why_choose_us.description') }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3">
          <div
              class="flex items-start gap-5"
              data-aos="fade-up">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">{{ t('about_page.why_choose_us.quality.title') }}</h3>
              <p class="text-xs text-[#7B7B7B]">{{ t('about_page.why_choose_us.quality.description') }}</p>
            </div>
          </div>
          <div
              class="flex items-start gap-5"
              data-aos="fade-up">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">{{ t('about_page.why_choose_us.innovation.title') }}</h3>
              <p class="text-xs text-[#7B7B7B]">{{ t('about_page.why_choose_us.innovation.description') }}</p>
            </div>
          </div>
          <div
              class="flex items-start gap-5"
              data-aos="fade-up">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">{{ t('about_page.why_choose_us.economy.title') }}</h3>
              <p class="text-xs text-[#7B7B7B]">{{ t('about_page.why_choose_us.economy.description') }}</p>
            </div>
          </div>
          <div
              class="flex items-start gap-5"
              data-aos="fade-up">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">{{ t('about_page.why_choose_us.price.title') }}</h3>
              <p class="text-xs text-[#7B7B7B]">{{ t('about_page.why_choose_us.price.description') }}</p>
            </div>
          </div>
          <div
              class="flex items-start gap-5"
              data-aos="fade-up">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">{{ t('about_page.why_choose_us.service.title') }}</h3>
              <p class="text-xs text-[#7B7B7B]">{{ t('about_page.why_choose_us.service.description') }}</p>
            </div>
          </div>
          <div
              class="flex items-start gap-5"
              data-aos="fade-up">
            <div class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white">
              <ShieldCheckIcon class="w-6 h-6"/>
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">{{ t('about_page.why_choose_us.assortment.title') }}</h3>
              <p class="text-xs text-[#7B7B7B]">{{ t('about_page.why_choose_us.assortment.description') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div
          class="mt-32 overflow-hidden sm:mt-40"
          data-aos="fade-up">
        <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div
              class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8"
          >
            <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 font-montserrat">
                {{ t('about_page.for_whom.title') }}
              </h2>
              <p class="mt-6 text-xl leading-8 text-gray-600">
                {{ t('about_page.for_whom.description') }}
              </p>
            </div>
            <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img
                    alt=""
                    class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    data-aos="fade-up"
                    src="@/assets/img/about/about-1.png"
                />
              </div>
              <div
                  class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8"
              >
                <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <img
                      alt=""
                      class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      data-aos="fade-up"
                      src="@/assets/img/about/about-2.png"
                  />
                </div>
                <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img
                      alt=""
                      class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      data-aos="fade-up"
                      src="@/assets/img/about/about-3.png"
                  />
                </div>
                <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img
                      alt=""
                      class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                      data-aos="fade-up"
                      src="@/assets/img/about/about-4.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div
          class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto flex w-full flex-col items-end justify-between gap-5 lg:mx-0 lg:max-w-none lg:flex-row">
          <div class="w-full lg:flex-auto">
            <h2
                class="text-3xl font-montserrat font-bold tracking-tight text-gray-900"
                data-aos="fade-up">
              <span class="text-mainColor">{{ t('about_page.remalux_section.title') }}</span>
            </h2>
            <img
                alt=""
                class="mt-16 mb-5 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
                data-aos="fade-up"
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
            />
            <p
                class="text-[#7B7B7B] leading-8"
                data-aos="fade-up">
              {{ t('about_page.remalux_section.description') }}
            </p>
          </div>
          <div class="w-full lg:flex-auto">
            <ul class="flex flex-col gap-5">
              <li
                  class="gap-3 border-b border-[#F0DFDF] pb-7"
                  data-aos="fade-up">
                <p class="text-mainColor font-montserrat font-extrabold mb-3">
                  {{ t('about_page.remalux_section.innovation.title') }}</p>
                <p>{{ t('about_page.remalux_section.innovation.description') }}</p>
              </li>
              <li
                  class="gap-3 border-b border-[#F0DFDF] pb-7"
                  data-aos="fade-up">
                <p class="text-mainColor font-montserrat font-extrabold mb-3">
                  {{ t('about_page.remalux_section.service.title') }}</p>
                <p>{{ t('about_page.remalux_section.service.description') }}</p>
              </li>
              <li
                  class="gap-3 border-b border-[#F0DFDF] pb-7"
                  data-aos="fade-up">
                <p class="text-mainColor font-montserrat font-extrabold mb-3">
                  {{ t('about_page.remalux_section.assortment.title') }}</p>
                <p>{{ t('about_page.remalux_section.assortment.description') }}</p>
              </li>
              <li
                  class="gap-3 border-b border-[#F0DFDF] pb-7"
                  data-aos="fade-up">
                <p class="text-mainColor font-montserrat font-extrabold mb-3">
                  {{ t('about_page.remalux_section.safety.title') }}</p>
                <p>{{ t('about_page.remalux_section.safety.description') }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
          class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8"
          data-aos="fade-up">
        <div class="bg-[#F0DFDF] p-4 md:p-8 rounded-xl border-4 border-[#AD272426]">
          <div class="flex items-center flex-col md:flex-row">
            <div class="w-full md:w-1/3">
              <h2 class="text-xl md:text-3xl font-bold mb-5">
                <span class="text-mainColor">{{ t('about_page.our_fleet.title') }}</span>
              </h2>
              <p class="text-sm md:text-xl font-medium leading-5 md:leading-8">
                {{ t('about_page.our_fleet.description') }}
              </p>
            </div>
            <div class="w-full md:w-2/3">
              <img alt="" class="w-full" src="@/assets/img/about/auto.png"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
