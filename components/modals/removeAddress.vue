<script setup>
import {useAddressesStore} from "~/stores/addresses.js";
import {useNotificationStore} from "~/stores/notifications.js";

const addresses = useAddressesStore()
const notifications = useNotificationStore()
const modals = useModalsStore()

const removeAddressLocal = async () => {
  try {
    await addresses.removeAddress(modals.modal.modalData.id)
    await addresses.getAddresses()
    modals.modal.show = false
    notifications.showNotification("success", "Успешно", "Адрес успешно удален")
  } catch (e) {
    console.error(e)
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
      Удаление адреса
    </p>
    <p>
      Вы уверены, что хотите удалить адрес?
    </p>
    <div class="flex justify-end gap-3 mt-6">
      <button
          @click="modals.showModal('removeAddress', false)"
          class="px-6 py-2 text-mainColor border border-mainColor rounded-lg">
        Отмена
      </button>
      <button
          @click="removeAddressLocal"
          class="px-6 py-2 bg-red-500 text-white rounded-lg">
        Удалить
      </button>
    </div>
  </div>
</template>