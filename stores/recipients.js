import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useRecipientsStore = defineStore("recipients", () => {
    const recipientList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        recipientList,
        async getRecipients() {
            try {
                const response = await api(`/api/users/recipients`, "GET", {}, route.query);
                recipientList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
    };
});