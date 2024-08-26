import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useProductsStore = defineStore("products", () => {
    const productsList = ref(null);
    const detailProduct = ref(null);
    const sameProducts = ref(null);
    const relatedProducts = ref(null);
    const variantsList = ref(null);
    const savedVariant = useCookie("savedVariant", {
        sameSite: true,
        maxAge: 60 * 60 * 24,
    });
    const route = useRoute()
    const notifications = useNotificationStore()

    return {
        productsList,
        detailProduct,
        sameProducts,
        relatedProducts,
        variantsList,
        savedVariant,
        async getProducts() {
            try {
                const response = await api(`/api/products/paginated`, "GET", {}, route.query);
                productsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getVariantsList() {
            try {
                const response = await api(`/api/product-variants`, "GET", {}, route.query);
                variantsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getDetailProduct(id) {
            try {
                const response = await api(`/api/products/${id}`, "GET", {}, route.query);
                detailProduct.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getSameProducts(id) {
            try {
                const response = await api(`/api/products/${id}/same-products`, "GET", {}, route.query);
                sameProducts.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getRelatedProducts(id) {
            try {
                const response = await api(`/api/products/${id}/related-products`, "GET", {}, route.query);
                relatedProducts.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async saveVariant(variant) {
            savedVariant.value = variant;
        },
        async removeVariant() {
            savedVariant.value = null;
        },
    };
});