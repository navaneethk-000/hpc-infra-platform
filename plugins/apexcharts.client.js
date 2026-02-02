import VueApexCharts from "vue3-apexcharts";

export default defineNuxtPlugin((nuxtApp) => {
  // Register the component globally with the name 'apexchart'
  nuxtApp.vueApp.component("apexchart", VueApexCharts);
});
