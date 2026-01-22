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
    "/home/navaneeth/hpc-infra-platform/app/assets/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],

  plugins: [
    "/home/navaneeth/hpc_infra_platform/hpc_infra_platform/plugins/fontawesome.js", // register the plugin
  ],
});
