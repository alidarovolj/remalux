<script setup>

</script>

<template>
  <div
      class="w-full bg-white rounded-md mt-28 px-4 py-3"
      style="box-shadow: 7px 7px 20px 0px #0000000D"
  >
    <img
        class="w-2/3 mx-auto -mt-20 mb-4"
        src="~/assets/img/mainPage/paint.png"
        alt="">
    <p class="text-[#191919] mb-4">
      Краска по металлу и дереву
    </p>
    <p class="text-[10px] mb-4">
      0553007
    </p>
    <div class="flex justify-between">
      <div>
        <p class="text-[#B0B0B0] text-[10px]">
          3 850 ₸
        </p>
        <p class="font-semibold">
          2 730₸
        </p>
      </div>
      <NuxtLink
          to="/"
          class="bg-mainColor text-white px-3 rounded-md flex items-center"
      >
        В корзину
      </NuxtLink>
    </div>
  </div>
</template>