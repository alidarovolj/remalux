<script setup>

const props = defineProps(["links"]);
const route = useRoute();

const localePath = useLocalePath();
</script>

<template>
  <nav class="flex bg-[#F6F6F6] py-2" aria-label="Breadcrumb">
    <div class="container mx-auto px-4 lg:px-0">
      <ol role="list" class="flex items-center space-x-4">
        <li
            v-for="(item, index) of links"
            :key="index">
          <div class="flex items-center">
            <p
                v-if="index !== 0"
                class="text-[#7B7B7B]">
              /
            </p>
            <ClientOnly>
              <NuxtLink
                  :to="localePath(item.link)"
                  class="ml-4 text-sm text-[#7B7B7B]"
                  :class="[
                    { '!ml-0' : index === 0 },
                    { '!text-mainColor' : route.path === localePath(item.link) }
                 ]"
                  :aria-current="route.path === localePath(item.link) ? 'page' : undefined">
                {{ item.title }}
              </NuxtLink>
            </ClientOnly>
          </div>
        </li>
      </ol>
    </div>
  </nav>
</template>