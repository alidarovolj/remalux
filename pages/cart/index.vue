<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useCartStore} from "~/stores/cart.js";
import {storeToRefs} from "pinia";
import {PlusIcon} from "@heroicons/vue/24/outline"
import {useLanguagesStore} from "~/stores/languages.js";
import {MinusIcon, TrashIcon} from "@heroicons/vue/24/outline/index.js";
import NoResults from "~/components/general/noResults.vue";
import {useNotificationStore} from "~/stores/notifications.js";

const {t} = useI18n();
const localePath = useLocalePath();
const notifications = useNotificationStore()
const cart = useCartStore()
const {cartList} = storeToRefs(cart);
const language = useLanguagesStore()
const {cur_lang} = storeToRefs(language);

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.cart'), link: localePath('/cart')},
]);

const editForm = ref({
  quantity: null
})

const editQuantity = async (id, quantity) => {
  editForm.value.quantity = quantity
  if (editForm.value.quantity === 0) {
    notifications.showNotification('error', 'Редактирование не удалось', 'Кол-во не может ровняться 0 или меньше')
    editForm.value.quantity = null
    return
  }
  await cart.editItem(id, editForm.value)
  await cart.getCart()
  editForm.value.quantity = null
}

const removeLocal = async (id) => {
  await cart.removeItem(id)
  await cart.getCart()
}

const removeCartLocal = async () => {
  await cart.removeCart()
  await cart.getCart()
}

onMounted(async () => {
  await nextTick()
  await cart.getCart()
})
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <div class="container mx-auto px-4 md:px-0">
      <div class="pt-12 pb-32">
        <div class="flex justify-between">
          <h1 class="text-3xl mb-8 font-semibold">
            {{ t('cart.title') }}: <span v-if="cartList">{{ cartList.data.length }}</span>
          </h1>
          <div v-if="cartList">
            <div
                v-if="cartList.data.length > 0"
                @click="removeCartLocal"
                class="flex items-center text-mainColor gap-2">
              <TrashIcon class="w-7 h-7"/>
              <p class="font-semibold">
                {{ t('cart.clear') }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8 flow-root">
          <div
              v-if="cartList"
              class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
                v-if="cartList.data.length > 0"
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 mb-8 overflow-x-auto">
              <table
                  class="min-w-full divide-y divide-gray-300">
                <thead class="bg-[#FAFAFA]">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left  font-semibold text-gray-900">
                    {{ t('cart.table.product') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left  font-semibold text-gray-900">
                    {{ t('cart.table.color') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left  font-semibold text-gray-900">
                    {{ t('cart.table.weight') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left  font-semibold text-gray-900">
                    {{ t('cart.table.quantity') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left  font-semibold text-gray-900">
                    {{ t('cart.table.price') }}
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left  font-semibold text-gray-900">
                    {{ t('cart.table.total') }}
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                    v-for="(item, index) in cartList.data"
                    :key="index">
                  <td class="whitespace-nowrap py-5 pl-4 pr-3  sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-24 w-24 flex-shrink-0">
                        <img
                            class="h-24 w-24 rounded-full object-cover"
                            :src="item.product_image"
                            alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ item.product_title[cur_lang] }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5  ">
                    <div
                        v-if="item.color_id"
                        class="text-gray-900">
                      {{ item.color_id }}
                    </div>
                    <div class="border-2 border-mainColor w-max p-3 text-mainColor border-dashed cursor-pointer">
                      <PlusIcon class="w-5 h-5"/>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5">
                    <div class="text-gray-900">
                      {{ item.product_variant.value }}{{ $t('products.details.kg') }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5  ">
                    <div class="text-mainColor flex gap-7">
                      <button
                          @click="editQuantity(item.id, item.quantity - 1)"
                          class="border border-[#F0DFDF] rounded-full w-7 h-7 flex items-center justify-center hover:bg-[#F0DFDF] transition-all">
                        <MinusIcon class="w-5 h-5"/>
                      </button>
                      <p class=" text-xl">
                        {{ item.quantity }}
                      </p>
                      <button
                          @click="editQuantity(item.id, item.quantity + 1)"
                          class="border border-[#F0DFDF] rounded-full w-7 h-7 flex items-center justify-center hover:bg-[#F0DFDF] transition-all">
                        <PlusIcon class="w-5 h-5"/>
                      </button>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5  ">
                    <div class="text-gray-900">
                      {{ item.product_variant.price }}₸
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 font-semibold ">
                    {{ item.price }}₸
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 font-semibold ">
                    <TrashIcon
                        @click="removeLocal(item.id)"
                        class="w-6 h-6 text-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <NoResults v-else/>
          </div>
          <div
              v-else
              class="border rounded-lg p-2">
            <div
                v-for="(_, index) of 10"
                :key="index">
              <div class="flex justify-between mb-3 border p-2 rounded-lg gap-3">
                <div
                    class="skeleton w-10 h-4"
                    :class="{ 'bg-[#989898]' : index === 0 }"
                ></div>
                <div
                    :class="{ 'bg-[#989898]' : index === 0 }"
                    class="skeleton w-20 h-4"></div>
                <div
                    :class="{ 'bg-[#989898]' : index === 0 }"
                    class="skeleton w-32 h-4"></div>
                <div
                    :class="{ 'bg-[#989898]' : index === 0 }"
                    class="skeleton w-1/2 h-4"></div>
                <div
                    :class="{ 'bg-[#989898]' : index === 0 }"
                    class="skeleton w-1/2 h-4"></div>
                <div
                    :class="{ 'bg-[#989898]' : index === 0 }"
                    class="skeleton w-20 h-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="cartList">
          <div
              v-if="cartList.data.length > 0"
              class="bg-[#FAFAFA] py-5 px-6 rounded-lg set_shadow">
            <p class="text-mainColor text-2xl font-semibold border-b border-[#F0DFDF] pb-3 mb-4">
              {{ $t('cart.checkout.title') }}
            </p>
            <div class="flex flex-col md:flex-row justify-between">
              <div class="w-full md:w-1/3">
                <p class="text-xl mb-3 font-semibold">
                  {{ $t('cart.checkout.coupon_title') }}
                </p>
                <p class="mb-8">
                  {{ $t('cart.checkout.coupon_text') }}
                </p>
                <div class="flex flex-col md:flex-row justify-between gap-5 mb-10 md:mb-0">
                  <input
                      type="text"
                      :placeholder="$t('cart.checkout.coupon_placeholder')"
                      class="w-full px-4 border-b border-[#F0DFDF] bg-[#FAFAFA]">
                  <button
                      class="w-full border border-mainColor text-mainColor px-6 py-2 rounded-lg text-lg font-semibold">
                    {{ $t('cart.checkout.coupon_button') }}
                  </button>
                </div>
              </div>
              <div class="w-full md:w-1/3 flex flex-col justify-between">
                <div class="border-b border-[#F0DFDF] flex items-center justify-between py-3">
                  <p>{{ $t('cart.checkout.summary') }}</p>
                  <p>42 000 ₸</p>
                </div>
                <div class="border-b border-[#F0DFDF] flex items-center justify-between py-3">
                  <p>{{ $t('cart.checkout.total') }}</p>
                  <p class="text-xl font-bold">42 000 ₸</p>
                </div>
                <NuxtLink
                    :to="localePath('/cart/checkout')"
                    class="w-full bg-mainColor text-white px-6 py-2 rounded-lg text-lg font-semibold text-center">
                  {{ $t('cart.checkout.checkout_button') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>