import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useModalsStore = defineStore('modals', () => {
    const modal = ref({
        show: false,
        modalName: '',
        modalData: null
    });

    const showModal = (modalName, modalData) => {
        modal.value = {
            show: true,
            modalName: modalName,
            modalData: modalData
        };
    };

    return {
        modal,
        showModal
    };
});