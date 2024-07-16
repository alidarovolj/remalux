import { defineStore } from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useProductsStore = defineStore("products", () => {
    const productsList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        productsList,
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
        }
    };
});