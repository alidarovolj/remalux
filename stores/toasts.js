import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useToastsStore = defineStore('toasts', () => {
    const toast = ref({
        show: false,
        type: '',
        title: '',
        message: ''
    });

    const showToast = (type, title, message) => {
        toast.value = {
            show: true,
            type,
            title,
            message
        };

        setTimeout(() => {
            toast.value.show = false;
        }, 5000); // Show notification for 5 seconds
    };

    return {
        toast,
        showToast
    };
});