<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useCartStore} from "~/stores/cart.js";
import {MinusIcon, PlusIcon, TrashIcon} from "@heroicons/vue/24/outline/index.js";
import NoResults from "~/components/general/noResults.vue";
import {useNotificationStore} from "~/stores/notifications.js";
import {useLanguagesStore} from "~/stores/languages.js";
import {useAddressesStore} from "~/stores/addresses.js";
import {useRecipientsStore} from "~/stores/recipients.js";
import {useCartCookieStore} from "~/stores/cartCookie.js";
import {storeToRefs} from "pinia";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

const {t} = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()
const {cartList, cartPrice} = storeToRefs(cart)
const notifications = useNotificationStore()
const languages = useLanguagesStore()
const {cur_lang} = storeToRefs(languages)
const modals = useModalsStore()
const addresses = useAddressesStore()
const recipients = useRecipientsStore()
const cartData = useCartCookieStore()
const {cartTotalPrice} = storeToRefs(cartData)
const loading = ref(false)
const router = useRouter()
const route = useRoute()

const editForm = ref({
  quantity: null
})

const localPayment = ref(1)

const form = ref({
  product_variants: [],
  delivery_address_id: null,
  recipient_id: null,
  note: null,
  delivery_type_id: 1,
  payment_method_id: null,
  total_amount: null
})

const v$ = useVuelidate({
  delivery_address_id: {required},
  recipient_id: {required},
  delivery_type_id: {required},
  payment_method_id: {required},
  agreement: {required}
}, form);

const editQuantity = async (id, quantity) => {
  editForm.value.quantity = quantity
  if (editForm.value.quantity === 0) {
    notifications.showNotification('error', 'Редактирование не удалось', 'Кол-во не может ровняться 0 или меньше')
    editForm.value.quantity = null
    return
  }
  await cart.editItem(id, editForm.value)
  await cart.getCart()
  await cartData.checkChangedCart()
  editForm.value.quantity = null
}

const links = computed(() => [
  {title: t('breadcrumbs.home'), link: localePath('/')},
  {title: t('breadcrumbs.cart'), link: localePath('/cart')},
  {title: t('breadcrumbs.checkout'), link: localePath('/cart/checkout')},
]);

const makeOrder = async () => {
  form.value.total_amount = cartTotalPrice.value
  loading.value = true;
  await v$.value.$validate();

  if (v$.value.$error) {
    notifications.showNotification("error", "Данные не заполнены", "Проверьте правильность введенных данных и попробуйте снова.");
    loading.value = false;
    return;
  }

  try {
    const response = await api(`/api/orders`, "POST", {
      body: JSON.stringify(form.value)
    }, route.query);

    await nextTick()
    await cart.getCart()
    await cartData.clearCart()
    await router.push(localePath('/payment-success'))
  } catch (e) {
    notifications.showNotification("error", "Произошла ошибка", e);
  }

}

const makeDataForOrder = async () => {
  await nextTick()
  form.value.product_variants = cartData.cartItems.map(item => {
    return {
      product_variant_id: item.product_variant.id,
      quantity: item.quantity,
      price: item.price,
      color_id: item.color_id
    }
  })
}

