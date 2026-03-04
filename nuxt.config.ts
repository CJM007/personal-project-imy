// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/302610765e.js",
          crossorigin: "anonymous",
          defer: true,
        },
      ],
    },
  },
  nitro: {
    preset: "netlify",
  },
  runtimeConfig: {
    githubToken: process.env.NUXT_GITHUB_TOKEN,
    historyApiId: process.env.NUXT_HISTORY_API_ID,
    historyApiKey: process.env.NUXT_HISTORY_API_KEY,
  },
});
