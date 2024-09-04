<script setup>
import Breadcrumbs from "~/components/general/breadcrumbs.vue";
import {useCartStore} from "~/stores/cart.js";
import {storeToRefs} from "pinia";
import {PlusIcon} from "@heroicons/vue/24/outline"
import {useLanguagesStore} from "~/stores/languages.js";
import {MinusIcon, TrashIcon} from "@heroicons/vue/24/outline/index.js";
import NoResults from "~/components/general/noResults.vue";
import {useNotificationStore} from "~/stores/notifications.js";
import {useCartCookieStore} from "~/stores/cartCookie.js";
import PopularProducts from "~/components/mainPage/popularProducts.vue";

const {t} = useI18n();
const localePath = useLocalePath();
const notifications = useNotificationStore()
const cart = useCartStore()
const {cartList, cartPrice} = storeToRefs(cart);
const language = useLanguagesStore()
const {cur_lang} = storeToRefs(language);
const cartData = useCartCookieStore()
const {cartCookie, cartTotalPrice} = storeToRefs(cartData)

const isItemChecked = (item) => {
  return cartCookie.value && cartCookie.value.some(cartItem => cartItem.id === item.id && cartItem.price === item.price);
}

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
  await cartData.checkChangedCart()
  editForm.value.quantity = null
}

const removeLocal = async (id) => {
  let item = cartList.value.data.find(item => item.id === id)
  await nextTick()
  await cartData.addOrRemoveItemCart(item)
  await cart.removeItem(id)
  await cart.getCart()
  await cartData.checkChangedCart()
}

const removeCartLocal = async () => {
  await cart.removeCart()
  await cart.getCart()
}

const checkedCartCookie = computed(() =>
    cartCookie.value && cartList.value && cartList.value.data.length > 0 && cartList.value.data.length === cartCookie.value.length
);

onMounted(async () => {
  await nextTick()
  await cartData.initCookieCart()
  await cart.getCart()
  await cartData.cartGetItems()
})

useHead({
  title: t("headers.cart.title"),
  meta: [
    {
      property: "description",
      content: t("headers.cart.description"),
    },
    {
      property: "og:description",
      content: t("headers.cart.description"),
    },
    {
      property: "og:title",
      content: t("headers.cart.title"),
    },
    {
      property: "og:url",
      content: t("headers.cart.og_url"),
    },
  ],
  link: [{rel: "canonical", href: t("headers.cart.canonical")}],
});
</script>

<template>
  <div>
    <Breadcrumbs :links="links"/>
    <div class="container mx-auto px-4 md:px-0">
      <div class="mt-12 mb-32 pb-10 rounded-2xl shadow-lg">
        <div class="flex justify-between px-10">
          <h1 class="text-xl font-medium font-montserrat">
            {{ t('cart.title') }}: <span v-if="cartCookie">{{ cartCookie.length }}</span>)
          </h1>
          <div v-if="cartList">
            <div
                v-if="cartList.data.length > 0"
                class="flex items-center gap-2"
                @click="removeCartLocal">
              <p class="font-medium text-red-500">
                {{ t('cart.clear') }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8 flow-root">
          <div
              v-if="cartList && cartCookie"
              class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 text-sm">
            <div
                v-if="cartList.data.length > 0"
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 mb-8">
              <table
                  class="min-w-full divide-y divide-gray-300">
                <thead class="bg-[#FAFAFA]">
                <tr class="px-4">
                  <th class="py-3.5 pl-4 pr-3 text-left  font-semibold text-gray-900" scope="col">
                    <input
                        :checked="checkedCartCookie"
                        class="w-5 h-5"
                        type="checkbox"
                        @input="cartData.addAllItemsCart(cartList)">
                  </th>
                  <th class="py-3.5 pl-4 pr-3 text-left  font-semibold text-gray-900" scope="col">
                    {{ t('cart.table.product') }}
                  </th>
                  <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                    {{ t('cart.table.color') }}
                  </th>
                  <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                    {{ t('cart.table.weight') }}
                  </th>
                  <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                    {{ t('cart.table.quantity') }}
                  </th>
                  <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                    {{ t('cart.table.price') }}
                  </th>
                  <th class="px-3 py-3.5 text-left  font-semibold text-gray-900" scope="col">
                    {{ t('cart.table.total') }}
                  </th>
                  <th class="relative py-3.5 pl-3 pr-4 sm:pr-0" scope="col">
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                    v-for="(item, index) in cartList.data"
                    :key="index"
                    class="border-b news-card cursor-pointer"
                    data-aos="fade-up"
                    :data-aos-delay="index * 100"
                >
                  <td class="whitespace-nowrap py-5 pl-4 pr-3">
                    <input
                        :checked="isItemChecked(item)"
                        class="w-5 h-5"
                        type="checkbox"
                        @input="cartData.addOrRemoveItemCart(item)">
                  </td>
                  <td class="whitespace-nowrap py-5 pl-4 pr-3  sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-24 w-24 flex-shrink-0">
                        <img
                            :src="item.product_image"
                            alt=""
                            class="h-24 w-24 rounded-full object-cover transition-all"
                        />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ item.product_title[cur_lang] }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5  ">
                    <div v-if="item.product_variant.product.is_colorable">
                      <div v-if="item.color_id" class="relative show_on_hover">
                        <div
                            class="text-gray-900 w-8 h-8 rounded-md shadow"
                            :style="`background: ${item.color_id.hex}`"
                        >
                        </div>
                        <p class="opacity-0 transition-all absolute left-0 text-center top-[105%]">{{ item.color_id.title[cur_lang] }}</p>
                      </div>
                      <div
                          v-else
                          class="border-2 border-mainColor hover:bg-mainColor hover:text-white transition-all hover:rounded-lg w-max p-3 text-mainColor border-dashed cursor-pointer">
                        <PlusIcon class="w-5 h-5"/>
                      </div>
                    </div>
                    <div v-else class="w-12 h-12 rounded-lg bg-white shadow-lg flex items-center justify-center text-sm font-semibold"><p class="">N/A</p></div>

                  </td>
                  <td class="whitespace-nowrap px-3 py-5">
                    <div class="text-gray-900">
                      {{ item.product_variant.value }}{{ $t('products.details.kg') }}
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5  ">
                    <div class="text-mainColor flex items-center gap-5">
                      <button
                          class="border border-[#F0DFDF] rounded-full w-7 h-7 flex items-center justify-center hover:bg-[#F0DFDF] transition-all"
                          @click="editQuantity(item.id, item.quantity - 1)">
                        <MinusIcon class="w-5 h-5"/>
                      </button>
                      <p class=" text-sm">
                        {{ item.quantity }} шт.
                      </p>
                      <button
                          class="border border-[#F0DFDF] rounded-full w-7 h-7 flex items-center justify-center hover:bg-[#F0DFDF] transition-all"
                          @click="editQuantity(item.id, item.quantity + 1)">
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
                        class="w-6 h-6 text-red-500 cursor-pointer"
                        @click="removeLocal(item.id)"
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
                    :class="{ 'bg-[#989898]' : index === 0 }"
                    class="skeleton w-10 h-4"
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
        <div class="flex justify-end pr-10">
          <NuxtLink
              v-if="cartData.cartItems.length > 0"
              :to="localePath('/cart/checkout')"
              class="block w-max px-6 py-2 border hover:bg-mainColor hover:text-white transition-all text-center border-mainColor text-mainColor rounded-xl text-base md:text-base font-medium">
            {{ $t('cart.checkout.checkout_button') }}
          </NuxtLink>
          <p
              v-else
              class="block w-max px-6 py-2 border bg-gray-200 text-center border-gray-200 cursor-not-allowed rounded-xl text-base md:text-base font-medium"
              @click="notifications.showNotification('error', 'Ошибка', 'Выберите товар для оформления заказа')">
            {{ $t('cart.checkout.checkout_button') }}
          </p>
        </div>
