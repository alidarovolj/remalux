<script setup>
import { vMaska } from "maska/vue";
import { useLocalePath } from "#i18n";
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import { ShieldCheckIcon } from "@heroicons/vue/24/outline/index.js";
import { useVuelidate } from "@vuelidate/core";
import { email, required, sameAs } from "@vuelidate/validators";
import { useUserStore } from "~/stores/user.js";
import Counter from "~/components/general/counter.vue";

const localePath = useLocalePath();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const notifications = useNotificationStore();
const modals = useModalsStore();
const loading = ref(false);
const addresses = useAddressesStore();
const user = useUserStore();

const checkPhone = async (e) => {
  if (e.target.value.length === 18) {
    await user.checkPhone(e.target.value);
  }
};

const checkEmail = async (e) => {
  if (e.target.value.includes("@")) {
    await user.checkEmail(e.target.value);
  }
};

const links = computed(() => [
  { title: t("breadcrumbs.home"), link: localePath("/") },
  { title: t("breadcrumbs.partnership"), link: localePath("/partnership") },
]);

const form = ref({
  name: "",
  phone_number: "",
  bin: "",
  city_id: null,
  email: "",
  agreement: false,
});

const v$ = useVuelidate(
  {
    name: { required },
    phone_number: { required },
    bin: { required },
    city_id: { required },
    email: { required, email },
    agreement: { sameAs: sameAs(true) },
  },
  form
);

const sendForm = async () => {
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification(
      "error",
      t("notifications.error_title"),
      t("notifications.error_message")
    );
    loading.value = false;
    return;
  }

  try {
    const response = await api(
      `/api/partners`,
      "POST",
      {
        body: JSON.stringify(form.value),
      },
      route.query
    );

    console.log(response);

    notifications.showNotification(
      "success",
      t("notifications.success_title"),
      t("notifications.success_message")
    );
    loading.value = false;
  } catch (e) {
    notifications.showNotification("error", t("notifications.error_title"), e);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await nextTick();
  await addresses.getCities();
});
</script>

