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
      {{ $t('addresses.remove.title') }}
    </p>
    <p>
      {{ $t('addresses.remove.confirmation') }}
    </p>
    <div class="flex justify-end gap-3 mt-6">
      <button
          class="px-6 py-2 text-mainColor border border-mainColor rounded-lg"
          @click="modals.modal.show = false">
        {{ $t('addresses.remove.cancel') }}
      </button>
      <button
          class="px-6 py-2 bg-red-500 text-white rounded-lg"
          @click="removeAddressLocal">
        {{ $t('addresses.remove.delete') }}
      </button>
    </div>
  </div>
</template>