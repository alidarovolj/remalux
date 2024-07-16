<script setup>
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'

const {locales, locale, setLocale} = useI18n();

const setLocaleLocal = (val) => {
  setLocale(val.code);
  handleClick();
};

const handleClick = () => {
  const elem = document.activeElement;
  if (elem) {
    elem?.blur();
  }
};
</script>

<template>
  <Menu
      as="div"
      class="relative inline-block text-left">
    <div>
      <MenuButton
          class="inline-flex w-full justify-center gap-x-1.5 rounded-md text-sm font-semibold p-1 uppercase bg-mainColor text-white">
        {{ locales.find((lang) => lang.code === locale).sh_name }}
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
          <MenuItem
              v-for="(lang, index) in locales"
              :key="index"
              v-slot="{ active }"
              @click="setLocaleLocal(lang)">
            <p :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
              {{ lang.name }}
            </p>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>