<template>
  <div class="bg-white">
    <main class="isolate">
      <!-- Hero section -->
      <Breadcrumbs :links="links" />

      <div class="relative isolate -z-10">
        <svg
          class="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              stroke-width="0"
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            stroke-width="0"
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div
          class="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style="
              clip-path: polygon(
                63.1% 29.5%,
                100% 17.1%,
                76.6% 3%,
                48.4% 0%,
                44.6% 4.7%,
                54.5% 25.3%,
                59.8% 49%,
                55.2% 57.8%,
                44.4% 57.2%,
                27.8% 47.9%,
                35.1% 81.5%,
                0% 97.7%,
                39.2% 100%,
                35.2% 81.4%,
                97.2% 52.8%,
                63.1% 29.5%
              );
            "
          />
        </div>
        <div class="overflow-hidden container mx-auto px-4 md:px-0">
          <div class="mx-auto pb-10 md:pb-32 pt-10 sm:pt-60 lg:pt-32">
            <div
              class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
            >
              <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1
                  data-aos="fade-up"
                  class="text-xl md:text-4xl font-medium font-montserrat tracking-tight text-gray-900 sm:text-[40px]"
                >
                  {{ t("partnership.title") }}
                </h1>
                <p
                  data-aos="fade-up"
                  class="relative my-6 text-sm md:text-xl font-light leading-5 md:leading-8 text-gray-600 sm:max-w-md lg:max-w-none"
                >
                  {{ t("partnership.description") }}
                </p>
                <a
                  data-aos="fade-up"
                  :href="localePath('/partnership/#apply')"
                  class="block w-1/2 py-4 border-2 hover:bg-mainColor hover:text-white transition-all text-center border-mainColor text-mainColor rounded-xl text-sm md:text-xl font-medium"
                >
                  {{ t("partnership.apply_button") }}
                </a>
              </div>
              <div
                class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0"
              >
                <div
                  data-aos="fade-up"
                  class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
                >
                  <div class="relative">
                    <img
                      src="@/assets/img/partnership/1.png"
                      alt=""
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36"
                >
                  <div class="relative">
                    <img
                      src="@/assets/img/partnership/2.png"
                      alt=""
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                  <div class="relative">
                    <img
                      src="@/assets/img/partnership/3.png"
                      alt=""
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                </div>
                <div
                  class="w-44 flex-none space-y-8 pt-32 sm:pt-0"
                  data-aos="fade-up"
                >
                  <div class="relative">
                    <img
                      src="@/assets/img/partnership/4.png"
                      alt=""
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                  <div class="relative">
                    <img
                      src="@/assets/img/partnership/5.png"
                      alt=""
                      class="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                    <div
                      class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center w-full md:w-1/2 mx-auto px-4 md:px-0">
        <h3
          data-aos="fade-up"
          class="text-lg md:text-2xl mb-3 font-semibold font-montserrat text-mainColor"
        >
          {{ t("partnership.history_title") }}
        </h3>
        <p data-aos="fade-up" class="text-sm md:text-base leading-6 mb-10">
          {{ t("partnership.history_description") }}
        </p>
        <!-- component -->
        <div class="min-h-full py-6 flex flex-col justify-center sm:py-12">
          <div class="py-3 sm:mx-auto w-full px-2 sm:px-0">
            <div
              class="relative text-gray-700 antialiased text-sm font-semibold"
            >
              <!-- Vertical bar running through middle -->
              <div
                class="hidden sm:block w-[2px] bg-[#F3F4F6] absolute h-full left-1/2 transform -translate-x-1/2"
              ></div>

              <!-- Left section, set by justify-start and sm:pr-8 -->
              <div class="mt-6 sm:mt-0 sm:mb-12">
                <div class="flex flex-col sm:flex-row items-start">
                  <div
                    class="flex justify-start w-full mx-auto items-center text-right"
                  >
                    <div class="w-full sm:w-1/2 sm:pr-8">
                      <div>
                        <p
                          data-aos="fade-up"
                          class="text-mainColor font-bold text-3xl mb-2"
                        >
                          <Counter :endValue="1990" />
                        </p>
                        <p
                          data-aos="fade-up"
                          class="font-normal text-[#374151] leading-6"
                        >
                          {{ t("partnership.history_1990") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="rounded-full bg-[#6B7280] border-white w-3 h-3 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center"
                  ></div>
                </div>
              </div>

              <!-- Right section, set by justify-end and sm:pl-8 -->
              <div class="mt-6 sm:mt-0 sm:mb-12">
                <div class="flex flex-col sm:flex-row items-start">
                  <div
                    class="flex justify-end w-full mx-auto items-center text-left"
                  >
                    <div class="w-full sm:w-1/2 sm:pl-8">
                      <div>
                        <p
                          data-aos="fade-up"
                          class="text-mainColor font-bold text-3xl mb-2"
                        >
                          <Counter :endValue="1995" />
                        </p>
                        <p
                          data-aos="fade-up"
                          class="font-normal text-[#374151] leading-6"
                        >
                          {{ t("partnership.history_1995") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="rounded-full bg-[#6B7280] border-white w-3 h-3 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center"
                  ></div>
                </div>
              </div>

              <!-- Left section, set by justify-start and sm:pr-8 -->
              <div class="mt-6 sm:mt-0 sm:mb-12">
                <div class="flex flex-col sm:flex-row items-start">
                  <div
                    class="flex justify-start w-full mx-auto items-center text-right"
                  >
                    <div class="w-full sm:w-1/2 sm:pr-8">
                      <div>
                        <p
                          data-aos="fade-up"
                          class="text-mainColor font-bold text-3xl mb-2"
                        >
                          <Counter :endValue="2000" />
                        </p>
                        <p
                          data-aos="fade-up"
                          class="font-normal text-[#374151] leading-6"
                        >
                          {{ t("partnership.history_2000") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="rounded-full bg-[#6B7280] border-white w-3 h-3 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center"
                  ></div>
                </div>
              </div>

              <!-- Right section, set by justify-end and sm:pl-8 -->
              <div class="mt-6 sm:mt-0">
                <div class="flex flex-col sm:flex-row items-start">
                  <div
                    class="flex justify-end w-full mx-auto items-center text-left"
                  >
                    <div class="w-full sm:w-1/2 sm:pl-8">
                      <div>
                        <p
                          data-aos="fade-up"
                          class="text-mainColor font-bold text-3xl mb-2"
                        >
                          <Counter :endValue="2010" />
                        </p>
                        <p
                          data-aos="fade-up"
                          class="font-normal text-[#374151] leading-6"
                        >
                          {{ t("partnership.history_2010") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="rounded-full bg-[#6B7280] border-white w-3 h-3 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center"
                  ></div>
                </div>
              </div>

              <!-- Left section, set by justify-start and sm:pr-8 -->
              <div class="mt-6 sm:mt-0 sm:mb-12">
                <div class="flex flex-col sm:flex-row items-start">
                  <div
                    class="flex justify-start w-full mx-auto items-center text-right"
                  >
                    <div class="w-full sm:w-1/2 sm:pr-8">
                      <div>
                        <p
                          data-aos="fade-up"
                          class="text-mainColor font-bold text-3xl mb-2"
                        >
                          <Counter :endValue="2015" />
                        </p>
                        <p
                          data-aos="fade-up"
                          class="font-normal text-[#374151] leading-6"
                        >
                          {{ t("partnership.history_2015") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="rounded-full bg-[#6B7280] border-white w-3 h-3 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center"
                  ></div>
                </div>
              </div>

              <!-- Right section, set by justify-end and sm:pl-8 -->
              <div class="mt-6 sm:mt-0">
                <div class="flex flex-col sm:flex-row items-start">
                  <div
                    class="flex justify-end w-full mx-auto items-center text-left"
                  >
                    <div class="w-full sm:w-1/2 sm:pl-8">
                      <div>
                        <p
                          data-aos="fade-up"
                          class="text-mainColor font-bold text-3xl mb-2"
                        >
                          <Counter :endValue="2023" />
                        </p>
                        <p
                          data-aos="fade-up"
                          class="font-normal text-[#374151] leading-6"
                        >
                          {{ t("partnership.history_2023") }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="rounded-full bg-[#6B7280] border-white w-3 h-3 absolute left-1/2 -translate-y-4 sm:translate-y-0 transform -translate-x-1/2 flex items-center justify-center"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center w-full md:w-1/2 mx-auto mb-48">
        <h3
          data-aos="fade-up"
          class="text-lg md:text-2xl mb-3 font-semibold font-montserrat text-mainColor"
        >
          {{ t("partnership.branches_title") }}
        </h3>
        <p data-aos="fade-up" class="text-sm md:text-base leading-6 mb-10">
          {{ t("partnership.branches_description") }}
        </p>

        <div
          class="w-full flex flex-col md:flex-row items-start gap-4 px-4 md:px-0"
        >
          <div data-aos="fade-up" class="text-left whitespace-nowrap">
            <p class="text-2xl md:text-5xl text-[#E31E1E] mb-1">
              <Counter :endValue="8000" />
              +
            </p>
            <p class="text-sm md:text-2xl font-semibold">
              {{ t("partnership.clients_label") }}
            </p>
          </div>
          <img
            data-aos="fade-up"
            class="w-full"
            src="@/assets/img/partnership/map.png"
            alt=""
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-8 mb-32" data-aos="fade-up">
        <div class="mb-20 text-center">
          <h2 class="text-lg md:text-3xl font-bold mb-5 font-montserrat">
            {{ t("about_page.why_choose_us.title") }}
          </h2>
          <p
            class="text-sm md:text-base font-medium w-full md:w-1/2 mx-auto leading-5 md:leading-8"
          >
            {{ t("about_page.why_choose_us.description") }}
          </p>
        </div>
        <div
          class="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3"
        >
          <div class="flex items-start gap-5" data-aos="fade-up">
            <div
              class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white"
            >
              <ShieldCheckIcon class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">
                {{ t("about_page.why_choose_us.quality.title") }}
              </h3>
              <p class="text-xs text-[#7B7B7B]">
                {{ t("about_page.why_choose_us.quality.description") }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5" data-aos="fade-up">
            <div
              class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white"
            >
              <ShieldCheckIcon class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">
                {{ t("about_page.why_choose_us.innovation.title") }}
              </h3>
              <p class="text-xs text-[#7B7B7B]">
                {{ t("about_page.why_choose_us.innovation.description") }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5" data-aos="fade-up">
            <div
              class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white"
            >
              <ShieldCheckIcon class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">
                {{ t("about_page.why_choose_us.economy.title") }}
              </h3>
              <p class="text-xs text-[#7B7B7B]">
                {{ t("about_page.why_choose_us.economy.description") }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5" data-aos="fade-up">
            <div
              class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white"
            >
              <ShieldCheckIcon class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">
                {{ t("about_page.why_choose_us.price.title") }}
              </h3>
              <p class="text-xs text-[#7B7B7B]">
                {{ t("about_page.why_choose_us.price.description") }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5" data-aos="fade-up">
            <div
              class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white"
            >
              <ShieldCheckIcon class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">
                {{ t("about_page.why_choose_us.service.title") }}
              </h3>
              <p class="text-xs text-[#7B7B7B]">
                {{ t("about_page.why_choose_us.service.description") }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-5" data-aos="fade-up">
            <div
              class="flex-none w-12 h-12 bg-mainColor rounded flex items-center justify-center text-white"
            >
              <ShieldCheckIcon class="w-6 h-6" />
            </div>
            <div>
              <h3 class="font-bold mb-2 font-montserrat">
                {{ t("about_page.why_choose_us.assortment.title") }}
              </h3>
              <p class="text-xs text-[#7B7B7B]">
                {{ t("about_page.why_choose_us.assortment.description") }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 md:px-0 mb-48">
        <p class="mb-9 text-lg md:text-4xl font-medium">
          {{ t("partnership.statistics_title") }}
        </p>
        <div class="flex flex-col md:flex-row w-full mb-12">
          <div
            data-aos="fade-up"
            style="
              background: linear-gradient(
                90deg,
                #fdcdbf 0%,
                rgba(253, 205, 191, 0) 100%
              );
            "
            class="w-full flex items-center gap-2 md:gap-4 py-2 md:py-5 px-3"
          >
            <p class="text-2xl md:text-5xl">
              <Counter :endValue="15" />
            </p>
            <p class="text-sm md:text-lg font-medium">
              {{ t("partnership.years_in_market_label") }}
            </p>
          </div>
          <div
            data-aos="fade-up"
            style="
              background: linear-gradient(
                90deg,
                #f4ede7 0%,
                rgba(244, 237, 231, 0) 100%
              );
            "
            class="w-full flex items-center gap-2 md:gap-4 py-2 md:py-5 px-3"
          >
            <p class="text-2xl md:text-5xl">
              <Counter :endValue="60" />
              +
            </p>
            <p class="text-sm md:text-lg font-medium">
              {{ t("partnership.employees_label") }}
            </p>
          </div>
          <div
            data-aos="fade-up"
            style="
              background: linear-gradient(
                90deg,
                #dae4a7 0%,
                rgba(218, 228, 167, 0) 100%
              );
            "
            class="w-full flex items-center gap-2 md:gap-4 py-2 md:py-5 px-3"
          >
            <p class="text-2xl md:text-5xl">
              <Counter :endValue="6" />
            </p>
            <p class="text-sm md:text-lg font-medium">
              {{ t("partnership.branches_count_label") }}
            </p>
          </div>
          <div
            data-aos="fade-up"
            style="
              background: linear-gradient(
                90deg,
                #f4ede7 0%,
                rgba(244, 237, 231, 0) 100%
              );
            "
            class="w-full flex items-center gap-2 md:gap-4 py-2 md:py-5 px-3"
          >
            <p class="text-2xl md:text-5xl">
              <Counter :endValue="185" />
            </p>
            <p class="text-sm md:text-lg font-medium">
              {{ t("partnership.unique_projects_label") }}
            </p>
          </div>
          <div
            data-aos="fade-up"
            style="
              background: linear-gradient(
                90deg,
                #fdcdbf 0%,
                rgba(253, 205, 191, 0) 100%
              );
            "
            class="w-full flex items-center gap-2 md:gap-4 py-2 md:py-5 px-3"
          >
            <p class="text-2xl md:text-5xl">
              <Counter :endValue="15" />
            </p>
            <p class="text-sm md:text-lg font-medium">
              {{ t("partnership.years_in_market_label") }}
            </p>
          </div>
        </div>
        <div
          class="grid grid-cols-2 gap-x-4 md:gap-x-0 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5 xl:grid-cols-3"
        >
          <div
            data-aos="fade-up"
            class="w-full block md:flex"
            style="box-shadow: 0px 0px 20px 0px #0000000d"
          >
            <div
              class="bg-[#F4EDE7] rounded md:rounded-r-none rounded-l w-full flex items-end p-5"
            >
              <div>
                <p class="text-lg md:text-2xl font-medium mb-3 font-montserrat">
                  {{ t("partnership.product_paint") }}
                </p>
                <p class="text-xs">
                  {{ t("partnership.product_paint_description") }}
                </p>
              </div>
            </div>
            <img
              class="w-full"
              src="@/assets/img/partnership/products/1.png"
              alt=""
            />
          </div>
          <div
            data-aos="fade-up"
            class="w-full block md:flex"
            style="box-shadow: 0px 0px 20px 0px #0000000d"
          >
            <div
              class="bg-[#FDCDBF] rounded md:rounded-r-none rounded-l w-full flex items-end p-5"
            >
              <div>
                <p class="text-lg md:text-2xl font-medium mb-3 font-montserrat">
                  {{ t("partnership.product_varnish") }}
                </p>
                <p class="text-xs">
                  {{ t("partnership.product_varnish_description") }}
                </p>
              </div>
            </div>
            <img
              class="w-full"
              src="@/assets/img/partnership/products/1.png"
              alt=""
            />
          </div>
          <div
            data-aos="fade-up"
            class="w-full block md:flex"
            style="box-shadow: 0px 0px 20px 0px #0000000d"
          >
            <div
              class="bg-[#DAE4A7] rounded md:rounded-r-none rounded-l w-full flex items-end p-5"
            >
              <div>
                <p class="text-lg md:text-2xl font-medium mb-3 font-montserrat">
                  {{ t("partnership.product_putty") }}
                </p>
                <p class="text-xs">
                  {{ t("partnership.product_putty_description") }}
                </p>
              </div>
            </div>
            <img
              class="w-full"
              src="@/assets/img/partnership/products/1.png"
              alt=""
            />
          </div>
          <div
            data-aos="fade-up"
            class="w-full block md:flex"
            style="box-shadow: 0px 0px 20px 0px #0000000d"
          >
            <div
              class="bg-[#FDCDBF] rounded md:rounded-r-none rounded-l w-full flex items-end p-5"
            >
              <div>
                <p class="text-lg md:text-2xl font-medium mb-3 font-montserrat">
                  {{ t("partnership.product_coating") }}
                </p>
                <p class="text-xs">
                  {{ t("partnership.product_coating_description") }}
                </p>
              </div>
            </div>
            <img
              class="w-full"
              src="@/assets/img/partnership/products/1.png"
              alt=""
            />
          </div>
          <div
            data-aos="fade-up"
            class="w-full block md:flex"
            style="box-shadow: 0px 0px 20px 0px #0000000d"
          >
            <div
              class="bg-[#DAE4A7] rounded md:rounded-r-none rounded-l w-full flex items-end p-5"
            >
              <div>
                <p class="text-lg md:text-2xl font-medium mb-3 font-montserrat">
                  {{ t("partnership.product_enamel") }}
                </p>
                <p class="text-xs">
                  {{ t("partnership.product_enamel_description") }}
                </p>
              </div>
            </div>
            <img
              class="w-full"
              src="@/assets/img/partnership/products/1.png"
              alt=""
            />
          </div>
          <div
            data-aos="fade-up"
            class="w-full block md:flex"
            style="box-shadow: 0px 0px 20px 0px #0000000d"
          >
            <div
              class="bg-[#F4EDE7] rounded md:rounded-r-none rounded-l w-full flex items-end p-5"
            >
              <div>
                <p class="text-lg md:text-2xl font-medium mb-3 font-montserrat">
                  {{ t("partnership.product_glue") }}
                </p>
                <p class="text-xs">
                  {{ t("partnership.product_glue_description") }}
                </p>
              </div>
            </div>
            <img
              class="w-full"
              src="@/assets/img/partnership/products/1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 md:px-0 mb-10 md:mb-24">
        <div
          class="w-full p-8 rounded-[48px] flex flex-col md:flex-row items-center gap-11"
          style="box-shadow: 0px 0px 20px 0px #0000000d"
        >
          <div data-aos="fade-right" class="relative w-full md:w-1/3">
            <img
              class="w-full"
              src="@/assets/img/partnership/phones.png"
              alt=""
            />
          </div>
          <div data-aos="fade-left" class="w-full md:w-2/3">
            <p class="text-lg md:text-3xl font-medium font-montserrat mb-3">
              {{ t("partnership.news_title") }}
            </p>
            <p class="text-sm md:text-lg mb-7">
              {{ t("partnership.news_description") }}
            </p>
            <div class="flex items-center gap-3">
              <img src="@/assets/img/partnership/insta.png" alt="" />
              <a
                href="https://instagram.kz"
                class="text-base md:text-xl font-montserrat font-medium"
              >
                @remalux.kz
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="apply" class="container mx-auto px-4 md:px-0 py-10 md:py-24">
        <div
          class="p-6 rounded-[48px] flex flex-col md:flex-row items-start gap-5"
          style="box-shadow: 0px 0px 20px 0px #0000000d"
        >
          <div data-aos="fade-right" class="w-full">
            <p
              class="text-mainColor text-lg md:text-3xl font-medium font-montserrat mb-4"
            >
              {{ t("partnership.application_form_title") }}
            </p>
            <p class="text-sm md:text-base">
              {{ t("partnership.application_form_description") }}
            </p>
          </div>
          <form
            data-aos="fade-left"
            @submit.prevent="sendForm"
            action=""
            class="w-full flex flex-col gap-6"
          >
            <div class="flex gap-5">
              <input
                v-model="form.name"
                :class="{ '!border-red-500': v$.name.$error }"
                :placeholder="t('forms.name_placeholder')"
                class="w-full text-sm md:text-base p-2 md:p-4 border-b border-[#F0DFDF]"
                type="text"
              />
            </div>
            <div class="flex gap-5">
              <div class="w-full relative">
                <input
                  v-model="form.email"
                  :class="{ '!border-red-500': v$.email.$error }"
                  :placeholder="t('forms.email_placeholder')"
                  class="w-full text-sm md:text-base p-2 md:p-4 border-b border-[#F0DFDF]"
                  type="text"
                  @input="checkEmail"
                />
                <div class="absolute top-full left-0">
                  <div
                    v-if="user.userCheckedEmail !== null"
                    class="text-xs mt-1"
                  >
                    <p v-if="!user.userCheckedEmail" class="text-red-500">
                      {{ t("forms.registration.email_yes") }}
                    </p>
                    <p v-else class="text-green-500">
                      {{ t("forms.registration.email_no") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-5">
              <input
                v-model="form.bin"
                :class="{ '!border-red-500': v$.bin.$error }"
                :placeholder="t('forms.bin_placeholder')"
                class="w-full text-sm md:text-base p-2 md:p-4 border-b border-[#F0DFDF]"
                type="number"
                @input="form.bin = form.bin.toString().slice(0, 12)"
              />
              <div class="w-full relative">
                <input
                  v-model="form.phone_number"
                  data-maska="+7 (###) ###-##-##"
                  v-maska
                  :class="{ '!border-red-500': v$.phone_number.$error }"
                  :placeholder="t('forms.phone_placeholder')"
                  class="w-full text-sm md:text-base p-2 md:p-4 border-b border-[#F0DFDF]"
                  type="text"
                  @input="checkPhone"
                />
                <div
                  class="absolute top-full left-0"
                  v-if="form.phone_number.length === 18"
                >
                  <div class="text-xs mt-1">
                    <p v-if="!user.userCheckedPhone" class="text-red-500">
                      {{ t("forms.registration.phone_yes") }}
                    </p>
                    <p v-else class="text-green-500">
                      {{ t("forms.registration.phone_no") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="addresses.citiesList" class="flex gap-5">
              <select
                id="city"
                v-model="form.city_id"
                :class="{ 'border-red-500': v$.city_id.$error }"
                class="w-full text-sm md:text-base p-2 md:p-4 border-b border-[#F0DFDF]"
                name="city"
              >
                <option :value="null">
                  {{ t("addresses.create.city_placeholder") }}
                </option>
                <option
                  v-for="(city, index) of addresses.citiesList"
                  :key="index"
                  :value="city.id"
                >
                  {{ city.title }}
                </option>
              </select>
            </div>
            <button
              type="submit"
              class="bg-mainColor py-3 text-white rounded-md font-semibold text-sm md:text-lg"
            >
              {{ t("partnership.apply_button") }}
            </button>
            <label
              class="mb-6 w-full flex gap-3 items-center cursor-pointer"
              for="agreement"
            >
              <input
                id="agreement"
                v-model="form.agreement"
                class="w-6 h-6"
                name="agreement"
                type="checkbox"
              />
              <p
                :class="{ '!text-red-500 underline': v$.agreement.$error }"
                class="text-xs md:text-sm"
              >
                {{ t("checkout.third.agreement.text") }}
                <NuxtLink
                  :class="{ '!text-red-500 underline': v$.agreement.$error }"
                  :to="localePath('/')"
                  class="text-blue-500 underline"
                >
                  {{ t("checkout.third.agreement.link") }}
                </NuxtLink>
              </p>
            </label>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
