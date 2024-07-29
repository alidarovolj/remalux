<script setup>
import Notifications from "~/components/general/notifications.vue";
import ModalDialog from "~/components/general/modalDialog.vue";
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
    <Notifications />
    <ModalDialog />
  </div>
</template>
