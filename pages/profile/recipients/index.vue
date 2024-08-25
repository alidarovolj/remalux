<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {PlusIcon, TrashIcon, UsersIcon} from "@heroicons/vue/24/outline"
import {useRecipientsStore} from "~/stores/recipients.js";

const {t} = useI18n()
const localePath = useLocalePath()
const recipients = useRecipientsStore()
const {recipientList} = storeToRefs(recipients)
const modals = useModalsStore()

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.profile'), link: localePath('/profile')},
  {title: t('breadcrumbs.recipients'), link: localePath('/profile/recipients')},
]);

onMounted(async () => {
  await nextTick()
  await recipients.getRecipients()
})
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <NuxtLayout name="profile">
      <div class="bg-white p-6 rounded-2xl set_shadow">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 mb-6">
            <UsersIcon class="w-8 h-8 text-mainColor"/>
            <h1 class="text-xl font-medium">
              {{ $t('profile.recipients') }}
            </h1>
          </div>
        </div>
        <div v-if="recipientList">
          <div
              v-if="recipientList.data.length > 0"
              class="flex flex-col gap-5">
            <div
                v-for="(item, index) of recipientList.data"
                :key="index"
                class="p-4 border border-[#F0DFDF] rounded-lg flex items-center justify-between">
              <div class="flex gap-5">
                <p>{{ item.name }} / {{ item.phone_number }}</p>
              </div>
              <TrashIcon
                  class="w-5 h-5 text-red-500 cursor-pointer"
                  @click="modals.showModal('removeRecipient', item)"/>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500 py-3">
              {{ $t('profile.no_recipients') }}
            </p>
          </div>
        </div>
        <div v-else class="spinner p-3"></div>
        <div
            class="cursor-pointer flex items-center justify-center py-4 border rounded-lg border-dashed border-mainColor text-mainColor text-center text-xl gap-3 mt-5"
            @click="modals.showModal('createRecipient')">
          <PlusIcon class="w-7 h-7"/>
          <p>{{ $t('profile.add_recipient') }}</p>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>