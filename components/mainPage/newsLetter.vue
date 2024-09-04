<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import {email, required, sameAs} from "@vuelidate/validators";
import {useNotificationStore} from "~/stores/notifications";

const loading = ref(false);
const notifications = useNotificationStore()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const form = ref({
  email: "",
  agreement: false,
})

const v$ = useVuelidate({
  email: {required, email},
  agreement: {sameAs: sameAs(true)}
}, form);

const subscribeUser = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

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

  loading.value = false;
}
</script>

<template>
  <div class="bg-[#FFF3F3] py-10">
    <div class="container mx-auto px-4 md:px-0">
      <div class="flex justify-center items-center">
        <div class="w-full md:w-[70%] flex flex-col md:flex-row items-center gap-10">
          <img
              data-aos="fade-right"
              class="w-1/2 md:w-1/3"
              src="@/assets/img/newsletter.png"
              alt="">
          <div
              data-aos="fade-left"
              class="flex flex-col gap-5">
            <h3 class="text-2xl font-medium font-montserrat leading-9">
              {{ $t('newsletter.title') }}
            </h3>
            <p class="font-light">
              {{ $t('newsletter.description') }}
            </p>
            <form
                @submit.prevent="subscribeUser"
                class="flex flex-col gap-3">
              <div class="w-full flex gap-5">
                <input
                    v-model="form.email"
                    :class="{'border-red-500': v$.$dirty && v$.email.$error}"
                    :placeholder="$t('newsletter.placeholder')"
                    class="w-full bg-white rounded p-4 border border-[#F0DFDF]" type="text">
                <button
                    type="submit"
                    class="bg-mainColor text-sm md:text-base w-max whitespace-nowrap px-4 md:px-12 text-white rounded">
                  {{ $t('newsletter.button') }}
                </button>
              </div>
              <label class="flex items-center gap-3">
                <input
                    v-model="form.agreement"
                    class="w-6 h-6"
                    type="checkbox">
                <p :class="{'outline-red-500': v$.$dirty && v$.agreement.$error}">
                  {{ $t('newsletter.agreement.first') }} <a class="text-mainColor" href="#">{{ $t('newsletter.agreement.second') }}</a>
                </p>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
