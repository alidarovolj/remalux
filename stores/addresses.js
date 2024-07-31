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
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getCities() {
            try {
                const response = await api(`/api/cities`, "GET", {}, route.query);
                citiesList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async removeAddress(id) {
            try {
                const response = await api(`/api/users/addresses/${id}`, "DELETE", {}, route.query);
                removedAddress.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        }
    };
});