import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useColorsStore = defineStore("colors", () => {
    const colorsList = ref(null);
    const mainColorsList = ref(null);
    const favouriteColorsList = ref(null);
    const addedFavouriteColor = ref(null);
    const route = useRoute()
    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)
    const notifications = useNotificationStore()

    return {
        colorsList,
        mainColorsList,
        favouriteColorsList,
        addedFavouriteColor,
        async getColors() {
            try {
                const response = await api(`/api/colors`, "GET", {}, route.query);
                colorsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getMainColors() {
            try {
                const response = await api(`/api/colors/main`, "GET", {}, route.query);
                mainColorsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getFavouriteColors() {
            if(token.value) {
                try {
                    const response = await api(`/api/favourite-colors`, "GET", {}, route.query);
                    favouriteColorsList.value = response;
                } catch (e) {
                    notifications.showNotification("error", "Произошла ошибка", e);
                }
            } else {
                favouriteColorsList.value = null;
            }
        },
        async addToFavouriteColors(id) {
            try {
                const response = await api(`/api/favourite-colors/`, "POST", {
                    body: JSON.stringify({color_id: id}),
                }, route.query);
                addedFavouriteColor.value = response;
                this.getFavouriteColors();
                notifications.showNotification("success", "Успешно", "Цвет успешно добавлен в избранное");
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async removeFromFavourites(id) {
            try {
                const query = { ...route.query, favourite_color_id: id };
                const response = await api(`/api/favourite-colors`, "DELETE", {}, query);
                addedFavouriteColor.value = response;
                this.getFavouriteColors();
                notifications.showNotification("success", "Успешно", "Цвет успешно удален из избранного");
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
    };
});