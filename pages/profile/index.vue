<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useUserStore} from "~/stores/user.js";

const {t} = useI18n()
const localePath = useLocalePath()
const user = useUserStore()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.profile'), link: localePath('/profile')}
]);
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <NuxtLayout name="profile">
      <div class="bg-white p-6 rounded-2xl set_shadow">
        <div class="flex items-center gap-8 border-b border-[#F0DFDF] pb-3 mb-4">
          <img
              alt=""
              class="w-[100px] h-[100px] rounded-full object-cover"
              src="@/assets/img/bg-app.jpg">
          <p
              v-if="user.userProfile"
              class="text-3xl font-semibold">
            {{ user.userProfile.name }}
          </p>
          <div v-else class="skeleton h-5 w-1/2"></div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center">
            <p class="w-1/2 md:w-1/6 text-lg text-[#7B7B7B]">{{ $t('profile.phone') }}:</p>
            <p v-if="user.userProfile">{{ user.userProfile.phone_number }}</p>
            <div v-else class="skeleton h-5 w-1/3"></div>
          </div>
          <div class="flex items-center">
            <p class="w-1/2 md:w-1/6 text-lg text-[#7B7B7B]">Email:</p>
            <p v-if="user.userProfile">{{ user.userProfile.email }}</p>
            <div v-else class="skeleton h-5 w-1/3"></div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>