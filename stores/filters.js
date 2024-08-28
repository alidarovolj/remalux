import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useFiltersStore = defineStore("filters", () => {
    const filtersList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        filtersList,
        async getFilters() {
            try {
                const response = await api(`/api/filters/all`, "GET", {}, {
                    page: route.query.page,
                    perPage: route.query.perPage,
                });
                filtersList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
    };
});