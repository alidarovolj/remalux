import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useCategoriesStore = defineStore("categories", () => {
    const categoriesList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        categoriesList,
        async getCategories() {
            try {
                const response = await api(`/api/categories/all`, "GET", {}, route.query);
                categoriesList.value = response;
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