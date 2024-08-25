<script setup>
import {Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, ChevronDownIcon, ShoppingBagIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import {useUserStore} from "~/stores/user.js";
import LocaleSwitcher from "~/components/general/localeSwitcher.vue";
import {useNotificationStore} from "~/stores/notifications.js";
import {useAuthStore} from "~/stores/auth.js";

const loading = ref(false)
const {t} = useI18n()
const localePath = useLocalePath()
const user = useUserStore()
const notifications = useNotificationStore()
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
auth.initCookieToken()
const {token} = storeToRefs(auth)
const cart = useCartStore()

const navigation = computed(() => [
  {name: t('header_links.store'), href: localePath('/store')},
  {name: t('header_links.choose_color'), href: localePath('/colors')},
  {name: t('header_links.ideas'), href: localePath('/ideas')},
  {name: t('header_links.about_us'), href: localePath('/about')},
  {name: t('header_links.news'), href: localePath('/news')},
  {name: t('header_links.contacts'), href: localePath('/contacts')},
])

const logoutUser = async () => {
  loading.value = true;

  try {
    const response = await api(`/api/auth/logout`, "POST", {}, route.query);

    auth.token = null;
    await nextTick();
    user.userProfile = false;
    notifications.showNotification("success", "Успешно", "Вы успешно вышли из аккаунта");
    loading.value = false;
    if (token.value) {
      await user.getProfile()
    }
    await router.push(localePath('/'));
  } catch (e) {
    console.log(e)
    if (e.response) {
      notifications.showNotification("error", "Произошла ошибка", e);
    }
  }
  loading.value = false;
}

const mobileMenuOpen = ref(false)

const navRef = ref(null);

const handleScroll = () => {
  if (window.scrollY > 0) {
    navRef.value.classList.add('!py-2');
  } else {
    navRef.value.classList.remove('!py-2');
  }
};

onMounted(async () => {
  await nextTick()
  if (token.value) {
    await cart.getCart()
  }
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
      class="bg-white fixed top-0 z-[10000] w-full"
      style="box-shadow: 0px 0px 10px 0px #00000026;">
    <div class="container mx-auto px-4 md:px-0">
      <nav
          ref="navRef"
          aria-label="Global"
          class="flex justify-between py-5 transition-all">
        <div class="flex gap-6 items-center">
          <NuxtLink
              :to="localePath('/')"
              class="-m-1.5 p-1.5">
            <img
                alt=""
                class="h-10 w-auto"
                src="~/assets/img/logos/mainLogo.svg"
            />
          </NuxtLink>
        </div>
        <div class="flex lg:hidden">
          <button
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              type="button"
              @click="mobileMenuOpen = true">
            <Bars3Icon aria-hidden="true" class="h-6 w-6"/>
          </button>
        </div>
        <div class="hidden lg:flex items-center lg:gap-x-5 uppercase navigation">
          <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="localePath(item.href)"
              class="text-xs font-semibold leading-6 text-gray-900"
              @click="mobileMenuOpen = false">
            {{ item.name }}
          </NuxtLink>
        </div>
        <div class="hidden lg:flex gap-3 !w-max">
          <div
              v-if="user.userProfile === false"
              class="flex items-center gap-4 text-sm !w-max">
            <NuxtLink
                :to="localePath('/login')"
                class="block rounded-lg text-mainColor text-sm font-semibold">
              {{ $t('header_links.login') }}
            </NuxtLink>
            <NuxtLink
                :to="localePath('/registration')"
                class="text-white bg-mainColor rounded-lg px-4 h-full flex items-center font-semibold">
              {{ $t('header_links.register') }}
            </NuxtLink>
          </div>
          <div
              v-else-if="user.userProfile"
              class="flex items-center gap-3 !w-max">
            <div v-if="cart.cartList">
              <NuxtLink
                  :to="localePath('/cart')"
                  class="relative">
                <div
                    v-if="cart.cartList.data.length > 0"
                    class="bg-mainColor text-white w-5 h-5 absolute right-0 top-0 translate-x-1/2 -translate-y-2/3 flex items-center justify-center rounded-full text-xs">
                  {{ cart.cartList.data.length }}
                </div>
                <ShoppingBagIcon class="w-5 h-5 cursor-pointer text-mainColor"/>
              </NuxtLink>
            </div>
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                    class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {{ user.userProfile.name }}
                  <ChevronDownIcon aria-hidden="true" class="-mr-1 h-5 w-5 text-gray-400"/>
                </MenuButton>
              </div>

              <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <NuxtLink
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                          :to="localePath('/profile')">
                        {{ $t('profile.profile') }}
                      </NuxtLink>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <div
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']"
                          class="text-red-500"
                          @click="logoutUser">
                        {{ $t('profile.logout') }}
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div v-else class="spinner"></div>
          <LocaleSwitcher/>
        </div>
      </nav>
      <Dialog
          :open="mobileMenuOpen"
          class="lg:hidden"
          @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-10"/>
        <DialogPanel
            class="fixed inset-y-0 right-0 z-[50000] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <NuxtLink
                :to="localePath('/')"
                class="-m-1.5 p-1.5">
              <img
                  alt=""
                  class="h-10 w-auto"
                  src="~/assets/img/logos/mainLogo.svg"
              />
            </NuxtLink>
            <button
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
                type="button"
                @click="mobileMenuOpen = false">
              <XMarkIcon
                  aria-hidden="true"
                  class="h-6 w-6"
              />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <NuxtLink
                    v-for="item in navigation"
                    :key="item.name"
                    :class="{ 'text-mainColor': $route.path === item.href }"
                    :to="localePath(item.href)"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    @click="mobileMenuOpen = false">
                  {{ item.name }}
                </NuxtLink>
              </div>
              <div class="flex justify-between py-6 gap-3">
                <div
                    v-if="user.userProfile === false"
                    class="flex items-center gap-3">
                  <NuxtLink
                      :to="localePath('/login')"
                      class="block rounded-lg px-3 py-2.5 text-mainColor text-sm font-semibold leading-7"
                      @click="mobileMenuOpen = false">
                    {{ $t('header_links.login') }}
                  </NuxtLink>
                  <NuxtLink
                      :to="localePath('/registration')"
                      class="block text-white bg-mainColor rounded-lg px-3 py-2.5 text-base font-semibold leading-7"
                      @click="mobileMenuOpen = false">
                    {{ $t('header_links.register') }}
                  </NuxtLink>
                </div>
                <div
                    v-else-if="user.userProfile"
                    class="flex items-center gap-3">
                  <div v-if="cart.cartList">
                    <NuxtLink
                        :to="localePath('/cart')"
                        class="relative"
                        @click="mobileMenuOpen = false">
                      <div
                          v-if="cart.cartList.data.length > 0"
                          class="bg-mainColor text-white w-5 h-5 absolute right-0 top-0 translate-x-1/2 -translate-y-2/3 flex items-center justify-center rounded-full text-xs">
                        {{ cart.cartList.data.length }}
                      </div>
                      <ShoppingBagIcon class="w-5 h-5 cursor-pointer text-mainColor"/>
                    </NuxtLink>
                  </div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                          class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {{ user.userProfile.name }}
                        <ChevronDownIcon aria-hidden="true" class="-mr-1 h-5 w-5 text-gray-400"/>
                      </MenuButton>
                    </div>

                    <transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                      <MenuItems
                          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                            <NuxtLink
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                :to="localePath('/profile')">
                              {{ $t('profile.profile') }}
                            </NuxtLink>
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                            <div
                                :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']"
                                class="text-red-500"
                                @click="logoutUser">
                              {{ $t('profile.logout') }}
                            </div>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
                <div v-else class="spinner"></div>
                <LocaleSwitcher/>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  </header>
</template>
