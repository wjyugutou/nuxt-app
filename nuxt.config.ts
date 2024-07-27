import { shikiConfig } from './assets/shiki'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  experimental: {
    typedPages: true,
  },
  app: {
    head: {
      script: [
        {
          innerHTML: `
          ;(function () {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            const setting = localStorage.getItem('color-schema') || 'auto'
            if (setting === 'dark' || (prefersDark && setting !== 'light')) document.documentElement.classList.toggle('dark', true)
          })()`,
        },
      ],
    },

  },
  css: ['@unocss/reset/tailwind.css', 'virtual:uno.css', '/assets/styles/global.css'],
  modules: ['@vueuse/nuxt', 'nuxt-shiki', '@unocss/nuxt'],
  shiki: {
    defaultTheme: shikiConfig.defaultTheme,
    bundledThemes: shikiConfig.bundledThemes,
    bundledLangs: shikiConfig.bundledLangs,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
