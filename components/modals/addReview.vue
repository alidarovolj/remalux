<script setup>
import {useNotificationStore} from "~/stores/notifications.js";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import UploadImage from "~/components/general/uploadImage.vue";
import {ref, nextTick, onMounted} from "vue";
import {HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/vue/24/outline/index.js";

const notifications = useNotificationStore();
const modals = useModalsStore();
const route = useRoute();
const products = useProductsStore();
const user = useUserStore();

const loading = ref(false);

const form = ref({
  rating: null,
  comment: "",
  is_recommend: null,
  image_url: "",
});

const hoverRating = ref(0);

const v$ = useVuelidate({
  rating: {required},
  comment: {required},
  is_recommend: {required}
}, form);

const createReview = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    if (user.userProfile) {
      const response = await api(`/api/products/${modals.modal.modalData}/reviews`, "POST", {
        body: JSON.stringify(form.value)
      }, route.query);

      notifications.showNotification("success", "Успешно", "Ваш отзыв отправлен на модерацию");
      await nextTick();
      modals.modal.show = false;
      loading.value = false;
      await products.getDetailProduct(modals.modal.modalData);
    } else {
      notifications.showNotification("error", "Ошибка", "Для отправки отзыва необходимо авторизоваться");
      loading.value = false;
      modals.modal.show = false;
    }
  } catch (e) {
    notifications.showNotification("error", "Произошла ошибка", e);
  }
};

const setRating = (value) => {
  form.value.rating = value;
};

const setHoverRating = (value) => {
  hoverRating.value = value;
};

const resetHoverRating = () => {
  hoverRating.value = form.value.rating;
};
</script>

<template>
  <div>
    <p class="text-xl font-semibold mb-6">
      {{ $t('products.create_review.title') }}
    </p>
    <form
        class="flex flex-col gap-3"
        @submit.prevent="createReview">
      <p>
        Ваш отзыв поможет нам улучшить сервис и повысить уровень вашей удвелитворенности в будущем. Спасибо за отзыв!
      </p>
      <textarea
          v-model="form.comment"
          :class="{'border border-red-500': v$.comment.$error}"
          class="w-full p-4 border border-gray-300 rounded-md"
          placeholder="Напишите свой отзыв о продукте"
      />
      <div class="flex gap-4">
        <p :class="{'text-red-500' : v$.is_recommend.$error}">
          Понравился товар?
        </p>
        <div class="flex gap-3 items-center">
          <HandThumbUpIcon
              @click="form.is_recommend = 1"
              class="w-5 h-5 cursor-pointer transition-all hover:text-green-500"
              :class="{ 'text-green-500' : form.is_recommend === 1 }"
          />
        </div>
        <div class="flex gap-3 items-center">
          <HandThumbDownIcon
              @click="form.is_recommend = 0"
              class="w-5 h-5 cursor-pointer transition-all hover:text-red-500"
              :class="{ 'text-red-500' : form.is_recommend === 0 }"
          />
        </div>
      </div>
      <div class="flex gap-1 justify-center">
        <svg
            v-for="(item, index) in 5"
            :key="index"
            class="size-9 transition-all cursor-pointer text-gray-200"
            :class="[{'!text-[#FFE814]': index < hoverRating}, {'!text-red-500': v$.rating.$error}]"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            @mouseover="setHoverRating(index + 1)"
            @mouseleave="resetHoverRating"
            @click="setRating(index + 1)"
        >
          <path
              clip-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              fill-rule="evenodd"
          />
        </svg>
      </div>
      <UploadImage type="reviews" @photoUploaded="(image) => console.log(image)"/>
      <button
          v-if="!loading"
          type="submit"
          class="bg-mainColor text-white py-2 px-4 rounded-md text-center w-full">
        {{ $t('addresses.create.button') }}
      </button>
      <p
          v-else
          class="bg-mainColor text-white py-2 px-4 rounded-md text-center w-full"
      >
        <span class="spinner"></span>
      </p>
    </form>
  </div>
</template>
