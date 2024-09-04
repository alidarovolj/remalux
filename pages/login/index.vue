<script setup>
import {vMaska} from "maska/vue"
import {useVuelidate} from "@vuelidate/core"
import {required} from "@vuelidate/validators"
import {useNotificationStore} from "~/stores/notifications.js";
import img1 from "assets/img/auth/slide1.jpg";
import img2 from "assets/img/auth/slide2.jpg";
import img3 from "assets/img/auth/slide3.jpg";
import {useAuthStore} from "~/stores/auth.js";
import {useUserStore} from "~/stores/user.js";
import {useColorsStore} from "~/stores/colors.js";

const loading = ref(false);
const notifications = useNotificationStore()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const auth = useAuthStore()
const user = useUserStore()
const cart = useCartStore()
const colors = useColorsStore()
const {t} = useI18n()

const form = ref({
  phone_number: '',
  password: '',
})

const v$ = useVuelidate({
  phone_number: {required, minLength: 11},
  password: {required}
}, form);

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

const loginUser = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    const response = await api(`/api/auth/login`, "POST", {
      body: JSON.stringify(form.value)
    }, route.query);

    await auth.initCookieToken(response.access_token);
    auth.token = response.access_token;
    notifications.showNotification("success", "Успешно", "Вы успешно авторизовались");
    await nextTick()
    await user.getProfile()
    await cart.getCart()
    await colors.getFavouriteColors()
    await router.push(localePath('/'))
  } catch (e) {
    notifications.showNotification("error", "Произошла ошибка", e);
  }

}

useHead({
  title: t("headers.login.title"),
  meta: [
    {
      property: "description",
      content: t("headers.login.description"),
    },
    {
      property: "og:description",
      content: t("headers.login.description"),
    },
    {
      property: "og:title",
      content: t("headers.login.title"),
    },
    {
      property: "og:url",
      content: t("headers.login.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.login.canonical")}],
});
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0">
    <div class="flex flex-1 items-center py-10">
      <div class="w-max flex flex-1 flex-col justify-center px-4 sm:pr-6 lg:flex-none lg:pr-20 xl:pr-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 class="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {{ $t('forms.login.title') }}
            </h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
              {{ $t('forms.login.yet_account') }}
              {{ ' ' }}
              <NuxtLink
                  :to="localePath('/registration')"
                  class="font-semibold text-mainColor">
                {{ $t('forms.login.please_register') }}
              </NuxtLink>
            </p>
          </div>

          <div class="mt-10">
            <div>
              <form
                  action=""
                  class="space-y-6 text-base"
                  @submit.prevent="loginUser">

                <div
                    :class="{ '!border !border-red-500 rounded-md': v$.phone_number.$error }"
                    class="border-b border-[#F0DFDF]">
                  <input
                      id="phone_number"
                      v-model="form.phone_number"
                      v-maska
                      class="block w-full border-0 p-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      data-maska="+7 ### - ### - ## - ##"
                      name="phone_number"
                      :placeholder="$t('forms.phone_number.title')"
                      type="text"
                  />
                </div>

                <div
                    :class="{ '!border !border-red-500 rounded-md': v$.password.$error }"
                    class="border-b border-[#F0DFDF]">
                  <input
                      id="password"
                      v-model="form.password"
                      class="block w-full border-0 p-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      name="password"
                      placeholder="********"
                      type="password"
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" class="h-4 w-4 rounded border-gray-300 text-mainColor focus:ring-mainColor" name="remember-me"
                           type="checkbox"/>
                    <label class="ml-3 block text-sm leading-6 text-gray-700" for="remember-me">
                      {{ $t('forms.remember_me') }}
                    </label>
                  </div>

                  <div class="text-sm leading-6">
                    <NuxtLink
                        :to="localePath('/forgot-password')"
                        class="font-semibold text-mainColor">
                      {{ $t('forms.forgot_pass') }}
                    </NuxtLink>
                  </div>
                </div>

                <div>
                  <button class="flex w-full justify-center rounded-md bg-mainColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor"
                          type="submit">
                    {{ $t('forms.login.button') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full relative hidden md:block auth h-[500px]">
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
