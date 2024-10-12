<script lang="ts" setup>
import Header from "~/components/layout/header.vue";
import Footer from "~/components/layout/footer.vue";

const user = useUserStore();
const auth = useAuthStore();
auth.initCookieToken();
const { token } = storeToRefs(auth);

onMounted(async () => {
  await nextTick();
  if (token.value) {
    await user.getProfile();
  } else {
    user.userProfile = false;
  }
});
</script>

<template>
  <div>
    <Header />
    <div class="pt-[75px] md:pt-[80px]">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>
