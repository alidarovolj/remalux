import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useAddressesStore = defineStore("addresses", () => {
    const addressesList = ref(null);
    const citiesList = ref(null);
    const removedAddress = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        addressesList,
        citiesList,
        removedAddress,
        async getAddresses() {
            try {
                const response = await api(`/api/users/addresses/list`, "GET", {}, route.query);
                addressesList.value = response;
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
        async getCities() {
            try {
                const response = await api(`/api/cities`, "GET", {}, route.query);
                citiesList.value = response;
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
        async removeAddress(id) {
            try {
                const response = await api(`/api/users/addresses/${id}`, "DELETE", {}, route.query);
                removedAddress.value = response;
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