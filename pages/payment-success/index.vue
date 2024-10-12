<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";

const localePath = useLocalePath();
const { t } = useI18n();

const links = computed(() => [
  { title: t("breadcrumbs.home"), link: localePath("/") },
  {
    title: t("breadcrumbs.payment_success"),
    link: localePath("/payment-success"),
  },
]);
</script>

<template>
  <div>
    <Breadcrumbs :links="links" />
    <div class="container mx-auto px-4 md:px-0">
      <div class="py-10 md:py-44">
        <div
          class="text-center w-full md:w-max mx-auto border-none md:border-2 border-[#E4E4E4] shadow-none md:shadow-md p-0 md:p-6 rounded-lg"
        >
          <img
            alt=""
            class="mx-auto mb-4"
            src="@/assets/img/payment/success.png"
          />
          <h1 class="text-lg md:text-2xl font-semibold text-gray-900">
            {{ $t("payment_success.title") }}
          </h1>
          <p class="text-sm md:text-base my-4 text-gray-700">
            {{ $t("payment_success.text") }}
          </p>
          <NuxtLink
            :to="localePath('/')"
            class="text-sm md:text-base block w-full border px-6 py-3 rounded-lg bg-mainColor text-white"
          >
            {{ $t("payment_success.button") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
