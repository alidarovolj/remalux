export const useAuthStore = defineStore("auth", () => {
    const token = ref();
    return {
        token,
        async initCookieToken() {
            const cookie = useCookie("token", {
                sameSite: true,
                maxAge: 60 * 60 * 24,
            });
            token.value = cookie.value;
            watch(token, () => (cookie.value = token.value));
        },
    };
});