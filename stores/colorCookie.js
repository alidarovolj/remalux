export const useColorCookieStore = defineStore("colorCookie", () => {
    const colorCookie = useCookie("colorCookie", {
        sameSite: true,
        maxAge: 60 * 60 * 24,
    });

    // Initialize colorCookie value
    colorCookie.value = colorCookie.value || null;

    return {
        colorCookie,
        async saveCookie(color) {
            colorCookie.value = color;
        },
    };
});