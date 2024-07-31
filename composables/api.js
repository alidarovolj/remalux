import axios from 'axios';
import { useNotificationStore } from "@/stores/notifications.js";
import { useAuthStore } from "~/stores/auth.js";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

export async function api(url, method, options = {}, query = {}) {
    const auth = useAuthStore();
    auth.initCookieToken();
    const { token } = storeToRefs(auth);
    const router = useRouter();
    const notifications = useNotificationStore();

    const defaultPage = query.page || 1;
    const defaultPerPage = query.perPage || 10;

    const params = {
        ...query,
        page: defaultPage,
        perPage: defaultPerPage,
        ...options.params,
    };

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
    };

    const queryString = Object.keys(params)
        .map(key => {
            const value = params[key];
            if (Array.isArray(value)) {
                return value.map(val => `${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`).join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');

    try {
        const response = await axios({
            url: `${import.meta.env.VITE_APP_BASE_URL}${url}?${queryString}`,
            method: method,
            headers: headers,
            data: options.body ? options.body : undefined,
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            notifications.showNotification(
                "error",
                "Токен не получен или истек",
                "Пожалуйста, авторизуйтесь снова"
            );
            localStorage.removeItem("token");
            router.push('/login');
        } else {
            console.error(error);
            throw new Error(error.response?.data?.message || 'Request failed');
        }
    }
}
