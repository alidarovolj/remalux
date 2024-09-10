<script setup lang="ts">
import Breadcrumbs from "~/components/general/breadcrumbs.vue";

const { t } = useI18n();
const localePath = useLocalePath()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.public_offer'), link: localePath('/public-offer')},
]);

useHead({
  title: t("headers.public_offer.title"),
  meta: [
    {
      property: "description",
      content: t("headers.public_offer.description"),
    },
    {
      property: "og:description",
      content: t("headers.public_offer.description"),
    },
    {
      property: "og:title",
      content: t("headers.public_offer.title"),
    },
    {
      property: "og:url",
      content: t("headers.public_offer.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.public_offer.canonical")}],
});
</script>

<template>
  <Breadcrumbs :links="links" />
  <template>
    <div class="container mx-auto py-6 px-4">
      <h1 class="text-3xl font-bold mb-6 text-center">{{ t('public_offer.title') }}</h1>
      <p class="mb-6 text-lg text-center">{{ t('public_offer.subtitle') }}</p>
      <p class="mb-4">
        {{ t('public_offer.intro') }}
        <a href="https://remalux.kz" class="text-blue-600 hover:text-blue-800">https://remalux.kz</a>.
      </p>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.terms.title') }}</h2>
      <ul class="list-disc ml-6 mb-6">
        <li>
          <strong>{{ t('public_offer.terms.buyer') }}</strong>
          <a href="https://remalux.kz" class="text-blue-600 hover:text-blue-800">www.remalux.kz</a>
        </li>
        <li><strong>{{ t('public_offer.terms.seller') }}</strong></li>
        <li><strong>{{ t('public_offer.terms.store') }}</strong></li>
        <li><strong>{{ t('public_offer.terms.site') }}</strong></li>
        <li><strong>{{ t('public_offer.terms.product') }}</strong></li>
        <li><strong>{{ t('public_offer.terms.order') }}</strong></li>
        <li><strong>{{ t('public_offer.terms.account') }}</strong></li>
        <li><strong>{{ t('public_offer.terms.delivery_service') }}</strong></li>
      </ul>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.general_provisions.title') }}</h2>
      <ol class="list-decimal ml-6 mb-6">
        <li>{{ t('public_offer.general_provisions.item1') }}</li>
        <li>{{ t('public_offer.general_provisions.item2') }}</li>
        <li>{{ t('public_offer.general_provisions.item3') }}</li>
        <li>{{ t('public_offer.general_provisions.item4') }}</li>
        <li>{{ t('public_offer.general_provisions.item5') }}</li>
      </ol>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.registration.title') }}</h2>
      <ol class="list-decimal ml-6 mb-6">
        <li>{{ t('public_offer.registration.item1') }}</li>
        <li>{{ t('public_offer.registration.item2') }}</li>
        <li>{{ t('public_offer.registration.item3') }}</li>
      </ol>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.order_placement.title') }}</h2>
      <ol class="list-decimal ml-6 mb-6">
        <li>{{ t('public_offer.order_placement.item1') }}</li>
        <li>{{ t('public_offer.order_placement.item2') }}</li>
        <li>{{ t('public_offer.order_placement.item3') }}</li>
        <li>{{ t('public_offer.order_placement.item4') }}</li>
        <li>{{ t('public_offer.order_placement.item5') }}</li>
      </ol>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.delivery.title') }}</h2>
      <ol class="list-decimal ml-6 mb-6">
        <li>{{ t('public_offer.delivery.item1') }}</li>
        <li>{{ t('public_offer.delivery.item2') }}</li>
        <li>{{ t('public_offer.delivery.item3') }}</li>
        <li>{{ t('public_offer.delivery.item4') }}</li>
        <li>{{ t('public_offer.delivery.item5') }}</li>
      </ol>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.price_payment.title') }}</h2>
      <ol class="list-decimal ml-6 mb-6">
        <li>{{ t('public_offer.price_payment.item1') }}</li>
        <li>{{ t('public_offer.price_payment.item2') }}</li>
        <li>{{ t('public_offer.price_payment.item3') }}</li>
        <li>{{ t('public_offer.price_payment.item4') }}</li>
      </ol>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.returns.title') }}</h2>
      <ol class="list-decimal ml-6 mb-6">
        <li>{{ t('public_offer.returns.item1') }}</li>
        <li>{{ t('public_offer.returns.item2') }}</li>
        <li>{{ t('public_offer.returns.item3') }}</li>
      </ol>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.copyright.title') }}</h2>
      <p class="mb-6">{{ t('public_offer.copyright.content') }}</p>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.warranty.title') }}</h2>
      <p class="mb-6">{{ t('public_offer.warranty.content') }}</p>

      <h2 class="text-xl font-semibold mb-4">{{ t('public_offer.confidentiality.title') }}</h2>
      <p class="mb-6">{{ t('public_offer.confidentiality.content') }}</p>

      <p class="mt-8 text-center">
        {{ t('public_offer.footer.content') }}
        <a href="https://www.remalux.kz" class="text-blue-600 hover:text-blue-800">remalux.kz</a>.
      </p>
    </div>
  </template>
</template>

<style scoped>
/* Add custom styles if necessary */
</style>
