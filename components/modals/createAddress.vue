<script setup>
import YandexMap from "~/components/maps/YandexMaps.vue";
import {useAddressesStore} from "~/stores/addresses.js";
import {useNotificationStore} from "~/stores/notifications.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const addresses = useAddressesStore()
const notifications = useNotificationStore()
const modals = useModalsStore()
const route = useRoute()

const loading = ref(false)

const form = ref({
  city_id: "",
  address: "",
  entrance: "",
  floor: "",
  float: "",
});

const v$ = useVuelidate({
  city_id: {required},
  address: {required},
}, form);

const createAddress = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    const response = await api(`/api/users/addresses`, "POST", {
      body: JSON.stringify(form.value)
    }, route.query);

    notifications.showNotification("success", "Успешно", "Вы успешно добавили адрес");
    await nextTick()
    modals.modal.show = false;
    loading.value = false;
    await addresses.getAddresses()
  } catch (e) {
    if (e.response) {
      if (e.response.status !== 500) {
        notifications.showNotification("error", "Произошла ошибка", e.response.data.message);
      } else {
        notifications.showNotification("error", "Ошибка сервера!", "Попробуйте позже.");
      }
    } else {
      console.error(e);
      notifications.showNotification("error", "Произошла ошибка", "Неизвестная ошибка");
    }
  }
}

onMounted(async () => {
  await nextTick()
  await addresses.getCities()
})
</script>

<template>
  <div>
    <p class="text-xl font-semibold mb-6">
      {{ $t('addresses.create.title') }}
    </p>
    <YandexMap
        @send_data="(data) => form.address = data.address"
    />
    <form @submit.prevent="createAddress">
      <div class="grid grid-cols-1 grid-y-2 sm:gap-y-4 sm:grid-cols-2 gap-x-4 xl:grid-cols-3">
        <div
            v-if="addresses.citiesList"
            class="mb-4">
          <label
              for="city"
              class="block text-sm font-medium text-gray-700">
            {{ $t('addresses.create.city') }}
          </label>
          <select
              v-model="form.city_id"
              :class="{ 'border-red-500' : v$.city_id.$error }"
              class="py-2 px-4 border rounded-md w-full bg-white"
              name=""
              id="">
            <option :value="null">{{ $t('addresses.create.city_placeholder') }}</option>
            <option
                v-for="(city, index) of addresses.citiesList"
                :key="index"
                :value="city.id">
              {{ city.title }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label
              for="address"
              class="block text-sm font-medium text-gray-700">
            {{ $t('addresses.create.address') }}
          </label>
          <input
              :class="{ 'border-red-500' : v$.address.$error }"
              v-model="form.address"
              :placeholder="$t('addresses.create.address_placeholder')"
              type="text"
              name="address"
              id="address"
              class="py-2 px-4 border rounded-md w-full bg-white ">
        </div>
        <div class="mb-4">
          <label
              for="address"
              class="block text-sm font-medium text-gray-700">
            {{ $t('addresses.create.entrance') }}
          </label>
          <input
              v-model="form.entrance"
              :placeholder="$t('addresses.create.entrance_placeholder')"
              type="text"
              name="address"
              id="address"
              class="py-2 px-4 border rounded-md w-full bg-white ">
        </div>
        <div class="mb-4">
          <label
              for="address"
              class="block text-sm font-medium text-gray-700">
            {{ $t('addresses.create.floor') }}
          </label>
          <input
              v-model="form.floor"
              :placeholder="$t('addresses.create.floor_placeholder')"
              type="text"
              name="address"
              id="address"
              class="py-2 px-4 border rounded-md w-full bg-white ">
        </div>
        <div class="mb-4">
          <label
              for="address"
              class="block text-sm font-medium text-gray-700">
            {{ $t('addresses.create.apartment') }}
          </label>
          <input
              v-model="form.float"
              :placeholder="$t('addresses.create.apartment_placeholder')"
              type="text"
              name="address"
              id="address"
              class="py-2 px-4 border rounded-md w-full bg-white ">
        </div>
      </div>
      <button
          @submit.prevent="createAddress"
          class="w-full">
        <span v-if="loading" class="spinner"></span>
        <p
            v-else
            class="bg-mainColor text-white py-2 px-4 rounded-md text-center w-full"
        >
          {{ $t('addresses.create.button') }}
        </p>
      </button>
    </form>
  </div>
</template>