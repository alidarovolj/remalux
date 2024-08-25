<script setup>
import ChooseType from "~/components/mainPage/chooseType.vue";
import Ideas from "~/components/mainPage/ideas.vue";
import PopularProducts from "~/components/mainPage/popularProducts.vue";
import DownloadRemalux from "~/components/mainPage/downloadRemalux.vue";
import News from "~/components/mainPage/news.vue";
import BecomePartner from "~/components/mainPage/becomePartner.vue";
// import AboutBlock from "~/components/mainPage/aboutBlock.vue";
import HeroNew from "~/components/mainPage/heroNew.vue";
</script>

<template>
  <div class="flex flex-col gap-36">
    <HeroNew/>
    <ChooseType/>
    <News/>
    <PopularProducts/>
    <DownloadRemalux class="hidden md:block" />
    <Ideas/>
<!--    <AboutBlock/>-->
    <BecomePartner/>
  </div>
</template>
