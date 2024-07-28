import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useIdeasStore = defineStore("ideas", () => {
    const ideasList = ref(null);
    const ideaColorsList = ref(null);
    const ideaDetail = ref(null);
    const ideaRoomsList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        ideasList,
        ideaColorsList,
        ideaDetail,
        ideaRoomsList,
        async getIdeas() {
            try {
                const response = await api(`/api/ideas`, "GET", {}, route.query);
                ideasList.value = response;
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
        async getIdeaColors() {
            try {
                const response = await api(`/api/ideas/colors`, "GET", {}, route.query);
                ideaColorsList.value = response;
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
        async getIdeaRooms() {
            try {
                const response = await api(`/api/ideas/rooms`, "GET", {}, route.query);
                ideaRoomsList.value = response;
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
        async getIdeaDetail(id) {
            try {
                const response = await api(`/api/ideas/${id}`, "GET", {}, route.query);
                ideaDetail.value = response;
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