<script setup>
import ChooseType from "~/components/mainPage/chooseType.vue";
import Ideas from "~/components/mainPage/ideas.vue";
import PopularProducts from "~/components/mainPage/popularProducts.vue";
import DownloadRemalux from "~/components/mainPage/downloadRemalux.vue";
import News from "~/components/mainPage/news.vue";
import BecomePartner from "~/components/mainPage/becomePartner.vue";
import HeroNew from "~/components/mainPage/heroNew.vue";

const {t} = useI18n();

useHead({
  title: t("headers.mainPage.title"),
  meta: [
    {
      property: "description",
      content: t("headers.mainPage.description"),
    },
    {
      property: "og:description",
      content: t("headers.mainPage.description"),
    },
    {
      property: "og:title",
      content: t("headers.mainPage.title"),
    },
    {
      property: "og:url",
      content: t("headers.mainPage.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.mainPage.canonical")}],
});
</script>

<template>
  <div class="flex flex-col gap-36">
    <HeroNew/>
    <ChooseType/>
    <News/>
    <PopularProducts/>
    <DownloadRemalux/>
    <Ideas/>
    <!--    <AboutBlock/>-->
    <BecomePartner/>
  </div>
</template>
