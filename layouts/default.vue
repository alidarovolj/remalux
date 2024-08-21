<script setup lang="ts">
import Header from "~/components/layout/header.vue";
import Footer from "~/components/layout/footer.vue";

const user = useUserStore()
const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)

onMounted(async () => {
  await nextTick()
  if (token.value) {
    await user.getProfile()
  } else {
    user.userProfile = false
  }
})
</script>

<template>
  <div>
    <Header/>
    <div class="pt-[85px]">
      <NuxtPage/>
    </div>
    <Footer/>
  </div>
</template>
