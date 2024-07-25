<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel} from '@headlessui/vue'
import {Bars3Icon, BellIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon} from '@heroicons/vue/24/outline'
import LocaleSwitcher from "~/components/general/localeSwitcher.vue";

const {t} = useI18n()
const localePath = useLocalePath()

const navigation = computed(() => [
  {name: t('header_links.store'), href: '/store'},
  {name: t('header_links.choose_color'), href: '/'},
  {name: t('header_links.ideas'), href: '/'},
  {name: t('header_links.calculator'), href: '/'},
  {name: t('header_links.about_us'), href: '/'},
  {name: t('header_links.news'), href: '/'},
  {name: t('header_links.contacts'), href: '/'},
])

const mobileMenuOpen = ref(false)
</script>

<template>
  <header class="bg-white container mx-auto">
    <nav
        class="flex items-center justify-between py-6 lg:px-0"
        aria-label="Global">
      <div class="flex lg:flex-1">
        <NuxtLink
            :to="localePath('/')"
            class="-m-1.5 p-1.5">
          <img
              class="h-8 w-auto"
              src="~/assets/img/logos/mainLogo.svg"
              alt=""
          />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true">
          <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-6 uppercase">
        <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="localePath(item.href)"
            :class="{ 'text-mainColor': $route.path === item.href }"
            class="text-sm font-semibold leading-6 text-gray-900">
          {{ item.name }}
        </NuxtLink>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
        <NuxtLink
            :to="localePath('/')"
            class="text-sm font-semibold leading-6 text-mainColor">
          <MagnifyingGlassIcon class="w-5 h-5"/>
        </NuxtLink>
        <NuxtLink
            :to="localePath('/')"
            class="text-sm font-semibold leading-6 text-mainColor">
          <ShoppingBagIcon class="w-5 h-5"/>
        </NuxtLink>
        <NuxtLink
            :to="localePath('/')"
            class="text-sm font-semibold leading-6 text-mainColor">
          <BellIcon class="w-5 h-5"/>
        </NuxtLink>
        <NuxtLink
            :to="localePath('/registration')"
            class="text-sm font-semibold leading-6 text-mainColor">
          <UserIcon class="w-5 h-5"/>
        </NuxtLink>
        <LocaleSwitcher/>
      </div>
    </nav>
    <Dialog
        class="lg:hidden"
        @close="mobileMenuOpen = false"
        :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10"/>
      <DialogPanel
          class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <NuxtLink
              :to="localePath('/')"
              class="-m-1.5 p-1.5">
            <img
                class="h-8 w-auto"
                src="~/assets/img/logos/mainLogo.svg"
                alt=""
            />
          </NuxtLink>
          <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false">
            <XMarkIcon
                class="h-6 w-6"
                aria-hidden="true"
            />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="localePath(item.href)"
                  :class="{ 'text-mainColor': $route.path === item.href }"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                {{ item.name }}
              </NuxtLink>
            </div>
            <div class="py-6 flex gap-3">
              <NuxtLink
                  :to="localePath('/')"
                  class="text-sm font-semibold leading-6 text-mainColor">
                <MagnifyingGlassIcon class="w-5 h-5"/>
              </NuxtLink>
              <NuxtLink
                  :to="localePath('/')"
                  class="text-sm font-semibold leading-6 text-mainColor">
                <ShoppingBagIcon class="w-5 h-5"/>
              </NuxtLink>
              <NuxtLink
                  :to="localePath('/')"
                  class="text-sm font-semibold leading-6 text-mainColor">
                <BellIcon class="w-5 h-5"/>
              </NuxtLink>
              <NuxtLink
                  :to="localePath('/')"
                  class="text-sm font-semibold leading-6 text-mainColor">
                <UserIcon class="w-5 h-5"/>
              </NuxtLink>
              <LocaleSwitcher/>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
