// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    'shadcn-nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  devServer: {
    port: 9799
  },
  ssr: false,
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      duration: 300
    }
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
    quality: 75,
    formats: ['webp', 'avif']
  }
})