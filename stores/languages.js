import {defineStore} from "pinia";

export const useLanguagesStore = defineStore("languages", () => {
    const {locales, locale} = useI18n();
    const currentLocale = ref(locales.value.find((l) => l.code === locale.value));
    const cur_lang = ref(currentLocale.value.sh_name);

    watch(locale, (newVal) => {
        const newLocale = locales.value.find((l) => l.code === newVal);
        cur_lang.value = newLocale.sh_name;
    });

    return {
        cur_lang,
    };
});