<script setup>
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/20/solid';
import {useRoute, useRouter} from 'vue-router';
import {computed, defineProps, onMounted, ref, watch} from 'vue';

const props = defineProps(['metaData']);
const emit = defineEmits(['updatePage']);
const route = useRoute();
const router = useRouter();

const form = ref({
  per_page: route.query.perPage || 10,
  page: route.query.page || 1
});

const pageNumbers = computed(() =>
    props.metaData.links.filter(link => !isNaN(link.label))
);

const updateQueryParams = async (page, perPage) => {
  await router.push({query: {...route.query, page, perPage}});
  emit('updatePage', {page, perPage});
};

onMounted(() => {
  updateQueryParams(form.value.page, form.value.per_page);
});

watch(form, async () => {
  await updateQueryParams(form.value.page, form.value.per_page);
}, {deep: true});

const setPage = (page) => {
  form.value.page = page;
};
</script>

<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white py-3 mt-10">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click.prevent="setPage(metaData.current_page - 1)"
          v-if="metaData.current_page > 1"
      >
        {{ $t('pagination.prev') }}
      </a>
      <a
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click.prevent="setPage(metaData.current_page + 1)"
          v-if="metaData.current_page < metaData.last_page"
      >
        {{ $t('pagination.next') }}
      </a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div class="flex items-center gap-5">
        <div>
          <select
              v-model="form.per_page"
              id="perPage"
              name="perPage"
              class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div>
          <p class="text-sm text-gray-700">
            {{ $t('pagination.show_by.text') }}
            {{ ' ' }}
            <span class="font-medium">{{ metaData.total }}</span>
            {{ ' ' }}
            {{ $t('pagination.show_by.items') }}
          </p>
        </div>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
              @click="setPage(metaData.current_page - 1)"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              :disabled="metaData.current_page <= 1"
          >
            <span class="sr-only">{{ $t('pagination.prev') }}</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true"/>
          </button>
          <p
              v-for="(item, index) in pageNumbers"
              :key="index"
              @click="setPage(parseInt(item.label))"
              :class="{ 'z-10 bg-mainColor text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor' : metaData.current_page === parseInt(item.label) }"
              class="relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
          >
            {{ item.label }}
          </p>
          <button
              @click="setPage(metaData.current_page + 1)"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              :disabled="metaData.current_page >= metaData.last_page"
          >
            <span class="sr-only">{{ $t('pagination.next') }}</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true"/>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>