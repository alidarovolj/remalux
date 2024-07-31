import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useNewsStore = defineStore("news", () => {
    const newsList = ref(null);
    const newsDetail = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        newsList,
        newsDetail,
        async getNews() {
            try {
                const response = await api(`/api/news`, "GET", {}, route.query);
                newsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getDetailNews(id) {
            try {
                const response = await api(`/api/news/${id}`, "GET", {}, route.query);
                newsDetail.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        }
    };
});