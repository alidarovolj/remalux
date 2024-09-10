<script setup>
import Notifications from "~/components/general/notifications.vue";
import ModalDialog from "~/components/general/modalDialog.vue";
import 'aos/dist/aos.css';
import {useProductsStore} from "~/stores/products.js";
import {PhoneIcon} from "@heroicons/vue/24/outline"

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
    <a href="https://wa.me/77472367503" class="btn-whatsapp-pulse btn-whatsapp-pulse-border">
      <PhoneIcon class="w-10 h-10 min-h-10 min-w-10" />
    </a>
  </div>
</template>

<style>
.btn-whatsapp-pulse {
  background: #25d366;
  color: white;
  position: fixed;
  bottom: 20px;
  left: 20px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0;
  height: 0;
  padding: 35px;
  text-decoration: none;
  border-radius: 50%;
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
  }
  80% {
    box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
  }
}

.btn-whatsapp-pulse-border {
  bottom: 20px;
  right: 20px;
  animation-play-state: paused;
}

.btn-whatsapp-pulse-border::before {
  content: "";
  position: absolute;
  border-radius: 50%;
  padding: 25px;
  border: 5px solid #25d366;
  opacity: 0.75;
  animation-name: pulse-border;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}

@keyframes pulse-border {
  0% {
    padding: 25px;
    opacity: 0.75;
  }
  75% {
    padding: 50px;
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

</style>