onMounted(async () => {
  await nextTick()
  await cart.getDeliveryTypes()
  await cart.getPaymentMethods()
  await addresses.getAddresses()
  await recipients.getRecipients()
  await cartData.initCookieCart()
  await cartData.cartGetItems()
  await makeDataForOrder()
})
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <div class="container mx-auto px-4 md:px-0">
      <div class="pt-12 pb-32">

        <h1 class="text-xl md:text-3xl font-semibold mb-12">
          {{ $t('checkout.title') }}
        </h1>

        <div class="flex flex-col-reverse md:flex-row items-start gap-5">
          <div class="w-full md:w-2/3 flex flex-col gap-12">
            <div class="w-full">
              <div class="flex items-center gap-6 mb-4 border-b border-[#F0DFDF] pb-3">
                <div
                    class="w-8 h-8 rounded-full bg-mainColor flex items-center justify-center text-white text-xl font-semibold">
                  1
                </div>
                <p class="text-base md:text-2xl font-semibold">
                  {{ $t('checkout.second.title') }}
                </p>
              </div>
              <div
                  v-if="cart.delivery_types"
                  class="flex flex-col md:flex-row gap-5 mb-6">
                <div
                    v-for="(item, index) of cart.delivery_types"
                    :key="index"
                    @click="form.delivery_type_id = item.id"
                    :class="{ 'bg-[#F0DFDF]' : form.delivery_type_id === item.id }"
                    class="transition-all cursor-pointer rounded-lg py-3 w-full text-mainColor border border-[#F0DFDF] flex items-center justify-center gap-2">
                  <p>{{ item.title[cur_lang] }}</p>
                </div>
              </div>
              <div v-if="form.delivery_type_id === 1">
                <div class="flex flex-col md:flex-row gap-3 justify-between mb-6">
                  <p class="text-xl font-semibold">
                    {{ $t('checkout.second.address') }}
                  </p>
                  <p
                      @click="modals.showModal('createAddress')"
                      class="text-mainColor cursor-pointer">
                    + {{ $t('checkout.second.add') }}
                  </p>
                </div>
                <div v-if="addresses.addressesList">
                  <div v-if="addresses.addressesList">
                    <div
                        v-if="addresses.addressesList.data.length > 0"
                        class="flex flex-col gap-5">
                      <label
                          v-for="(item, index) of addresses.addressesList.data"
                          :key="index"
                          :class="['p-4 border border-[#F0DFDF] transition-all cursor-pointer rounded-lg flex items-center justify-between', { 'bg-[#F0DFDF]': form.delivery_address_id === item.id }, { 'border-red-500' : v$.delivery_address_id.$error }]">
                        <div class="flex items-center gap-3">
                          <input
                              type="radio"
                              name="addresses"
                              :value="item.id"
                              v-model="form.delivery_address_id"
                              class="w-6 h-6">
                          <p>{{ item.country.title }}, {{ item.address }}, {{ item.entrance }} подъезд, этаж {{
                              item.floor
                            }},
                            кв. {{ item.float }}</p>
                        </div>
                        <TrashIcon
                            @click.stop="modals.showModal('removeAddress', item)"
                            class="w-5 h-5 text-red-500 cursor-pointer"/>
                      </label>
                    </div>
                    <div v-else>
                      <p class="text-gray-500 py-3">
                        {{ t('profile.no_addresses') }}
                      </p>
                    </div>
                  </div>
                  <div v-else class="spinner p-3"></div>
                  <p
                      v-else
                      class="text-red-500 font-semibold p-3 border-b border-[#F0DFDF]">
                    {{ $t('checkout.second.text') }}
                  </p>
                </div>
                <div v-else class="spinner"></div>
              </div>
              <p
                  v-else
                  class="text-black">
                {{ $t('checkout.second.address') }}: <span class="font-semibold">г. Алматы, ул. Абая 123</span>
              </p>
            </div>
            <div class="w-full">
              <div class="flex justify-between items-center mb-4 border-b border-[#F0DFDF] pb-3">
                <div class="flex gap-6 items-center">
                  <div
                      class="w-8 h-8 rounded-full bg-mainColor flex items-center justify-center text-white text-xl font-semibold">
                    2
                  </div>
                  <p class="text-base md:text-2xl font-semibold">
                    {{ $t('checkout.first.title') }}
                  </p>
                </div>
                <p
                    @click="modals.showModal('createAddress')"
                    class="text-mainColor cursor-pointer">
                  + {{ $t('checkout.first.add') }}
                </p>
              </div>

              <div class="mb-5" v-if="recipients.recipientList">
                <div
                    v-if="recipients.recipientList.data.length > 0"
                    class="flex flex-col gap-5">
                  <label
                      v-for="(item, index) of recipients.recipientList.data"
                      :key="index"
                      :class="['p-4 border border-[#F0DFDF] transition-all cursor-pointer rounded-lg flex items-center justify-between', { 'bg-[#F0DFDF]': form.recipient_id === item.id }, { 'border-red-500' : v$.recipient_id.$error }]">
                    <div class="flex gap-3 items-center w-full">
                      <input
                          type="radio"
                          name="recipients"
                          :value="item.id"
                          v-model="form.recipient_id"
                          class="w-6 h-6">
                      <p>{{ item.name }} / {{ item.phone_number }}</p>
                    </div>
                    <TrashIcon
                        @click.stop="modals.showModal('removeRecipient', item)"
                        class="w-5 h-5 text-red-500 cursor-pointer"/>
                  </label>
                </div>
                <div v-else>
                  <p class="text-gray-500 py-3">
                    {{ $t('profile.no_recipients') }}
                  </p>
                </div>
              </div>

              <div>
                <p class="text-xs text-[#7B7B7B]">
                  Комментарии к заказу
                </p>
                <textarea
                    v-model="form.note"
                    rows="4"
                    class="border border-[#F0DFDF] w-full p-4 rounded-lg"
                    placeholder="Введите свой комментарий"
                />
              </div>
            </div>
            <div class="w-full">
              <div class="flex items-center gap-6 mb-4 border-b border-[#F0DFDF] pb-3">
                <div
                    class="w-8 h-8 rounded-full bg-mainColor flex items-center justify-center text-white text-xl font-semibold">
                  3
                </div>
                <p class="text-base md:text-2xl font-semibold">
                  {{ $t('checkout.third.title') }}
                </p>
              </div>
              <div
                  v-if="cart.payment_methods"
                  class="flex flex-col gap-3 mb-4"
              >
                <div
                    class="flex flex-col md:flex-row gap-5">
                  <div
                      :class="{ 'bg-[#F0DFDF]' : localPayment === 1 }"
                      @click="localPayment = 1"
                      class="transition-all hover:bg-[#F0DFDF] cursor-pointer rounded-lg py-3 w-full text-mainColor border border-[#F0DFDF] flex items-center justify-center gap-2">
                    <p>{{ $t('checkout.third.online') }}</p>
                  </div>
                </div>
                <div>
                  <div class="flex flex-col gap-5">
                    <label
                        v-for="(item, index) of cart.payment_methods.online"
                        @click="form.payment_method_id = item.id"
                        :key="index"
                        :class="['p-4 border cursor-pointer border-[#F0DFDF] transition-all rounded-lg flex items-center gap-3', { 'bg-[#F0DFDF]': form.payment_method_id === item.id }, { 'border-red-500' : v$.payment_method_id.$error }]">
                      <input
                          type="radio"
                          name="payment_methods"
                          :value="item.id"
                          v-model="form.payment_method_id"
                          class="w-6 h-6">
                      <div class="flex gap-5">
                        <p>{{ item.title[cur_lang] }}</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <label
                  class="mb-6 w-full flex gap-3 items-center cursor-pointer"
                  for="agreement">
                <input
                    type="checkbox"
                    v-model="form.agreement"
                    class="w-6 h-6"
                    name="agreement"
                    id="agreement">
                <p class="text-sm" :class="{ '!text-red-500 underline': v$.agreement.$error }">
                  {{ $t('checkout.third.agreement.text') }}
                  <NuxtLink
                      :class="{ '!text-red-500 underline': v$.agreement.$error }"
                      class="text-blue-500 underline"
                      :to="localePath('/')">
                    {{ $t('checkout.third.agreement.link') }}
                  </NuxtLink>
                </p>
              </label>
              <p class="font-bold mb-4">
                {{ $t('checkout.third.to_pay') }}: {{ cartTotalPrice }} ₸
              </p>
              <p
                  v-if="!loading"
                  @click="makeOrder"
                  class="w-full md:w-1/3 bg-mainColor text-white py-3 rounded-lg text-lg font-semibold text-center cursor-pointer">
                {{ $t('cart.checkout.checkout_button') }}
              </p>
              <p
                  v-else
                  class="w-full md:w-1/3 bg-mainColor text-white py-3 rounded-lg text-lg font-semibold text-center cursor-pointer">
                <span class="spinner"></span>
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
                  v-if="cartList && cartData.cartItems"
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
                        v-for="(item, index) in cartData.cartItems"
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
                  <p>{{ cartTotalPrice }} ₸</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>