<script setup>
import Notifications from "~/components/general/notifications.vue";
import ModalDialog from "~/components/general/modalDialog.vue";
import 'aos/dist/aos.css';
import {useProductsStore} from "~/stores/products.js";

const products = useProductsStore()

onMounted(async () => {
  await nextTick()
  await products.removeVariant()
})
</script>

<template>
  <div>
    <ModalDialog/>
    <NuxtLayout name="default">
      <NuxtPage/>
    </NuxtLayout>
    <Notifications/>
  </div>
</template>
