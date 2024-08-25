<script setup>
import {vMaska} from "maska/vue"
import {useVuelidate} from "@vuelidate/core"
import {required} from "@vuelidate/validators"
import {useNotificationStore} from "~/stores/notifications.js";
import img1 from "@/assets/img/auth/slide1.jpg"
import img2 from "@/assets/img/auth/slide2.jpg"
import img3 from "@/assets/img/auth/slide3.jpg"
import {useUserStore} from "~/stores/user.js";

const loading = ref(false);
const code_sent = ref(false);
const notifications = useNotificationStore()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const auth = useAuthStore()
const user = useUserStore()

const form = ref({
  phone_number: '',
})

const formCode = ref({
  phone_number: '',
  code: ''
})

const carousel = ref([
  img1, img2, img3
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

const v$ = useVuelidate({
  phone_number: {required, minLength: 11}
}, form);

const codeRequest = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    const response = await api(`/api/auth/password-recovery/request-code`, "POST", {
      body: JSON.stringify(form.value)
    }, route.query);
    code_sent.value = true
    formCode.value.phone_number = form.value.phone_number
    notifications.showNotification("success", "Код запрошен", "Проверьте ваш телефон и введите код подтверждения.");
  } catch (e) {
    notifications.showNotification("error", "Произошла ошибка", e);
  }

}

const passwordRequest = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    const response = await api(`/api/auth/password-recovery/verify-code`, "POST", {
      body: JSON.stringify(formCode.value)
    }, route.query);
    await auth.initCookieToken();
    auth.token = response.access_token;
    await nextTick()
    await user.getProfile()
    notifications.showNotification("success", "Смена пароля подтверждена", "Проверьте вашу почту, мы отправили вам новый пароль.");
    await router.push(localePath('/'))
  } catch (e) {
    notifications.showNotification("error", "Произошла ошибка", e);
  }

}
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <div class="flex min-h-full flex-1 items-center py-10">
      <div class="flex flex-1 flex-col justify-center px-4 sm:pr-6 lg:flex-none lg:pr-20 xl:pr-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {{ $t('forms.forgot_password.title') }}
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
              {{ $t('forms.forgot_password.description') }}
            </p>
          </div>

          <div class="mt-7">
            <div>
              <form
                  v-if="!code_sent"
                  action=""
                  class="space-y-6"
                  @submit.prevent="codeRequest">

                <div
                    :class="{ '!border !border-red-500': v$.phone_number.$error }"
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label class="block text-xs font-medium text-gray-900" for="name">
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
                  />
                </div>

                <div>
                  <button class="flex w-full justify-center rounded-md bg-mainColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor"
                          type="submit">
                    {{ $t('forms.forgot_password.button') }}
                  </button>
                </div>
              </form>
              <form
                  v-else
                  class="space-y-6"
                  @submit.prevent="passwordRequest"
              >
                <div
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label class="block text-xs font-medium text-gray-900" for="name">
                    {{ $t('forms.code.title') }}
                  </label>
                  <input
                      id="code"
                      v-model="formCode.code"
                      :placeholder="$t('forms.code.placeholder')"
                      autocomplete="code"
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      name="code"
                      type="text"
                  />
                </div>

                <div>
                  <button
                      class="flex w-full justify-center rounded-md bg-mainColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor"
                      type="submit">
                    {{ $t('forms.forgot_password.code_button') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="relative hidden w-full md:block auth h-full">
        <client-only>
          <my-carousel-carousel
              :breakpoints="breakpoints"
              :mouse-drag="true"
              :touch-drag="true"
          >
            <my-carousel-slide
                v-for="(item, index) of carousel"
                :key="index"
                class="h-full"
            >
              <img
                  :src="item"
                  alt=""
                  class="w-full h-full object-cover"
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
