import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useOrdersStore = defineStore("orders", () => {
    const ordersList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        ordersList,
        async getOrders() {
            try {
                const response = await api(`/api/orders/my-orders`, "GET", {}, route.query);
                ordersList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
    };
});