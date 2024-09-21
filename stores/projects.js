import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useProjectsStore = defineStore("projects", () => {
    const projectsList = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        projectsList,
        async getProjects() {
            try {
                const response = await api(`/api/projects`, "GET", {}, route.query);
                projectsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
    };
});