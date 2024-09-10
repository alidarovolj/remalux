import axios from 'axios'

async function getStore() {
    const { data } = await axios.get('https://api.remalux.kz/api/products/paginated?page=1&perPage=100')

    return data.data.map(item => `/store/${item.id}`)
}

export default defineNuxtConfig({
    hooks: {
        async 'nitro:config'(nitroConfig) {
            if (nitroConfig.dev) return

            let slugs = await getStore();
            nitroConfig.prerender.routes.push(...slugs);
            return
        },
    },

    app: {
        head: {
            link: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
                { rel: 'manifest', href: '/favicon/site.webmanifest' },
            ],
            meta: [
                { name: 'msapplication-TileColor', content: '#da532c' },
                { name: 'theme-color', content: '#ffffff' },
            ],
            script: [
                {
                    src: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=1abcd0bf-59be-4a9a-8721-eb1c7919924b&suggest_apikey=32f1a6de-cbcd-47e3-875d-10e4c212ef50&mode=debug&load=package.full&onload=mscDistance.Ymaps.ready&ns=ymaps',
                    async: true,
                },
                {
                    src: "//code.jivosite.com/widget/nEEcAaqS9s",
                    async: true,
                }
            ],
        },
    },


    devtools: {enabled: true},
    css: [
        '~/assets/css/main.css',
        '~/assets/css/fonts.css'
    ],

    i18n: {
        lazy: true,
        langDir: "locales/",
        strategy: "prefix_except_default",
        defaultLocale: "ru-RU",
        locales: [
            {
                code: "en-US",
                iso: "en-US",
                name: "English",
                sh_name: "en",
                file: "en-US.json",
            },
            {
                code: "kz-KZ",
                iso: "kz-KZ",
                name: "Қазақ",
                sh_name: "kz",
                file: "kz-KZ.json",
            },
            {
                code: "ru-RU",
                iso: "ru-RU",
                name: "Русский",
                sh_name: "ru",
                file: "ru-RU.json",
            },
        ],
        detectBrowserLanguage: false,
        vueI18n: "./i18n.config.ts",
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    compatibilityDate: '2024-07-14',

    imports: {
        dirs: [
            "stores",
            "composables",
            "composables/*/index.{ts,js,mjs,mts}",
            "composables/**",
        ],
    },

    modules: ["vue3-carousel-nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "nuxt-aos"],
    carousel: {
        prefix: 'my-carousel',
    }
})