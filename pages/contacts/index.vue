<script setup>
import {useContactsStore} from '~/stores/contacts.js';
import {storeToRefs} from 'pinia';
import Breadcrumbs from '~/components/general/breadcrumbs.vue';
import MapsYandexMapsWithPlacemarks from '~/components/maps/YandexMapsWithPlacemarks.vue';
import {useLanguagesStore} from '~/stores/languages.js';

const contacts = useContactsStore();
const {contactsList} = storeToRefs(contacts);
const languages = useLanguagesStore();
const {cur_lang} = storeToRefs(languages);

const localePath = useLocalePath();
const {t} = useI18n();

const activeContact = ref(null);

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.contacts'), link: localePath('/contacts')}
]);

onMounted(async () => {
  await nextTick();
  await contacts.getContacts();

  // Set the initial active contact if the contacts list is not empty
  if (contactsList.value.data && contactsList.value.data.length > 0) {
    activeContact.value = contactsList.value.data[0];
  }
});
</script>


<template>
  <Breadcrumbs :links="links"/>
  <div class="pt-12 pb-32">
    <div
        v-if="contactsList && activeContact"
        class="container mx-auto px-4 md:px-0">
      <div
          data-aos="fade-up"
          class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">
          {{ $t('contacts.title') }}
        </h2>
      </div>
      <div
          class="mx-auto mt-6 mb-12 flex flex-col md:flex-row gap-5">
        <div
            data-aos="fade-up"
            :data-aos-duration="index * 500"
            v-for="(item, index) of contactsList.data"
            :key="index"
            @click="activeContact = item"
            :class="{ '!border-mainColor !text-black bg-[#F0DFDF] border-l-[6px]' : activeContact.id === item.id }"
            class="w-full pl-5 border-l-2 cursor-pointer border-[#B0B0B0] text-[#B0B0B0] rounded-r-lg py-2 hover:border-mainColor hover:text-black hover:bg-[#F0DFDF] hover:border-l-[6px] transition-all">
          <h3 class="font-semibold">
            {{ item.city.title[cur_lang] }}
          </h3>
          <address class="mt-3 text-xs not-italic">
            <p>{{ item.address }}</p>
          </address>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-5">
        <div class="w-full md:w-1/2">
          <p
              data-aos="fade-up"
              class="text-2xl font-semibold mb-6">
            {{ activeContact.city.title.ru }}
          </p>

          <div class="flex flex-col gap-5">
            <div
                data-aos="fade-up"
                class="w-full flex items-center text-sm border-b border-[#F0DFDF] pb-2">
              <p class="w-1/4 text-mainColor">{{ $t('contacts.address') }}</p>
              <p class="w-3/4 ml-2 font-semibold">{{ activeContact.address }}</p>
            </div>
            <div
                data-aos="fade-up"
                class="w-full flex items-center text-sm border-b border-[#F0DFDF] pb-2">
              <p class="w-1/4 text-mainColor">{{ $t('contacts.contacts') }}</p>
              <div class="w-3/4 ml-2 font-semibold flex gap-8 flex-wrap">
                <a
                    :href="`tel:${ activeContact.main_phone }`"
                    class="text-mainColor"
                >
                  {{ activeContact.main_phone }}
                </a>
                <a
                    v-for="(item, index) of activeContact.contact_items.phone"
                    :key="index"
                    :href="`tel:${ item.value }`"
                    class="text-mainColor"
                >
                  {{ item.value }}
                </a>
              </div>
            </div>
            <div
                data-aos="fade-up"
                class="w-full flex items-center text-sm border-b border-[#F0DFDF] pb-2">
              <p class="w-1/4 text-mainColor">{{ $t('contacts.email') }}</p>
              <div class="w-3/4 ml-2 font-semibold flex gap-8 flex-wrap">
                <a
                    :href="`mailto:${ activeContact.main_email }`"
                    class="text-mainColor"
                >
                  {{ activeContact.main_email }}
                </a>
                <a
                    v-for="(item, index) of activeContact.contact_items.email"
                    :key="index"
                    :href="`mailto:${item.value}`"
                    class="text-mainColor"
                >
                  {{ item.value }}
                </a>
              </div>
            </div>
            <div
                data-aos="fade-up"
                class="w-full flex items-center text-sm border-b border-[#F0DFDF] pb-2">
              <p class="w-1/4 text-mainColor">{{ $t('contacts.work_time') }}</p>
              <div class="w-3/4 ml-2 font-semibold flex flex-col">
                <p>{{ $t('contacts.work_info.first.from') }} {{ activeContact.work_time.weekdays[0] }} {{ $t('contacts.work_info.first.to') }}
                  {{ activeContact.work_time.weekdays[1] }}</p>
                <p>{{ $t('contacts.work_info.second.from') }} {{ activeContact.work_time.weekends[0] }} {{ $t('contacts.work_info.second.to') }}
                  {{ activeContact.work_time.weekends[1] }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
            v-if="activeContact"
            class="w-full md:w-1/2">
          <client-only>
            <MapsYandexMapsWithPlacemarks :location="{
              latitude: activeContact.latitude,
              longitude: activeContact.longitude
            }"/>
          </client-only>
        </div>

      </div>

    </div>
  </div>
</template>
