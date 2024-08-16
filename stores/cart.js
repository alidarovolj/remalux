import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useCartStore = defineStore("cart", () => {
    const cartList = ref(null);
    const removedItem = ref(null);
    const editedItem = ref(null);
    const removedCart = ref(null);
    const payment_methods = ref(null);
    const delivery_types = ref(null);
    const cartPrice = ref(0);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        cartList,
        removedItem,
        editedItem,
        removedCart,
        cartPrice,
        payment_methods,
        delivery_types,
        async getCart() {
            try {
                const response = await api(`/api/carts/`, "GET", {}, route.query);
                cartList.value = response;
                if (response && response.data) {
                    cartPrice.value = 0;
                    response.data.forEach((item) => {
                        cartPrice.value += parseInt(item.price);
                    });
                }
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getPaymentMethods() {
            try {
                const response = await api(`/api/payment-methods`, "GET", {}, route.query);
                payment_methods.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getDeliveryTypes() {
            try {
                const response = await api(`/api/delivery-types`, "GET", {}, route.query);
                delivery_types.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async removeItem(id) {
            try {
                const response = await api(`/api/carts/${id}`, "DELETE", {}, route.query);
                removedItem.value = response;
                notifications.showNotification("success", "Продукт успешно удален", "Продукт успешно удален из корзины");
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async editItem(id, form) {
            try {
                const response = await api(`/api/carts/${id}`, "PUT", {
                    body: JSON.stringify(form)
                }, route.query);
                editedItem.value = response;
                // notifications.showNotification("success", "Продукт успешно отредактирован", "Продукт успешно отредактирован");
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async removeCart() {
            try {
                const response = await api(`/api/carts/clear`, "POST", {}, route.query);
                removedCart.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
    };
});