<script setup>

const props = defineProps(["links"]);
const route = useRoute();

const localePath = useLocalePath();
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex bg-[#F6F6F6] py-2">
    <div class="container mx-auto px-4 lg:px-0">
      <ol class="flex items-center space-x-4" role="list">
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
                  :aria-current="route.path === localePath(item.link) ? 'page' : undefined"
                  :class="[
                    { '!ml-0' : index === 0 },
                    { '!text-mainColor' : route.path === localePath(item.link) }
                 ]"
                  :to="localePath(item.link)"
                  class="ml-4 text-sm text-[#7B7B7B]">
                {{ item.title }}
              </NuxtLink>
            </ClientOnly>
          </div>
        </li>
      </ol>
    </div>
  </nav>
</template>