<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
import {ChevronDownIcon} from "@heroicons/vue/24/outline";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const localePath = useLocalePath();
const {t} = useI18n();
const user = useUserStore()
const notifications = useNotificationStore()
const router = useRouter()
const route = useRoute()
const loading = ref(false);

const links = computed(() => [
  {title: t("breadcrumbs.home"), link: localePath("/")},
  {title: "FAQ", link: localePath("/faq")},
]);

const form = ref({
  question: '',
})

const v$ = useVuelidate({
  question: {required}
}, form);

// Sample FAQ data
const faqs = computed(() => [
  {
    id: 1,
    question: t("faq.quest1.title"),
    answer: t("faq.quest1.answer"),
  },
  {
    id: 2,
    question: t("faq.quest2.title"),
    answer: t("faq.quest2.answer"),
  },
  {
    id: 3,
    question: t("faq.quest3.title"),
    answer: t("faq.quest3.answer"),
  },
  {
    id: 4,
    question: t("faq.quest4.title"),
    answer: t("faq.quest4.answer"),
  },
  {
    id: 5,
    question: t("faq.quest5.title"),
    answer: t("faq.quest5.answer"),
  },
  {
    id: 6,
    question: t("faq.quest6.title"),
    answer: t("faq.quest6.answer"),
  },
]);


const sendMessage = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  if(user.userProfile) {
    try {
      const response = await api(`/api/questions`, "POST", {
        body: JSON.stringify(form.value)
      }, route.query);

      await nextTick()
      form.value.question = '';
      notifications.showNotification("success", "Успешно", "Вы успешно отправили вопрос, мы ответим вам как можно скорее");
      v$.value.$reset();
    } catch (e) {
      notifications.showNotification("error", "Произошла ошибка", e);
    }
  } else {
    notifications.showNotification("error", "Ошибка", "Для отправки вопроса необходимо авторизоваться");
    await router.push(localePath('/login'))
  }

  loading.value = false;
}

useHead({
  title: t("headers.faq.title"),
  meta: [
    {
      property: "description",
      content: t("headers.faq.description"),
    },
    {
      property: "og:description",
      content: t("headers.faq.description"),
    },
    {
      property: "og:title",
      content: t("headers.faq.title"),
    },
    {
      property: "og:url",
      content: t("headers.faq.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.faq.canonical")}],
});
</script>


<template>
  <Breadcrumbs :links="links"/>
  <div class="pt-16 pb-32">
    <div class="container mx-auto px-4 md:px-0">
      <div class="flex items-start gap-5">
        <form
            @submit.prevent="sendMessage"
            class="w-full md:w-[45%] flex flex-col gap-6">
          <div class="flex items-end gap-3">
            <h1 class="text-4xl font-medium font-montserrat text-mainColor">
              {{ $t('faq.title') }}
            </h1>
            <p class="text-[#7B7B7B]">
              {{ $t('faq.subtitle') }}
            </p>
          </div>
          <p class="text-sm">
            {{ $t('faq.description') }}
          </p>
          <div>
            <p class="mb-2 text-xs text-[#7B7B7B]">{{ $t('faq.quest.title') }}</p>
            <textarea
                v-model="form.question"
                :class="{ 'border-red-500' : v$.question.$error }"
                class="w-full h-32 border border-[#E5E5E5] rounded-lg p-4 text-sm"
                :placeholder="$t('faq.quest.placeholder')"
            ></textarea>
          </div>
          <button
              v-if="!loading"
              type="submit"
              class="border border-mainColor w-full py-3 rounded-lg text-mainColor hover:bg-mainColor hover:text-white transition-all">
            {{ $t('faq.quest.button') }}
          </button>
          <button
              v-else
              type="button"
              class="border border-mainColor w-full py-3 rounded-lg text-mainColor hover:bg-mainColor hover:text-white transition-all">
            <span class="spinner"></span>
          </button>
        </form>
        <div class="w-full md:w-[55%]">
          <div class="space-y-4">
            <Disclosure
                v-for="faq in faqs"
                :key="faq.id"
                as="div"
                v-slot="{ open }"
                class="border-b border-[#F0DFDF] py-3 px-4">
              <DisclosureButton
                  class="flex w-full justify-between text-gray-900 hover:text-mainColor transition-all"
              >
                <span
                    :class="{ 'font-bold text-black' : open}"
                    class="font-medium text-[#7B7B7B] transition-all">{{ faq.question }}</span>
                <ChevronDownIcon
                    :class="{ 'rotate-180': open }"
                    class="h-5 w-5 transform transition-transform duration-300 text-mainColor"
                />
              </DisclosureButton>
              <DisclosurePanel class="mt-2 text-sm transition-all">
                {{ faq.answer }}
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
