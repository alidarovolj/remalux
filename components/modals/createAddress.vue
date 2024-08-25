<script setup>
import YandexMap from "~/components/maps/YandexMaps.vue";
import {useAddressesStore} from "~/stores/addresses.js";
import {useNotificationStore} from "~/stores/notifications.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const addresses = useAddressesStore()
const notifications = useNotificationStore()
const user = useUserStore()
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
    notifications.showNotification("error", "Произошла ошибка", e);
  }
}

onMounted(async () => {
  await nextTick()
  await user.getProfile()
  form.value.city_id = user.userProfile.city_id
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
    <form
        class="mt-6"
        @submit.prevent="createAddress">
      <div class="mb-4">
        <label
            class="block text-sm font-medium text-gray-700"
            for="address">
          {{ $t('addresses.create.address') }}
        </label>
        <p
            v-if="!form.address"
            class="text-red-500 border-b border-[#F0DFDF] py-3">
          {{ $t('addresses.create.no_address') }}
        </p>
        <p v-else>
          {{ form.address }}
        </p>
      </div>
      <div class="grid grid-cols-1 grid-y-2 sm:gap-y-4 sm:grid-cols-2 gap-x-4 xl:grid-cols-3">
        <div class="mb-4">
          <label
              class="block text-sm font-medium text-gray-700"
              for="address">
            {{ $t('addresses.create.entrance') }} <span class="text-gray-400">({{
              $t('no_results.not_required')
            }})</span>
          </label>
          <input
              id="address"
              v-model="form.entrance"
              :placeholder="$t('addresses.create.entrance_placeholder')"
              class="py-2 px-4 border rounded-md w-full bg-white "
              name="address"
              type="text">
        </div>
        <div class="mb-4">
          <label
              class="block text-sm font-medium text-gray-700"
              for="address">
            {{ $t('addresses.create.floor') }} <span class="text-gray-400">({{ $t('no_results.not_required') }})</span>
          </label>
          <input
              id="address"
              v-model="form.floor"
              :placeholder="$t('addresses.create.floor_placeholder')"
              class="py-2 px-4 border rounded-md w-full bg-white "
              name="address"
              type="text">
        </div>
        <div class="mb-4">
          <label
              class="block text-sm font-medium text-gray-700"
              for="address">
            {{ $t('addresses.create.apartment') }} <span class="text-gray-400">({{
              $t('no_results.not_required')
            }})</span>
          </label>
          <input
              id="address"
              v-model="form.float"
              :placeholder="$t('addresses.create.apartment_placeholder')"
              class="py-2 px-4 border rounded-md w-full bg-white "
              name="address"
              type="text">
        </div>
      </div>
      <button
          class="w-full"
          @submit.prevent="createAddress">
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