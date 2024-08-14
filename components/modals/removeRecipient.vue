<script setup>
import {useAddressesStore} from "~/stores/addresses.js";
import {useNotificationStore} from "~/stores/notifications.js";
import {useRecipientsStore} from "~/stores/recipients.js";

const recipients = useRecipientsStore()
const notifications = useNotificationStore()
const modals = useModalsStore()

const removeRecipientLocal = async () => {
  try {
    await recipients.removeRecipient(modals.modal.modalData.id)
    await recipients.getRecipients()
    modals.modal.show = false
    notifications.showNotification("success", "Успешно", "Получатель успешно удален")
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div>
    <p class="text-xl font-semibold mb-6">
      {{ $t('recipients.remove.title') }}
    </p>
    <p>
      {{ $t('recipients.remove.confirmation') }}
    </p>
    <div class="flex justify-end gap-3 mt-6">
      <button
          @click="modals.showModal('removeAddress', false)"
          class="px-6 py-2 text-mainColor border border-mainColor rounded-lg">
        {{ $t('recipients.remove.cancel') }}
      </button>
      <button
          @click="removeRecipientLocal"
          class="px-6 py-2 bg-red-500 text-white rounded-lg">
        {{ $t('recipients.remove.delete') }}
      </button>
    </div>
  </div>
</template>