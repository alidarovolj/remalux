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
            let obj = {
                id: color.id,
                title: color.title,
                image_url: color.image_url,
                hex: color.hex,
            }
            colorForProduct.value = obj;
            console.log(colorForProduct.value)
        },
        async removeCookie() {
            colorForProduct.value = null;
        },
    };
});