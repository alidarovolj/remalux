<script setup>
import {useNotificationStore} from "~/stores/notifications.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {useRecipientsStore} from "~/stores/recipients.js";
import {vMaska} from "maska/vue"

const recipients = useRecipientsStore()
const {recipientList} = useRecipientsStore()
const notifications = useNotificationStore()
const user = useUserStore()
const modals = useModalsStore()
const route = useRoute()

const loading = ref(false)

const form = ref({
  name: "",
  phone_number: "",
});

const v$ = useVuelidate({
  name: {required},
  phone_number: {required, minLength: 11},
}, form);

const createRecipient = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    const response = await api(`/api/users/recipients`, "POST", {
      body: JSON.stringify(form.value)
    }, route.query);

    notifications.showNotification("success", "Успешно", "Вы успешно добавили получателя");
    await nextTick()
    modals.modal.show = false;
    loading.value = false;
    await recipients.getRecipients()
  } catch (e) {
    notifications.showNotification("error", "Произошла ошибка", e);
  }
}
</script>

<template>
  <div>
    <p class="text-xl font-semibold mb-6">
      {{ $t('recipients.create.title') }}
    </p>
    <form
        class="flex flex-col gap-4"
        @submit.prevent="createRecipient">
      <div>
        <input
            v-model="form.name"
            :class="{ '!border !border-red-500 rounded-md': v$.name.$error }"
            :placeholder="$t('recipients.create.name_placeholder')"
            class="w-full px-4 border-b border-[#F0DFDF] py-3"
            type="text">
      </div>
      <div>
        <input
            v-model="form.phone_number"
            v-maska
            :class="{ '!border !border-red-500 rounded-md': v$.phone_number.$error }"
            :placeholder="$t('checkout.first.phone')"
            class="w-full px-4 border-b border-[#F0DFDF] py-3"
            data-maska="+7 (###) ###-##-##"
            type="text">
      </div>
      <button
          class="w-full"
          type="submit">
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