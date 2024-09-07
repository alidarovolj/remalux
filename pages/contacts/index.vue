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

const days = computed(() => [
  {title: t('days.monday'), value: 'monday'},
  {title: t('days.tuesday'), value: 'tuesday'},
  {title: t('days.wednesday'), value: 'wednesday'},
  {title: t('days.thursday'), value: 'thursday'},
  {title: t('days.friday'), value: 'friday'},
  {title: t('days.saturday'), value: 'saturday'},
  {title: t('days.sunday'), value: 'sunday'},
]);

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

useHead({
  title: t("headers.contacts.title"),
  meta: [
    {
      property: "description",
      content: t("headers.contacts.description"),
    },
    {
      property: "og:description",
      content: t("headers.contacts.description"),
    },
    {
      property: "og:title",
      content: t("headers.contacts.title"),
    },
    {
      property: "og:url",
      content: t("headers.contacts.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.contacts.canonical")}],
});
</script>


<template>
  <Breadcrumbs :links="links"/>
  <div class="pt-12 pb-32">
    <div
        v-if="contactsList && activeContact"
        class="container mx-auto px-4 md:px-0">
      <div
          class="mx-auto max-w-2xl lg:mx-0">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 font-montserrat">
          {{ $t('contacts.title') }}
        </h1>
      </div>
      <div
          class="mx-auto mt-6 mb-12 flex flex-col md:flex-row gap-5">
        <div
            v-for="(item, index) of contactsList.data"
            :key="index"
            :class="{ '!border-mainColor !text-black bg-[#F0DFDF] border-l-[6px]' : activeContact.id === item.id }"
            class="w-full pl-5 border-l-2 cursor-pointer border-[#B0B0B0] text-[#B0B0B0] rounded-r-lg py-2 hover:border-mainColor hover:text-black hover:bg-[#F0DFDF] hover:border-l-[6px] transition-all"
            @click="activeContact = item">
          <h3 class="font-semibold font-montserrat">
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
              class="text-2xl font-montserrat font-semibold mb-6"
              data-aos="fade-up">
            {{ activeContact.city.title[cur_lang] }}
          </p>

          <div class="flex flex-col gap-5">
            <div
                class="w-full flex items-center text-sm border-b border-[#F0DFDF] pb-2"
                data-aos="fade-up">
              <p class="w-1/4 text-mainColor">{{ $t('contacts.address') }}</p>
              <p class="w-3/4 ml-2 font-semibold">{{ activeContact.address }}</p>
            </div>
            <div
                class="w-full flex items-center text-sm border-b border-[#F0DFDF] pb-2"
                data-aos="fade-up">
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
                class="w-full flex items-center text-sm border-b border-[#F0DFDF] pb-2"
                data-aos="fade-up">
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
                class="w-full flex items-start text-sm border-b border-[#F0DFDF] pb-2"
                data-aos="fade-up">
              <p class="w-1/4 text-mainColor">{{ $t('contacts.work_time') }}</p>
              <div class="w-3/4 ml-2 font-semibold flex flex-col gap-1">
                <div
                    v-for="(item, index) of activeContact.work_time"
                    :key="index"
                    class="flex items-center"
                >
                  <p class="w-[150px] min-w-[150px]">
                    {{ days[index].title }}
                  </p>
                  <p>
                    {{ item.start_time }} - {{ item.end_time }}
                  </p>
                </div>
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
