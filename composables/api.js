import axios from 'axios';
import {useNotificationStore} from "@/stores/notifications.js";
import {useAuthStore} from "~/stores/auth.js";
import {storeToRefs} from 'pinia';

export async function api(url, method, options = {}, query = {}) {
    const auth = useAuthStore();
    auth.initCookieToken();
    const {token} = storeToRefs(auth);
    const router = useRouter();
    const route = useRoute()
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

    // Combine the passed query params with the route's query params
    const finalQuery = {
        ...params,
        ...route.query
    };

    // Create the query string
    const queryString = new URLSearchParams(finalQuery).toString();

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
        } else {
            console.error(error);
            throw new Error(error.response?.data?.message || 'Request failed');
        }
    }
}
