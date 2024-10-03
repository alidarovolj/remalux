<script setup>
import {vMaska} from "maska/vue"
import {useVuelidate} from "@vuelidate/core"
import {email, required, sameAs} from "@vuelidate/validators"
import {useNotificationStore} from "~/stores/notifications.js";
import img1 from "assets/img/auth/slide1.jpg";
import img2 from "assets/img/auth/slide2.jpg";
import img3 from "assets/img/auth/slide3.jpg";
import img4 from "assets/img/auth/slide4.jpg";
import img5 from "assets/img/auth/slide5.jpg";
import {useUserStore} from "~/stores/user.js";

const loading = ref(false);
const notifications = useNotificationStore()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const user = useUserStore()
const {t} = useI18n();

const form = ref({
  name: '',
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: '',
  agreement: false
})

const v$ = useVuelidate({
  name: {required},
  phone_number: {required, minLength: 11},
  email: {required, email},
  password: {required},
  password_confirmation: {required},
  agreement: {sameAs: sameAs(true)}
}, form);

const carousel = ref([
  img1, img2, img3, img4, img5
])

const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 1,
    snapAlign: "start"
  }
})

const checkPhone = async (e) => {
  if (e.target.value.length === 18) {
    await user.checkPhone(e.target.value)
  }
}

const checkEmail = async (e) => {
  if (e.target.value.includes('@')) {
    await user.checkEmail(e.target.value)
  }
}

const registerUser = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  if (user.userCheckedEmail) {
    if (user.userCheckedPhone) {
      if (form.value.password === form.value.password_confirmation) {
        try {
          const response = await api(`/api/auth/registration`, "POST", {
            body: JSON.stringify(form.value)
          }, route.query);

          console.log(response)

          if (response.message === "Success !") {
            notifications.showNotification("success", "Успешно", "Вы успешно зарегистрировались!");
            loading.value = false;
            router.push(localePath('/login'));
          }
        } catch (e) {
          notifications.showNotification("error", "Произошла ошибка", e);
        }
      } else {
        notifications.showNotification("error", "Пароли не совпадают", "Проверьте правильность введенных данных и попробуйте снова.");
      }
    } else {
      notifications.showNotification("error", "Данный номер телефона уже зарегистрирован", "Проверьте правильность введенных данных и попробуйте снова.");
    }
  } else {
    notifications.showNotification("error", "Данный email уже зарегистрирован", "Проверьте правильность введенных данных и попробуйте снова.");
  }
  loading.value = false;
}

