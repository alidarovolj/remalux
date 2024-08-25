<script setup>
import {
  ArchiveBoxIcon,
  ArrowLeftEndOnRectangleIcon,
  ChevronRightIcon,
  GlobeAmericasIcon,
  HeartIcon,
  UserIcon,
  UsersIcon
} from "@heroicons/vue/24/outline"
import {useAuthStore} from "~/stores/auth.js";
import {useNotificationStore} from "~/stores/notifications.js";

const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const {t} = useI18n()
const loading = ref(false)
const auth = useAuthStore()
auth.initCookieToken()
const user = useUserStore()
const notifications = useNotificationStore()

const links = computed(() => [
  {title: t('breadcrumbs.profile'), icon: UserIcon, link: localePath('/profile')},
  {title: t('breadcrumbs.orders'), icon: ArchiveBoxIcon, link: localePath('/profile')},
  {title: t('breadcrumbs.addresses'), icon: GlobeAmericasIcon, link: localePath('/profile/addresses')},
  {title: t('breadcrumbs.recipients'), icon: UsersIcon, link: localePath('/profile/recipients')},
  {title: t('breadcrumbs.favourites'), icon: HeartIcon, link: localePath('/profile')},
]);

const logoutUser = async () => {
  loading.value = true;

  try {
    const response = await api(`/api/auth/logout`, "POST", {}, route.query);
    auth.token = null;
    await nextTick();
    user.userProfile = false;
    notifications.showNotification("success", "Успешно", "Вы успешно вышли из аккаунта");
    loading.value = false;
    await router.push(localePath('/'));
    await user.getProfile()
  } catch (e) {
    notifications.showNotification("error", "Произошла ошибка", e);
  }
  loading.value = false;
}
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 pt-8 pb-32">
    <div class="flex items-start w-full gap-5">
      <div class="hidden md:block w-1/5">
        <div class="bg-white set_shadow flex flex-col px-6 py-2 rounded-lg">
          <NuxtLink
              v-for="(link, index) in links"
              :key="index"
              :class="[
                  { '!border-0' : index === links.length - 1 },
                  { 'text-mainColor' : link.link === route.fullPath }
               ]"
              :to="localePath(link.link)"
              class="flex w-full items-center justify-between py-4 cursor-pointer transition-all hover:text-mainColor border-b border-[#F0DFDF]">
            <div class="flex gap-3">
              <component :is="link.icon" class="w-6 h-6"/>
              <p>{{ link.title }}</p>
            </div>
            <ChevronRightIcon class="w-6 h-6"/>
          </NuxtLink>
        </div>
        <div
            class="bg-white text-red-500 rounded-lg mt-4 set_shadow px-6 py-4 flex w-full items-center justify-between cursor-pointer transition-all"
            @click="logoutUser">
          <div class="flex gap-3">
            <ArrowLeftEndOnRectangleIcon class="w-6 h-6"/>
            <p>{{ $t('profile.logout') }}</p>
          </div>
          <ChevronRightIcon class="w-6 h-6"/>
        </div>
      </div>
      <div class="w-full md:w-4/5 h-full">
        <slot/>
      </div>
    </div>
  </div>
</template>