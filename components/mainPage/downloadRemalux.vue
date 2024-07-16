<script setup>

</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 mb-36">
    <div class="rounded-xl relative flex flex-col md:flex-row">
      <img
          class="w-full h-full absolute rounded-xl object-cover object-right-bottom"
          src="~/assets/img/bg-app.jpg"
          alt="">
      <div
          class="w-full md:w-1/2 py-14 px-4 md:px-9 rounded-xl relative z-10"
          style="background: linear-gradient(90deg, #C37F7F 72.63%, rgba(115, 115, 115, 0) 100%);">
        <h2 class="text-3xl font-bold text-white mb-5">
          {{ $t('mainPage.download_remalux.title') }}
        </h2>
        <p class="font-medium text-white mb-9">
          {{ $t('mainPage.download_remalux.description') }}
        </p>
        <div class="flex gap-3 md:gap-7">
          <img
              class="w-auto h-12"
              src="~/assets/img/apple.png"
              alt="">
          <img
              class="w-auto h-12"
              src="~/assets/img/android.png"
              alt="">
        </div>
      </div>
    </div>
  </div>
</template>