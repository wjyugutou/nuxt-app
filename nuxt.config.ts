import vitePluginsHRM from './nuxtPlugins'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'zh' },
      link: [
        { rel: 'icon', type: 'ico', href: '/favicon.ico' },
      ],
      title: 'Nuxt App',
      script: [
        {
          children: `
            ;(function () {
              const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
              const setting = localStorage.getItem('color-schema') || 'auto'
              if (setting === 'dark' || (prefersDark && setting !== 'light')) document.documentElement.classList.toggle('dark', true)
            })()
          `,
        },
      ],
      noscript: [
        { children: 'JavaScript is required' },
      ],
    },
  },
  build: {
    analyze: {
      enabled: true,
    },
  },
  nitro: {
    // gzip
    compressPublicAssets: true,
  },
  vite: {
    plugins: [vitePluginsHRM()],
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace'],
    },
    build: {
      assetsDir: '_nuxt/assets/',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: '_nuxt/[ext]/[name]-[hash].[ext]',
          chunkFileNames: '_nuxt/js/[name]-[hash].js',
        },
      },
    }
  },
  css: [
    '@unocss/reset/tailwind.css',
    'virtual:uno.css',
    'assets/styles/index.css',
  ],
  components: [
    {
      path: '@/components',
      extensions: ['.vue'],
    },
  ],
  routeRules: {
    // 主页在构建时预渲染
    '/': { prerender: true },
    '/demolist/**': { ssr: false },
    // // 产品页面按需生成，后台自动重新验证
    // '/products/**': { swr: 3600 },
    // // 博客文章按需生成，直到下一次部署前持续有效
    // '/blog/**': { isr: true },
    // // 管理仪表板仅在客户端渲染
    // '/admin/**': { ssr: false },
    // // 在API路由上添加cors头
    // '/api/**': { cors: true },
    // // 跳转旧的URL
    // '/old-page': { redirect: '/new-page' }
  },
  modules: [
    '@unocss/nuxt', '@vueuse/nuxt',
  ],
})
