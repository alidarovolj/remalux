import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useColorsStore = defineStore("colors", () => {
    const colorsList = ref(null);
    const mainColorsList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        colorsList,
        mainColorsList,
        async getColors() {
            try {
                const response = await api(`/api/colors`, "GET", {}, route.query);
                colorsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getMainColors() {
            try {
                const response = await api(`/api/colors/main`, "GET", {}, route.query);
                mainColorsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
    };
});