import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useCartStore = defineStore("cart", () => {
    const cartList = ref(null);
    const removedItem = ref(null);
    const editedItem = ref(null);
    const removedCart = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        cartList,
        removedItem,
        editedItem,
        removedCart,
        async getCart() {
            try {
                const response = await api(`/api/carts/`, "GET", {}, route.query);
                cartList.value = response;
            } catch (e) {
                if (e.response) {
                    if (e.response.status !== 500) {

                    } else {

                    }
                } else {
                    console.error(e);

                }
            }
        },
        async removeItem(id) {
            try {
                const response = await api(`/api/carts/${id}`, "DELETE", {}, route.query);
                removedItem.value = response;
                notifications.showNotification("success", "Продукт успешно удален", "Продукт успешно удален из корзины");
            } catch (e) {
                if (e.response) {
                    if (e.response.status !== 500) {
                        notifications.showNotification("error", "Произошла ошибка", e.response.data.message);
                    } else {
                        notifications.showNotification("error", "Ошибка сервера!", "Попробуйте позже.");
                    }
                } else {
                    console.error(e);
                    notifications.showNotification("error", "Произошла ошибка", "Неизвестная ошибка");
                }
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
                if (e.response) {
                    if (e.response.status !== 500) {
                        notifications.showNotification("error", "Произошла ошибка", e.response.data.message);
                    } else {
                        notifications.showNotification("error", "Ошибка сервера!", "Попробуйте позже.");
                    }
                } else {
                    console.error(e);
                    notifications.showNotification("error", "Произошла ошибка", "Неизвестная ошибка");
                }
            }
        },
        async removeCart() {
            try {
                const response = await api(`/api/carts/clear`, "POST", {}, route.query);
                removedCart.value = response;
            } catch (e) {
                if (e.response) {
                    if (e.response.status !== 500) {
                        notifications.showNotification("error", "Произошла ошибка", e.response.data.message);
                    } else {
                        notifications.showNotification("error", "Ошибка сервера!", "Попробуйте позже.");
                    }
                } else {
                    console.error(e);
                    notifications.showNotification("error", "Произошла ошибка", "Неизвестная ошибка");
                }
            }
        },
    };
});