export const useCartCookieStore = defineStore("cartCookie", () => {
    const cartCookie = useCookie('cartCookie', {
        sameSite: true,
        maxAge: 60 * 60 * 24,
    });
    const cartItems = ref([]);
    const cart = useCartStore();
    const { cartList } = storeToRefs(cart);
    const cartTotalPrice = ref(0);

    // Watcher to observe changes in cartList or cartCookie
    watch([cartList, cartCookie], () => {
        // Ensure cartList.value and cartList.value.data are not null or undefined
        if (cartList.value && cartList.value.data) {
            const matchingItems = cartList.value.data.filter((item) =>
                cartCookie.value.some((el) => el.id === item.id)
            );

            cartItems.value = matchingItems;

            console.log('Matching items updated:', matchingItems);

            // Automatically check and update any price mismatches
            cartList.value.data.forEach((item) => {
                const match = cartCookie.value.find((el) => el.id === item.id);

                if (match) {
                    if (match.price !== item.price) {
                        console.log(`Price mismatch for item ${item.id}. Updating price from ${match.price} to ${item.price}.`);
                        match.price = item.price;
                        updateCartTotalPrice();
                    }
                }
            });
        } else {
            console.log('cartList or cartList.data is null or undefined');
        }
    }, { deep: true });


    // Helper function to update the total price
    const updateCartTotalPrice = () => {
        cartTotalPrice.value = cartCookie.value.reduce((total, item) => {
            return total + parseInt(item.price);
        }, 0);
    };

    return {
        cartCookie,
        cartTotalPrice,
        cartItems,
        initCookieCart() {
            if (!cartCookie.value) {
                cartCookie.value = [];
            } else {
                updateCartTotalPrice();
            }
        },
        cartGetItems() {
            const matchingItems = cartList.value.data.filter((item) =>
                cartCookie.value.some((el) => el.id === item.id)
            );

            cartItems.value = matchingItems;
        },
        checkChangedCart() {
            cartList.value.data.forEach((item) => {
                const match = cartCookie.value.find((el) => el.id === item.id);

                if (match) {
                    if (match.price !== item.price) {
                        console.log(`Price mismatch for item ${item.id}. Updating price from ${match.price} to ${item.price}.`);
                        match.price = item.price;
                        updateCartTotalPrice();
                    } else {
                        console.log(`Item ${item.id} price is up-to-date.`);
                    }
                } else {
                    console.log(`Item ${item.id} not found in cartCookie.`);
                }
            });
        },
        addOrRemoveItemCart(product) {
            const existingIndex = cartCookie.value.findIndex(
                item => item.id === product.id && item.price === product.price
            );

            if (existingIndex === -1) {
                cartCookie.value.push({
                    id: product.id,
                    price: product.price
                });
            } else {
                cartCookie.value.splice(existingIndex, 1);
            }

            updateCartTotalPrice();
        },
        addAllItemsCart(items) {
            if (cartCookie.value && items && items.data.length > 0 && items.data.length === cartCookie.value.length) {
                cartCookie.value = [];
            } else {
                cartCookie.value = items.data.map(el => ({
                    id: el.id,
                    price: el.price
                }));
            }
            updateCartTotalPrice();
        }
    };
});