useHead({
  title: t("headers.registration.title"),
  meta: [
    {
      property: "description",
      content: t("headers.registration.description"),
    },
    {
      property: "og:description",
      content: t("headers.registration.description"),
    },
    {
      property: "og:title",
      content: t("headers.registration.title"),
    },
    {
      property: "og:url",
      content: t("headers.registration.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.registration.canonical")}],
});
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <div class="flex min-h-full flex-1 items-center py-10">
      <div class="w-full md:w-1/3 flex flex-1 flex-col justify-center px-4 sm:pr-6 lg:flex-none lg:pr-20 xl:pr-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {{ $t('forms.registration.title') }}
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
              {{ $t('forms.registration.already_have') }}
              {{ ' ' }}
              <NuxtLink
                  :to="localePath('/login')"
                  class="font-semibold text-mainColor">
                {{ $t('forms.registration.login') }}
              </NuxtLink>
            </p>
          </div>

          <div class="mt-10">
            <div>
              <form
                  action=""
                  class="space-y-6"
                  @submit.prevent="registerUser">

                <div
                    :class="{ '!border !border-red-500' : v$.name.$error }"
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label class="block text-xs font-medium text-gray-900" for="name">
                    {{ $t('forms.name.title') }}
                  </label>
                  <input
                      id="name"
                      v-model="form.name"
                      :placeholder="$t('forms.name.placeholder')"
                      autocomplete="name"
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      name="name"
                      type="text"
                  />
                </div>

                <div>
                  <div
                      :class="{ '!border !border-red-500' : v$.phone_number.$error }"
                      class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label class="block text-xs font-medium text-gray-900" for="phone_number">
                      {{ $t('forms.phone_number.title') }}
                    </label>
                    <input
                        id="phone_number"
                        v-model="form.phone_number"
                        v-maska
                        autocomplete="phone_number"
                        class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        data-maska="+7 (###) ###-##-##"
                        name="phone_number"
                        placeholder="+7 (___) ___-__-__"
                        type="text"
                        @input="checkPhone"
                    />
                  </div>
                  <div v-if="form.phone_number.length === 18">
                    <div class="text-xs mt-1">
                      <p
                          v-if="!user.userCheckedPhone"
                          class="text-red-500"
                      >
                        {{ $t('forms.registration.phone_yes') }}
                      </p>
                      <p
                          v-else
                          class="text-green-500"
                      >
                        {{ $t('forms.registration.phone_no') }}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div
                      :class="{ '!border !border-red-500' : v$.email.$error }"
                      class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label class="block text-xs font-medium text-gray-900" for="email">
                      {{ $t('forms.email.title') }}
                    </label>
                    <input
                        id="email"
                        v-model="form.email"
                        :placeholder="$t('forms.email.placeholder')"
                        autocomplete="email"
                        class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        name="email"
                        type="text"
                        @input="checkEmail"
                    />
                  </div>
                  <div>
                    <div v-if="user.userCheckedEmail !== null" class="text-xs mt-1">
                      <p
                          v-if="!user.userCheckedEmail"
                          class="text-red-500"
                      >
                        {{ $t('forms.registration.email_yes') }}
                      </p>
                      <p
                          v-else
                          class="text-green-500"
                      >
                        {{ $t('forms.registration.email_no') }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                    :class="{ '!border !border-red-500' : v$.password.$error }"
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label class="block text-xs font-medium text-gray-900" for="password">
                    {{ $t('forms.password.title') }}
                  </label>
                  <input
                      id="password"
                      v-model="form.password"
                      autocomplete="password"
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      name="password"
                      placeholder="********"
                      type="password"
                  />
                </div>

                <ul class="list-disc pl-5 text-xs">
                  <li :class="{ 'text-green-600' : form.password.length >= 8 }">
                    {{ $t('forms.registration.rules.first') }}
                  </li>
                  <li :class="{ 'text-green-600' : /[A-Z]/.test(form.password) }">
                    {{ $t('forms.registration.rules.second') }}
                  </li>
                  <li :class="{ 'text-green-600' : /[a-z]/.test(form.password) }">
                    {{ $t('forms.registration.rules.third') }}
                  </li>
                  <li :class="{ 'text-green-600' : /[0-9]/.test(form.password) }">
                    {{ $t('forms.registration.rules.fourth') }}
                  </li>
                </ul>

                <div
                    :class="{ '!border !border-red-500' : v$.password_confirmation.$error }"
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label class="block text-xs font-medium text-gray-900" for="password_confirmation">
                    {{ $t('forms.confirm_password.title') }}
                  </label>
                  <input
                      id="password_confirmation"
                      v-model="form.password_confirmation"
                      autocomplete="password_confirmation"
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      name="password_confirmation"
                      placeholder="********"
                      type="password"
                  />
                </div>

                <div class="flex flex-col justify-between">
                  <label
                      class="mb-6 w-full flex gap-3 items-center cursor-pointer"
                      for="agreement">
                    <input
                        id="agreement"
                        v-model="form.agreement"
                        class="w-6 h-6"
                        name="agreement"
                        type="checkbox">
                    <p :class="{ '!text-red-500 underline': v$.agreement.$error }" class="text-sm">
                      {{ $t('checkout.third.agreement.text') }}
                      <NuxtLink
                          :class="{ '!text-red-500 underline': v$.agreement.$error }"
                          :to="localePath('/')"
                          class="text-blue-500 underline">
                        {{ $t('checkout.third.agreement.link') }}
                      </NuxtLink>
                    </p>
                  </label>

                  <div class="text-sm leading-6">
                    <NuxtLink
                        :to="localePath('/forgot-password')"
                        class="font-semibold text-mainColor">
                      {{ $t('forms.forgot_pass') }}
                    </NuxtLink>
                  </div>
                </div>

                <div>
                  <button
                      class="flex w-full justify-center rounded-md bg-mainColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor"
                      type="submit">
                    {{ $t('forms.registration.button') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full relative hidden md:block auth h-[700px]">
        <client-only class="h-full">
          <my-carousel-carousel
              :autoplay="4000"
              :breakpoints="breakpoints"
              :mouse-drag="true"
              :touch-drag="true"
              :wrap-around="true"
              class="h-full"
          >
            <my-carousel-slide
                v-for="(item, index) of carousel"
                :key="index"
                class="w-full h-auto"
            >
              <img
                  :src="item"
                  alt=""
                  class="w-full h-full object-contain"
              />
            </my-carousel-slide>
            <template #addons>
              <my-carousel-pagination/>
            </template>
          </my-carousel-carousel>
        </client-only>
      </div>
    </div>
  </div>
</template>