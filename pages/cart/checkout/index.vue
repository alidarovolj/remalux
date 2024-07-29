<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {HomeModernIcon, TruckIcon, CreditCardIcon, CircleStackIcon} from "@heroicons/vue/24/outline"
import {useCartStore} from "~/stores/cart.js";
import {MinusIcon, PlusIcon} from "@heroicons/vue/24/outline/index.js";
import NoResults from "~/components/general/noResults.vue";
import {useNotificationStore} from "~/stores/notifications.js";
import {useLanguagesStore} from "~/stores/languages.js";

const {t} = useI18n()
const localePath = useLocalePath()
const activeType = ref(1)
const deliveryType = ref(1)
const cart = useCartStore()
const {cartList} = storeToRefs(cart)
const notifications = useNotificationStore()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)
const modals = useModalsStore()

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

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.cart'), link: localePath('/cart')},
  {title: t('breadcrumbs.checkout'), link: localePath('/cart/checkout')},
]);
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <div class="container mx-auto px-4 md:px-0">
      <div class="pt-12 pb-32">

        <h1 class="text-3xl font-semibold mb-12">
          {{ $t('checkout.title') }}
        </h1>

        <div class="flex flex-col md:flex-row items-start gap-5">
          <div class="w-full md:w-2/3 flex flex-col gap-12">
            <div class="w-full">
              <div class="flex gap-6 mb-4 border-b border-[#F0DFDF] pb-3">
                <div
                    class="w-8 h-8 rounded-full bg-mainColor flex items-center justify-center text-white text-xl font-semibold">
                  1
                </div>
                <p class="text-2xl font-semibold">
                  {{ $t('checkout.first.title') }}
                </p>
              </div>
              <div class="flex gap-5 mb-6">
                <label class="w-full flex gap-3 items-center" for="type">
                  <input
                      type="radio"
                      class="w-6 h-6"
                      name="type"
                      id="type">
                  <p class="text-xl">
                    {{ $t('checkout.first.physical') }}
                  </p>
                </label>
                <label class="w-full flex gap-3 items-center" for="type">
                  <input
                      type="radio"
                      class="w-6 h-6"
                      name="type"
                      id="type">
                  <p class="text-xl">
                    {{ $t('checkout.first.legal') }}
                  </p>
                </label>
              </div>
              <div class="flex flex-col gap-4">
                <div>
                  <input
                      type="text"
                      :placeholder="$t('checkout.first.name')"
                      class="w-full px-4 border-b border-[#F0DFDF] py-3">
                </div>
                <div>
                  <input
                      type="text"
                      :placeholder="$t('checkout.first.phone')"
                      class="w-full px-4 border-b border-[#F0DFDF] py-3">
                </div>
              </div>
            </div>
            <div class="w-full">
              <div class="flex gap-6 mb-4 border-b border-[#F0DFDF] pb-3">
                <div
                    class="w-8 h-8 rounded-full bg-mainColor flex items-center justify-center text-white text-xl font-semibold">
                  2
                </div>
                <p class="text-2xl font-semibold">
                  {{ $t('checkout.second.title') }}
                </p>
              </div>
              <div class="flex gap-5 mb-6">
                <div
                    @click="activeType = 1"
                    :class="{ 'bg-[#F0DFDF]' : activeType === 1 }"
                    class="transition-all cursor-pointer rounded-lg py-3 w-full text-mainColor border border-[#F0DFDF] flex items-center justify-center gap-2">
                  <TruckIcon class="w-5 h-5"/>
                  <p>{{ $t('checkout.second.delivery') }}</p>
                </div>
                <div
                    @click="activeType = 2"
                    :class="{ 'bg-[#F0DFDF]' : activeType === 2 }"
                    class="transition-all cursor-pointer rounded-lg py-3 w-full text-mainColor border border-[#F0DFDF] flex items-center justify-center gap-2">
                  <HomeModernIcon class="w-5 h-5"/>
                  <p>{{ $t('checkout.second.pickup') }}</p>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-6">
                  <p class="text-xl font-semibold">
                    {{ $t('checkout.second.address') }}
                  </p>
                  <p
                      @click="modals.showModal('createAddress')"
                      class="text-mainColor cursor-pointer">
                    + {{ $t('checkout.second.add') }}
                  </p>
                </div>
                <p class="text-[#7B7B7B]">
                  {{ $t('checkout.second.text') }}
                </p>
              </div>
            </div>
            <div class="w-full">
              <div class="flex gap-6 mb-4 border-b border-[#F0DFDF] pb-3">
                <div
                    class="w-8 h-8 rounded-full bg-mainColor flex items-center justify-center text-white text-xl font-semibold">
                  3
                </div>
                <p class="text-2xl font-semibold">
                  {{ $t('checkout.third.title') }}
                </p>
              </div>
              <div class="flex gap-5 mb-6">
                <div
                    @click="deliveryType = 1"
                    :class="{ 'bg-[#F0DFDF]' : deliveryType === 1 }"
                    class="transition-all cursor-pointer rounded-lg py-3 w-full text-mainColor border border-[#F0DFDF] flex items-center justify-center gap-2">
                  <CreditCardIcon class="w-5 h-5"/>
                  <p>{{ $t('checkout.third.online') }}</p>
                </div>
                <div
                    @click="deliveryType = 2"
                    :class="{ 'bg-[#F0DFDF]' : deliveryType === 2 }"
                    class="transition-all cursor-pointer rounded-lg py-3 w-full text-mainColor border border-[#F0DFDF] flex items-center justify-center gap-2">
                  <CircleStackIcon class="w-5 h-5"/>
                  <p>{{ $t('checkout.third.phys') }}</p>
                </div>
              </div>
              <label class="mb-6 w-full flex gap-3 items-center" for="type">
                <input
                    type="checkbox"
                    class="w-6 h-6"
                    name="type"
                    id="type">
                <p class="text-sm">
                  {{ $t('checkout.third.agreement') }}
                </p>
              </label>
              <p class="font-bold mb-4">
                {{ $t('checkout.third.to_pay') }}: 25 200 ₸
              </p>
              <p
                  class="w-1/3 bg-mainColor text-white py-3 rounded-lg text-lg font-semibold text-center">
                {{ $t('cart.checkout.checkout_button') }}
              </p>
            </div>
          </div>
          <div class="w-full md:w-1/3 bg-[#FAFAFA] py-5 px-4 rounded-lg">
            <div class="flex gap-6 mb-4 border-b border-[#F0DFDF] pb-3">
              <p class="text-xl font-semibold">
                {{ $t('checkout.items') }}
              </p>
            </div>

            <div class="flow-root">
              <div
                  v-if="cartList"
                  class="-mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                    v-if="cartList.data.length > 0"
                    class="inline-block min-w-full align-middle sm:px-6 lg:px-8 overflow-x-auto">
                  <table
                      class="min-w-full divide-y divide-gray-300 text-xs">
                    <thead class="bg-[#FAFAFA]">
                    <tr>
                      <th scope="col" class="py-3.5 pr-3 text-left  font-semibold text-gray-900">
                        {{ t('cart.table.product') }}
                      </th>
                      <th scope="col" class="px-3 py-3.5 text-left  font-semibold text-gray-900">
                        {{ t('cart.table.quantity') }}
                      </th>
                      <th scope="col" class="px-3 py-3.5 text-left  font-semibold text-gray-900">
                        {{ t('cart.table.total') }}
                      </th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                    <tr
                        v-for="(item, index) in cartList.data"
                        :key="index">
                      <td class="whitespace-nowrap py-5 pl-4 pr-3  sm:pl-0">
                        <div class="flex flex-col">
                          <div class="h-10 w-10 flex-shrink-0">
                            <img
                                class="h-10 w-10 rounded-full ml-4 object-cover"
                                :src="item.product_image"
                                alt=""
                            />
                          </div>
                          <div class="ml-4">
                            <div class="font-medium text-gray-900">
                              {{ item.product_title[cur_lang] }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-5">
                        <div class="text-mainColor flex gap-3 items-center">
                          <button
                              @click="editQuantity(item.id, item.quantity - 1)"
                              class="border border-[#F0DFDF] rounded-full w-5 h-5 flex items-center justify-center hover:bg-[#F0DFDF] transition-all">
                            <MinusIcon class="w-5 h-5"/>
                          </button>
                          <p class=" text-xs">
                            {{ item.quantity }}
                          </p>
                          <button
                              @click="editQuantity(item.id, item.quantity + 1)"
                              class="border border-[#F0DFDF] rounded-full w-5 h-5 flex items-center justify-center hover:bg-[#F0DFDF] transition-all">
                            <PlusIcon class="w-5 h-5"/>
                          </button>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-5 font-semibold ">
                        {{ item.price }}₸
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
              <div class="font-bold text-sm">
                <div class="flex items-center justify-between py-3">
                  <p>{{ $t('checkout.del_type') }}:</p>
                  <p>{{ $t('checkout.delivery_status.delivery') }}</p>
                </div>
                <div class="flex items-center justify-between pt-3">
                  <p>{{ $t('checkout.to_pay') }}:</p>
                  <p>25 200 ₸</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>