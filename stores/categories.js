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
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        }
    };
});