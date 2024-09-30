import {defineStore} from "pinia";
import {useNotificationStore} from "~/stores/notifications.js";

export const useProductsStore = defineStore("products", () => {
    const productsList = ref(null);
    const detailProduct = ref(null);
    const sameProducts = ref(null);
    const relatedProducts = ref(null);
    const variantsList = ref(null);
    const favouriteProducts = ref(null);
    const addedFavouriteProducts = ref(null);
    const removedFavouriteProducts = ref(null);
    const productReviews = ref(null);
    const productReviewsRating = ref(null);
    const helpfulReview = ref(null);
    const isReviewedOrNo = ref(null);
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
        favouriteProducts,
        addedFavouriteProducts,
        removedFavouriteProducts,
        productReviews,
        productReviewsRating,
        helpfulReview,
        isReviewedOrNo,
        async getProducts() {
            try {
                const response = await api(`/api/products/paginated`, "GET", {}, route.query);
                productsList.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getProductReviews(id) {
            try {
                const response = await api(`/api/products/${id}/reviews`, "GET", {}, route.query);
                productReviews.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async getProductReviewsRating(id) {
            try {
                const response = await api(`/api/products/${id}/reviews/rating`, "GET", {}, route.query);
                productReviewsRating.value = response;
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
        async setReviewHelpful(form, id, review) {
            try {
                const response = await api(`/api/products/${id}/reviews/${review}/helpful`, "PATCH", {
                    body: JSON.stringify(form)
                }, route.query);
                helpfulReview.value = response;
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async isReviewed(id) {
            try {
                const response = await api(`/api/products/${id}/reviews/mark-exists`, "GET", {}, route.query);
                isReviewedOrNo.value = response;
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
        async getFavouriteProducts() {
            try {
                const response = await api(`/api/favourite-products`, "GET", {}, route.query);
                favouriteProducts.value = response;
            } catch (e) {
                // notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async addToFavouriteProducts(id) {
            try {
                const response = await api(`/api/favourite-products`, "POST", {
                    body: {
                        product_id: id
                    }
                }, route.query);
                addedFavouriteProducts.value = response;
                this.getProducts()
                this.getVariantsList()
            } catch (e) {
                notifications.showNotification("error", "Произошла ошибка", e);
            }
        },
        async removeFromFavouriteProducts(id) {
            const query = { ...route.query, product_id: id };
            try {
                const response = await api(`/api/favourite-products`, "DELETE", {}, query);
                removedFavouriteProducts.value = response;
                this.getProducts()
                this.getVariantsList()
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