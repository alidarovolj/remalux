<script setup></script>

<template>
  <div class="flex flex-col justify-center items-center py-32">
    <img
        alt=""
        class="w-full md:w-1/3"
        src="@/assets/img/search.png">
    <p class="text-sm md:text-xl">
      {{ $t('no_results.title') }}
    </p>
  </div>
</template>