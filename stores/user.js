import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useUserStore = defineStore("user", () => {
    const userProfile = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        userProfile,
        async getProfile() {
            try {
                const response = await api(`/api/auth/me`, "GET", {}, route.query);
                userProfile.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
                userProfile.value = false;
            }
        },
    };
});