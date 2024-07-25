import { defineStore } from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useProductsStore = defineStore("products", () => {
    const productsList = ref(null);
    const detailProduct = ref(null);
    const sameProducts = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        productsList,
        detailProduct,
        sameProducts,
        async getProducts() {
            try {
                const response = await api(`/api/products/paginated`, "GET", {}, route.query);
                productsList.value = response;
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
        async getDetailProduct(id) {
            try {
                const response = await api(`/api/products/${id}`, "GET", {}, route.query);
                detailProduct.value = response;
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
        async getSameProducts(id) {
            try {
                const response = await api(`/api/products/${id}/same-products`, "GET", {}, route.query);
                sameProducts.value = response;
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