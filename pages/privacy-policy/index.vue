<script setup lang="ts">
import Breadcrumbs from "~/components/general/breadcrumbs.vue";

const { t } = useI18n();
const localePath = useLocalePath()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.privacy'), link: localePath('/privacy-policy')},
]);

useHead({
  title: t("headers.privacy.title"),
  meta: [
    {
      property: "description",
      content: t("headers.privacy.description"),
    },
    {
      property: "og:description",
      content: t("headers.privacy.description"),
    },
    {
      property: "og:title",
      content: t("headers.privacy.title"),
    },
    {
      property: "og:url",
      content: t("headers.privacy.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.privacy.canonical")}],
});
</script>

<template>
  <Breadcrumbs :links="links" />
  <div class="container mx-auto px-4 md:px-0">
    <div class="py-10">
      <h1 class="text-2xl font-bold mb-4">{{ t('privacy_policy.title') }}</h1>
      <p class="mb-6">
        {{ t('privacy_policy.intro') }}
        <a href="https://remalux.kz" class="text-blue-500">https://remalux.kz</a>
        {{ t('privacy_policy.intro_continued') }}
      </p>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.terms.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.terms.admin') }}</li>
        <li>{{ t('privacy_policy.terms.personal_data') }}</li>
        <li>{{ t('privacy_policy.terms.data_processing') }}</li>
        <li>{{ t('privacy_policy.terms.confidentiality') }}</li>
        <li>{{ t('privacy_policy.terms.site') }}</li>
        <li>{{ t('privacy_policy.terms.user') }}</li>
        <li>{{ t('privacy_policy.terms.cookies') }}</li>
        <li>{{ t('privacy_policy.terms.ip_address') }}</li>
        <li>{{ t('privacy_policy.terms.product') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.general.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.general.usage') }}</li>
        <li>{{ t('privacy_policy.general.disagreement') }}</li>
        <li>{{ t('privacy_policy.general.application') }}</li>
        <li>{{ t('privacy_policy.general.verification') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.subject.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.subject.obligations') }}</li>
        <li>{{ t('privacy_policy.subject.data') }}</li>
        <li>{{ t('privacy_policy.subject.ssl') }}</li>
        <li>{{ t('privacy_policy.subject.cookies') }}</li>
        <li>{{ t('privacy_policy.subject.other_info') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.purposes.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.purposes.identification') }}</li>
        <li>{{ t('privacy_policy.purposes.access') }}</li>
        <li>{{ t('privacy_policy.purposes.feedback') }}</li>
        <li>{{ t('privacy_policy.purposes.location') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.processing.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.processing.methods') }}</li>
        <li>{{ t('privacy_policy.processing.third_parties') }}</li>
        <li>{{ t('privacy_policy.processing.government') }}</li>
        <li>{{ t('privacy_policy.processing.loss') }}</li>
        <li>{{ t('privacy_policy.processing.measures') }}</li>
        <li>{{ t('privacy_policy.processing.cooperation') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.rights.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.rights.decision') }}</li>
        <li>{{ t('privacy_policy.rights.information') }}</li>
        <li>{{ t('privacy_policy.rights.use') }}</li>
        <li>{{ t('privacy_policy.rights.confidentiality') }}</li>
        <li>{{ t('privacy_policy.rights.blocking') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.responsibilities.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.responsibilities.loss') }}</li>
        <li>{{ t('privacy_policy.responsibilities.disclosure') }}</li>
        <li>{{ t('privacy_policy.responsibilities.law') }}</li>
        <li>{{ t('privacy_policy.responsibilities.deletion') }}</li>
        <li>{{ t('privacy_policy.responsibilities.usage') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.disputes.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.disputes.pre_court') }}</li>
        <li>{{ t('privacy_policy.disputes.notification') }}</li>
        <li>{{ t('privacy_policy.disputes.arbitration') }}</li>
        <li>{{ t('privacy_policy.disputes.law') }}</li>
      </ul>

      <h2 class="text-xl font-semibold mt-8 mb-4">{{ t('privacy_policy.additional.title') }}</h2>
      <ul class="list-disc ml-6 space-y-4">
        <li>{{ t('privacy_policy.additional.changes') }}</li>
        <li>{{ t('privacy_policy.additional.effective_date') }}</li>
      </ul>
    </div>
  </div>
</template>