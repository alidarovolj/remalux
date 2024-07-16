import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useNotificationStore = defineStore('notification', () => {
    const notification = ref({
        show: false,
        type: 'success', // can be 'success' or 'error'
        title: '',
        message: ''
    });

    const showNotification = (type, title, message) => {
        notification.value = {
            show: true,
            type,
            title,
            message
        };

        setTimeout(() => {
            notification.value.show = false;
        }, 5000); // Show notification for 5 seconds
    };

    return {
        notification,
        showNotification
    };
});