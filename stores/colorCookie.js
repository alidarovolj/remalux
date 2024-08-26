import {useNotificationStore} from "~/stores/notifications.js";

export const useColorCookieStore = defineStore("colorCookie", () => {
    const colorCookie = useCookie("colorCookie", {
        sameSite: true,
        maxAge: 60 * 60 * 24,
    });
    const notifications = useNotificationStore()

    // Initialize colorCookie value
    colorCookie.value = colorCookie.value || null;

    return {
        colorCookie,
        async saveCookie(color) {
            colorCookie.value = color;
        },
        async removeCookie() {
            colorCookie.value = null;
            notifications.showNotification('success', 'Успешно', 'Выбранный цвет был успешно удален')
        },
    };
});