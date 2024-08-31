<script setup>
import { ref, onMounted } from 'vue';
import Slider from '@vueform/slider';
import { ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useProductsStore } from "~/stores/products.js";

const value = ref([1000, 100000]); // Default slider values
const route = useRoute();
const router = useRouter();
const products = useProductsStore();

// Function to update query parameters with the selected price range
const updateQueryWithPrices = async () => {
  const currentQuery = { ...route.query };

  // Update or add the price range to the query parameters using array-like syntax
  currentQuery['prices[0]'] = value.value[0];
  currentQuery['prices[1]'] = value.value[1];

  // Navigate to the same route with updated query parameters
  await router.push({ query: currentQuery });
  await products.getVariantsList();
};

// On component mount, check for existing price range in query parameters
onMounted(() => {
  const minPrice = route.query['prices[0]'];
  const maxPrice = route.query['prices[1]'];

  // Set slider values if prices are present in the query parameters
  if (minPrice && maxPrice) {
    value.value = [parseInt(minPrice), parseInt(maxPrice)];
  }
});
</script>

<template>
  <div class="py-6">
    
    <div class="flex justify-between mb-4 px-4">
      <div class="w-4/5 flex gap-4 items-center">
        <input
            v-model="value[0]"
            type="text"
            class="block w-full border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        />
        <div class="border-t border-[#7B7B7B] w-4 h-0"></div>
        <input
            v-model="value[1]"
            type="text"
            class="block w-full border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        />
      </div>
      <div class="w-1/5 flex justify-end">
        <div
            @click="updateQueryWithPrices"
            class="w-10 h-10 text-mainColor hover:bg-mainColor hover:text-white cursor-pointer transition-all p-2 flex items-center justify-center border border-mainColor rounded-full"
        >
          <ChevronRightIcon class="w-8 h-8"/>
        </div>
      </div>
    </div>
    <div class="px-4">
      <Slider
          v-model="value"
          :min="0"
          :max="100000"
          :tooltips="false"
          :classes="{
          target: 'relative box-border select-none touch-none tap-highlight-transparent touch-callout-none disabled:cursor-not-allowed',
          focused: 'slider-focused',
          tooltipFocus: 'slider-tooltip-focus',
          tooltipDrag: 'slider-tooltip-drag',
          ltr: 'slider-ltr',
          rtl: 'slider-rtl',
          horizontal: 'slider-horizontal h-1.5',
          vertical: 'slider-vertical w-1.5 h-80',
          textDirectionRtl: 'slider-txt-rtl',
          textDirectionLtr: 'slider-txt-ltr',
          base: 'w-full h-full relative z-1 bg-gray-300 rounded',
          connects: 'w-full h-full relative overflow-hidden z-0 rounded',
          connect: 'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-mainColor cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-[#7B7B7B] disabled:cursor-not-allowed',
          origin: 'slider-origin absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full h:h-0 v:-top-full txt-rtl-h:left-0 txt-rtl-h:right-auto v:w-0 tap:duration-300 tap:transition-transform',
          handle: 'absolute rounded-full bg-white border-0 shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-top-2 v:-right-1.25 disabled:cursor-not-allowed focus:ring focus:ring-mainColor focus:ring-opacity-30',
          handleLower: 'slider-hande-lower',
          handleUpper: 'slider-hande-upper',
          touchArea: 'h-full w-full',
          tooltipTop: 'bottom-6 h:arrow-bottom merge-h:bottom-3.5',
          tooltipBottom: 'top-6 h:arrow-top merge-h:top-5',
          tooltipLeft: 'right-6 v:arrow-right merge-v:right-1',
          tooltipRight: 'left-6 v:arrow-left merge-v:left-7',
          tooltipHidden: 'slider-tooltip-hidden',
          active: 'slider-active shadow-slider-active cursor-grabbing',
          draggable: 'cursor-ew-resize v:cursor-ns-resize',
          tap: 'slider-state-tap',
          drag: 'slider-state-drag',
        }"
      />
    </div>
  </div>
</template>
