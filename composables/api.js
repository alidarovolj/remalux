import {useNotificationStore} from "@/stores/notifications.js";
import {useAuthStore} from "~/stores/auth.js";

export async function api(url, method, options = {}, query = {}) {
    const auth = useAuthStore()
    auth.initCookieToken()
    const {token} = storeToRefs(auth)
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

    const requestOptions = {
        method: method,
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}${url}?${queryString}`, requestOptions);

        if (!response.ok) {
            if (response.status === 401) {
                notifications.showNotification(
                    "error",
                    "Токен не получен или истек",
                    "Пожалуйста, авторизуйтесь снова"
                );
                localStorage.removeItem("token");
                router.push('/login');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}
