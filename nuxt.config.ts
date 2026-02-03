export default defineNuxtConfig({
  app: {
    head: {
      title: "HPCINFRA",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon-hpcinfra.svg",
        },
      ],
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vesp/nuxt-fontawesome"],
  routeRules: {
    "/proxy-api/**": {
      proxy: "https://tenant.hpcinfra.com/api/**",
    },
  },
  fontawesome: {
    icons: {
      solid: ["cog"],
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  css: [
    "./assets/main.css", // Changed to relative path
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],

  plugins: [
    "./plugins/fontawesome.js", // Changed to relative path
  ],
});
