<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {PhotoIcon} from "@heroicons/vue/24/outline"
import {useNotificationStore} from "@/stores/notifications.js";

const fileInput = ref(null);
const isLoading = ref(false);
const emit = defineEmits(['photoUploaded']);
const props = defineProps(['type', 'preview_image']);
const previewImage = ref(null);
const notifications = useNotificationStore()

const uploadPhoto = async () => {
  const file = fileInput.value.files[0];
  if (!file) return;

  isLoading.value = true;
  const formData = new FormData();
  formData.append('image', file);
  formData.append('type', props.type);

  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    });
    previewImage.value = response.data.image_url
    emit('photoUploaded', response.data.image_url);
  } catch (error) {
    notifications.showNotification("error", "Произошла ошибка", "Файл слишком велик или не является изображением");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <label
      for="fileUpload"
      class="relative text-xs block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    <div class="relative z-10">
      <PhotoIcon class="w-12 h-12 text-gray-400 mx-auto"/>
      <p class="block font-medium text-gray-900 mb-2">
        Загрузите фотографию
      </p>
      <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          accept="image/jpeg, image/png, image/jpg"
          ref="fileInput"
          @change="uploadPhoto"
      />
    </div>
    <img
        v-if="preview_image && !previewImage"
        :src="preview_image"
        class="w-full h-full absolute left-0 top-0 rounded-lg opacity-30 object-contain py-4"
    />
    <img
        v-if="previewImage"
        :src="previewImage"
        class="w-full h-full absolute left-0 top-0 rounded-lg opacity-30 object-contain py-4"
    />
    <div v-if="isLoading"
         class="absolute bg-black opacity-90 w-full h-full rounded-lg top-0 left-0 flex items-center justify-center">
      <div class="flex flex-col gap-3">
        <div class="spinner"></div>
        <div class="preloader">
          Загрузка...
        </div>
      </div>
    </div>
  </label>
</template>

<style scoped>
.preloader {
  color: gray;
  font-size: 12px;
}
</style>