import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useContactsStore = defineStore("contacts", () => {
    const contactsList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        contactsList,
        async getContacts() {
            try {
                const response = await api(`/api/contacts`, "GET", {}, route.query);
                contactsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        }
    };
});