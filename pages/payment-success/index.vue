<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";

const localePath = useLocalePath();
const {t} = useI18n()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.payment_success'), link: localePath('/payment-success')},
]);
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <div class="container mx-auto px-4 md:px-0">
      <div class="py-44">
        <div class="text-center w-full md:w-max mx-auto border-2 border-[#E4E4E4] shadow-md p-6 rounded-lg">
          <img
              class="mx-auto mb-4"
              src="@/assets/img/payment/success.png"
              alt="">
          <h1 class="text-2xl font-semibold text-gray-900">
            {{ $t('payment_success.title') }}
          </h1>
          <p class="my-4 text-gray-700">
            {{ $t('payment_success.text') }}
          </p>
          <NuxtLink
              :to="localePath('/')"
              class="block w-full border px-6 py-3 rounded-lg bg-mainColor text-white"
          >
            {{ $t('payment_success.button') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>