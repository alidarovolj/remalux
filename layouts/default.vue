<script setup lang="ts">
import Header from "~/components/layout/header.vue";
import Footer from "~/components/layout/footer.vue";

const user = useUserStore()

onMounted(async () => {
  await nextTick()
  await user.getProfile()
})
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
