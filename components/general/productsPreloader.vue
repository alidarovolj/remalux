<script setup></script>

<template>
  <div
      class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3 mt-10">
    <div
        v-for="(_, index) of 6"
        :key="index"
        class="set_shadow p-4 bg-white"
    >
      <div class="w-2/3 skeleton h-[212px] mx-auto mb-12"></div>
      <div class="w-full h-4 skeleton mb-3"></div>
      <div class="w-2/3 h-4 skeleton mb-3"></div>
      <div class="w-full h-8 skeleton mb-3"></div>
    </div>
  </div>
</template>