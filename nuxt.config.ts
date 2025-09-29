// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    head: {
      title: 'Redirection en cours...',
      meta: [
        { name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
})
