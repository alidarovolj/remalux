<script setup>
import { useRoute, useRouter } from 'vue-router';
import { defineProps, ref, onMounted, watch, nextTick, computed } from 'vue';

const props = defineProps(['metaData']);
const emit = defineEmits(['updatePage']);
const route = useRoute();
const router = useRouter();

const form = ref({
  per_page: Number(route.query.perPage) || 10, // Ensure this starts as a number
  page: Number(route.query.page) || 1
});

const loading = ref(false); // Flag to control the spinner and request
let lastPerPage = form.value.per_page; // Track the last known perPage value

// Computed property to determine the maximum per_page value
const maxPerPage = computed(() => props.metaData.total);

const updateQueryParams = async () => {
  if (loading.value) return; // Prevents multiple requests
  loading.value = true; // Show spinner

  // Ensure per_page does not exceed maxPerPage
  form.value.per_page = Math.min(form.value.per_page, maxPerPage.value);

  await router.push({ query: { ...route.query, page: form.value.page, perPage: form.value.per_page } });
  emit('updatePage', { page: form.value.page, perPage: form.value.per_page });

  loading.value = false; // Hide spinner after the request
};

// Watch for changes in per_page and reset lastPerPage if needed
watch(() => form.value.per_page, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log(`per_page changed from ${oldVal} to ${newVal}`);
    lastPerPage = newVal; // Update last known value
    await updateQueryParams(); // Ensure that the query params are updated when per_page changes
  }
});

// Watch for changes in route.query.perPage and update form.per_page
watch(() => route.query.perPage, (newVal) => {
  if (newVal) {
    form.value.per_page = Number(newVal);
    lastPerPage = form.value.per_page; // Update last known value
  }
});

const observer = ref(null);

onMounted(async () => {
  await nextTick(); // Wait for the DOM to be fully rendered
  const anchorElement = document.querySelector('#scroll-anchor');

  if (anchorElement) {
    observer.value = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && !loading.value) {
        form.value.per_page = Math.min(lastPerPage + 10, maxPerPage.value); // Explicitly increase by 10 each time, respecting maxPerPage
        // Debugging output (optional)
        console.log('New per_page:', form.value.per_page);
        await updateQueryParams(); // Fetch new data
      }
    });

    observer.value.observe(anchorElement); // Observe the spinner or a designated element
  } else {
    console.error('Anchor element not found.');
  }
});
</script>

<template>
  <div class="overflow-auto border-t border-gray-200 bg-white py-20 mt-10">

    <!-- Spinner for loading indication -->
    <div v-if="loading" class="flex justify-center items-center py-4">
      <svg class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>

    <!-- Your content goes here, e.g., list items -->
    <div>
      <p class="font-medium">Показывается {{ route.query.perPage }} из {{ metaData.total }} элементов</p>
    </div>


    <!-- Scroll anchor for IntersectionObserver -->
    <div id="scroll-anchor" class="h-1"></div>
  </div>
</template>