import {useNotificationStore} from "~/stores/notifications.js";

export const useCompareCookieStore = defineStore("compareCookie", () => {
    const compareCookie = useCookie("compareCookie", {
        sameSite: true,
        maxAge: 60 * 60 * 24,
    });
    const router = useRouter()
    const allProducts = ref([])
    const localePath = useLocalePath()
    const notifications = useNotificationStore()

    // Initialize compareCookie value
    compareCookie.value = compareCookie.value || [];

    return {
        compareCookie,
        allProducts,
        async saveCookie(product) {
            compareCookie.value.push(product.id);
            notifications.showNotification('success', 'Успешно', 'Краска добавлена в сравнение');
            await router.push(localePath('/compareProducts'));
        },
        async removeCookie(id) {
            compareCookie.value = compareCookie.value.filter((product) => product !== id.id);
            const products = useProductsStore();
            await products.getProducts()
            allProducts.value = products.productsList.data.filter((product) => compareCookie.value.includes(product.id));
            notifications.showNotification('success', 'Успешно', 'Выбранная краска удалена из сравнения')
        },
        async getCompareProducts() {
            const products = useProductsStore();
            await products.getProducts()
            allProducts.value = products.productsList.data.filter((product) => compareCookie.value.includes(product.id));
        }
    };
});