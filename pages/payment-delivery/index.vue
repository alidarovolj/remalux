<script setup lang="ts">
import Breadcrumbs from "~/components/general/breadcrumbs.vue";

const {t} = useI18n();
const localePath = useLocalePath()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.payment_delivery'), link: localePath('/payment-delivery')},
]);

useHead({
  title: t("headers.payment_delivery.title"),
  meta: [
    {
      property: "description",
      content: t("headers.payment_delivery.description"),
    },
    {
      property: "og:description",
      content: t("headers.payment_delivery.description"),
    },
    {
      property: "og:title",
      content: t("headers.payment_delivery.title"),
    },
    {
      property: "og:url",
      content: t("headers.payment_delivery.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.payment_delivery.canonical")}],
});
</script>

<template>
  <Breadcrumbs :links="links"/>
  <div class="container mx-auto px-4 md:px-0">
    <div class="py-10">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold mb-4">{{ t('payment_delivery.title') }}</h1>
        <h2 class="text-xl font-semibold">{{ t('payment_delivery.delivery_methods') }}</h2>
      </div>
      <p class="mb-6">
        {{ t('payment_delivery.pickup') }}
      </p>

      <p class="text-xl font-semibold mb-3 text-center">
        {{ t('payment_delivery.payment_methods') }}
      </p>
      <p class="font-semibold mb-4 text-lg">{{ t('payment_delivery.cash_payment') }}</p>

      <ul class="list-disc ml-6 space-y-4 mb-4">
        <li>{{ t('payment_delivery.cash_payment_details[0]') }}</li>
        <li>{{ t('payment_delivery.cash_payment_details[1]') }}</li>
        <li>{{ t('payment_delivery.cash_payment_details[2]') }}</li>
      </ul>

      <p class="font-semibold mb-4 text-lg">{{ t('payment_delivery.card_payment_on_receipt') }}</p>

      <ul class="list-disc ml-6 space-y-4 mb-4">
        <li>{{ t('payment_delivery.card_payment_on_receipt_details[0]') }}</li>
      </ul>

      <p class="font-semibold mb-4 text-lg">
        {{ t('payment_delivery.card_payment_online') }}
      </p>

      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('payment_delivery.card_payment_online_details[0]') }}</li>
        <li>{{ t('payment_delivery.card_payment_online_details[1]') }}</li>
        <li>{{ t('payment_delivery.card_payment_online_details[2]') }}</li>
      </ul>
    </div>
  </div>
</template>