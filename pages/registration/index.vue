<script setup>
import {vMaska} from "maska/vue"
import {useVuelidate} from "@vuelidate/core"
import {email, required} from "@vuelidate/validators"
import {useNotificationStore} from "~/stores/notifications.js";

const loading = ref(false);
const notifications = useNotificationStore()
const route = useRoute()
const localePath = useLocalePath()

const form = ref({
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const v$ = useVuelidate({
  phone_number: {required, minLength: 11},
  email: {required, email},
  password: {required},
  password_confirmation: {required}
}, form);

const registerUser = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  if (form.value.password === form.value.password_confirmation) {
    try {
      const response = await api(`/`, "POST", {
        body: JSON.stringify(form.value)
      }, route.query);
    } catch (e) {
      if (e.response) {
        if (e.response.status !== 500) {
          notifications.showNotification("error", "Произошла ошибка", e.response.data.message);
        } else {
          notifications.showNotification("error", "Ошибка сервера!", "Попробуйте позже.");
        }
      } else {
        console.error(e);
        notifications.showNotification("error", "Произошла ошибка", "Неизвестная ошибка");
      }
    }
  } else {
    notifications.showNotification("error", "Пароли не совпадают", "Проверьте правильность введенных данных и попробуйте снова.");
  }
}
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <div class="flex min-h-full flex-1">
      <div class="flex flex-1 flex-col justify-center px-4 py-20 sm:pr-6 lg:flex-none lg:pr-20 xl:pr-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">Регистрация</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
              Уже есть аккаунт?
              {{ ' ' }}
              <NuxtLink
                  :to="localePath('/login')"
                  class="font-semibold text-mainColor">
                Войти
              </NuxtLink>
            </p>
          </div>

          <div class="mt-10">
            <div>
              <form
                  @submit.prevent="registerUser"
                  action=""
                  class="space-y-6">

                <div
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label for="name" class="block text-xs font-medium text-gray-900">
                    Номер телефона
                  </label>
                  <input
                      id="phone_number"
                      name="phone_number"
                      type="text"
                      autocomplete="phone_number"
                      v-maska
                      data-maska="+7 (###) ###-##-##"
                      placeholder="+7 (___) ___-__-__"
                      required=""
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>

                <div
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label for="email" class="block text-xs font-medium text-gray-900">
                    Email адрес
                  </label>
                  <input
                      id="email"
                      name="email"
                      type="text"
                      autocomplete="email"
                      placeholder="remalux@example.com"
                      required=""
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>

                <div
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label for="password" class="block text-xs font-medium text-gray-900">
                    Пароль
                  </label>
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="password"
                      placeholder="********"
                      required=""
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>

                <ul class="list-disc pl-5 text-xs">
                  <li :class="{ 'text-green-600' : form.password.length >= 8 }">Длина пароля должна быть не менее 8
                    символов
                  </li>
                  <li :class="{ 'text-green-600' : /[A-Z]/.test(form.password) }">Латинские заглавные буквы</li>
                  <li :class="{ 'text-green-600' : /[a-z]/.test(form.password) }">Латинские строчные буквы</li>
                  <li :class="{ 'text-green-600' : /[0-9]/.test(form.password) }">Цифры 0-9</li>
                </ul>

                <div
                    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                  <label for="password_confirmation" class="block text-xs font-medium text-gray-900">
                    Подтверждение пароля
                  </label>
                  <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      autocomplete="password_confirmation"
                      placeholder="********"
                      required=""
                      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox"
                           class="h-4 w-4 rounded border-gray-300 text-mainColor focus:ring-mainColor"/>
                    <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">Запомнить меня</label>
                  </div>

                  <div class="text-sm leading-6">
                    <a href="#" class="font-semibold text-mainColor">Забыли пароль?</a>
                  </div>
                </div>

                <div>
                  <button type="submit"
                          class="flex w-full justify-center rounded-md bg-mainColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor">
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </div>

            <div class="mt-10">
              <div class="relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-200"/>
                </div>
                <div class="relative flex justify-center text-sm font-medium leading-6">
                  <span class="bg-white px-6 text-gray-900">Или продолжить с</span>
                </div>
              </div>

              <div class="mt-6">
                <a href="#"
                   class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                  <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"/>
                    <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"/>
                    <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"/>
                    <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"/>
                  </svg>
                  <span class="text-sm font-semibold leading-6">Google</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img
            class="absolute inset-0 h-full w-full object-cover"
            src="~/assets/img/auth/bg.jpg"
            alt=""
        />
      </div>
    </div>
  </div>
</template>
