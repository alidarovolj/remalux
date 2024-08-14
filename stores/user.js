import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useUserStore = defineStore("user", () => {
    const userProfile = ref(null);
    const userCheckedPhone = ref(null);
    const userCheckedEmail = ref(null);
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        userProfile,
        userCheckedPhone,
        userCheckedEmail,
        async getProfile() {
            try {
                const response = await api(`/api/auth/me`, "GET", {}, route.query);
                userProfile.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
                userProfile.value = false;
            }
        },
        async checkPhone(phone) {
            try {
                const response = await api(`/api/auth/phone-exists`, "GET", {}, {
                    phone_number: phone
                });
                userCheckedPhone.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
                userCheckedPhone.value = false;
            }
        },
        async checkEmail(email) {
            try {
                const response = await api(`/api/auth/email-exists`, "GET", {}, {
                    email: email
                });
                userCheckedEmail.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
                userCheckedEmail.value = false;
            }
        },
    };
});