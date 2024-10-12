<script setup>
import ChooseType from "~/components/mainPage/chooseType.vue";
import Ideas from "~/components/mainPage/ideas.vue";
import PopularProducts from "~/components/mainPage/popularProducts.vue";
import DownloadRemalux from "~/components/mainPage/downloadRemalux.vue";
import News from "~/components/mainPage/news.vue";
import BecomePartner from "~/components/mainPage/becomePartner.vue";
import HeroNew from "~/components/mainPage/heroNew.vue";
import AboutBlock from "~/components/mainPage/aboutBlock.vue";

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
  <div class="flex flex-col gap-20 md:gap-36 pb-16">
    <HeroNew/>
    <ChooseType/>
    <Ideas/>
    <PopularProducts/>
    <DownloadRemalux/>
    <News/>
    <BecomePartner/>
    <AboutBlock/>
  </div>
</template>
