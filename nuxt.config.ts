// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/',
    buildAssetsDir: '/assets/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#3b82f6' }
      ]
    }
  },
  nitro: {
    preset: 'static',
    output: {
      dir: '.output/public'
    }
  },
  modules: ["@nuxt/ui"],
  compatibilityDate: "2025-02-18",
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  ui: {
    global: true,
    icons: ['heroicons', 'mdi']
  },
  css: ['~/assets/css/main.css']
})