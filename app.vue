<script setup>
import Notifications from "~/components/general/notifications.vue";
import ModalDialog from "~/components/general/modalDialog.vue";
import 'aos/dist/aos.css';
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage/>
    </NuxtLayout>
    <Notifications/>
    <ModalDialog/>
  </div>
</template>
