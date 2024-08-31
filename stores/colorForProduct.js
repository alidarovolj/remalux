import {defineStore} from 'pinia';

export const useColorForProductStore = defineStore("colorForProduct", () => {
    const colorForProduct = useCookie("colorForProduct", {
        sameSite: 'strict', // Corrected to a string
        maxAge: 60 * 60 * 24,
    });

    colorForProduct.value = colorForProduct.value || null;

    return {
        colorForProduct,
        async saveCookie(color) {
            colorForProduct.value = color;
            console.log(colorForProduct.value)
        },
        async removeCookie() {
            colorForProduct.value = null;
        },
    };
});