<!--        <div v-if="cartList">-->
<!--          <div-->
<!--              v-if="cartList.data.length > 0"-->
<!--              class="bg-[#FAFAFA] py-5 px-6 rounded-lg set_shadow">-->
<!--            <p class="text-mainColor text-2xl font-semibold border-b border-[#F0DFDF] pb-3 mb-4">-->
<!--              {{ $t('cart.checkout.title') }}-->
<!--            </p>-->
<!--            <div class="flex flex-col md:flex-row justify-between">-->
<!--              <div class="w-full md:w-1/3">-->
<!--                <p class="text-xl mb-3 font-semibold">-->
<!--                  {{ $t('cart.checkout.coupon_title') }}-->
<!--                </p>-->
<!--                <p class="mb-8">-->
<!--                  {{ $t('cart.checkout.coupon_text') }}-->
<!--                </p>-->
<!--                <div class="flex flex-col md:flex-row justify-between gap-5 mb-10 md:mb-0">-->
<!--                  <input-->
<!--                      :placeholder="$t('cart.checkout.coupon_placeholder')"-->
<!--                      class="w-full px-4 border-b border-[#F0DFDF] bg-[#FAFAFA]"-->
<!--                      type="text">-->
<!--                  <button-->
<!--                      class="w-full border border-mainColor text-mainColor px-6 py-2 rounded-lg text-lg font-semibold">-->
<!--                    {{ $t('cart.checkout.coupon_button') }}-->
<!--                  </button>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="w-full md:w-1/3 flex flex-col justify-between">-->
<!--                <div class="border-b border-[#F0DFDF] flex items-center justify-between py-3">-->
<!--                  <p>{{ $t('cart.checkout.summary') }}</p>-->
<!--                  <p>{{ cartTotalPrice }} ₸</p>-->
<!--                </div>-->
<!--                <div class="border-b border-[#F0DFDF] flex items-center justify-between py-3">-->
<!--                  <p>{{ $t('cart.checkout.total') }}</p>-->
<!--                  <p class="text-xl font-bold">{{ cartTotalPrice }} ₸</p>-->
<!--                </div>-->
<!--                <NuxtLink-->
<!--                    v-if="cartData.cartItems.length > 0"-->
<!--                    :to="localePath('/cart/checkout')"-->
<!--                    class="w-full bg-mainColor text-white px-6 py-2 rounded-lg text-lg font-semibold text-center">-->
<!--                  {{ $t('cart.checkout.checkout_button') }}-->
<!--                </NuxtLink>-->
<!--                <p-->
<!--                    v-else-->
<!--                    class="w-full bg-mainColor cursor-pointer text-white px-6 py-2 rounded-lg text-lg font-semibold text-center"-->
<!--                    @click="notifications.showNotification('error', 'Ошибка', 'Корзина пуста, пожалуйста добавьте товары')">-->
<!--                  {{ $t('cart.checkout.checkout_button') }}-->
<!--                </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
<!--      <div class="mb-32">-->
<!--        <PopularProducts />-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
table td,
table th {
  padding: 0.75rem 1.5rem !important;
}

h2 {
  font-size: 1rem !important;
}

.show_on_hover:hover p {
  opacity: 100% !important;
}
</style>