<script setup>
import YandexMap from "~/components/maps/YandexMaps.vue";
</script>

<template>
  <div>
    <p class="text-xl font-semibold mb-6">
      Добавить адрес доставки
    </p>
    <YandexMap @send_data="(data) => console.log(data)" />
    <form @submit.prevent="createAddress">
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700">Адрес</label>
        <input v-model="address" type="text" name="address" id="address" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
      </div>
      <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3 mt-10">
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Телефон</label>
          <input v-model="phone" type="text" name="phone" id="phone" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="city" class="block text-sm font-medium text-gray-700">Город</label>
          <input v-model="city" type="text" name="city" id="city" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="zip" class="block text-sm font-medium text-gray-700">Индекс</label>
          <input v-model="zip" type="text" name="zip" id="zip" class="mt-1 focus
        :ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
      </div>
    </form>
  </div>
</template>