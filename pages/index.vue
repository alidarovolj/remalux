<script setup>
import Hero from "~/components/mainPage/hero.vue";
import ChooseType from "~/components/mainPage/chooseType.vue";
import Ideas from "~/components/mainPage/ideas.vue";
import PopularProducts from "~/components/mainPage/popularProducts.vue";
import DownloadRemalux from "~/components/mainPage/downloadRemalux.vue";
import News from "~/components/mainPage/news.vue";
import AboutBlock from "~/components/mainPage/aboutBlock.vue";
import BecomePartner from "~/components/mainPage/becomePartner.vue";
</script>

<template>
  <div>
    <Hero/>
    <ChooseType/>
    <Ideas/>
    <BecomePartner />
    <PopularProducts />
    <DownloadRemalux />
    <News />
    <AboutBlock />
  </div>
</template>
