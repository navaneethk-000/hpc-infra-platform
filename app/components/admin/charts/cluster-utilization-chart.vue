<script setup>
import { ref, computed, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  clusterId: { type: String, required: true },
  timeRange: { type: String, default: "6h" },
});

const loading = ref(false);
const chartKey = ref(0); // Force re-render key

// --- SERIES DATA ---
const series = ref([]);
const categories = ref([]);

// --- CHART OPTIONS (Scale: -1 to 1) ---
const chartOptions = computed(() => ({
  chart: {
    type: "line",
    height: 320,
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent",
    animations: { enabled: false },
    fontFamily: "Inter, sans-serif",
  },
  theme: { mode: "dark" },
  colors: ["#F87171", "#C084FC", "#60A5FA"], // Red, Purple, Blue
  stroke: { curve: "straight", width: 2 },
  markers: { size: 0 },
  grid: {
    borderColor: "#1f2937",
    strokeDashArray: 0,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
  },
  xaxis: {
    categories: categories.value,
    labels: {
      rotate: -45,
      style: { colors: "#9ca3af", fontSize: "11px" },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
  },
  yaxis: [
    // Left Y-Axis: CPU/Memory
    {
      min: -1,
      max: 1,
      tickAmount: 10,
      title: { text: "CPU & Memory Usage (%)", style: { color: "#6b7280" } },
      labels: {
        formatter: (val) => val.toFixed(1),
        style: { colors: "#6b7280" },
      },
    },
    // Right Y-Axis: Load
    {
      opposite: true,
      min: -1,
      max: 1,
      tickAmount: 10,
      title: { text: "Load", rotate: 90, style: { color: "#3B82F6" } },
      labels: {
        formatter: (val) => val.toFixed(1),
        style: { colors: "#3B82F6" },
      },
    },
  ],
  legend: {
    position: "bottom",
    horizontalAlign: "left",
    offsetY: 8,
    markers: { width: 8, height: 8, radius: 12 },
    labels: { colors: "#d1d5db" },
    itemMargin: { horizontal: 12 },
  },
  tooltip: { enabled: true, theme: "dark" },
}));

// --- DATA SIMULATION (No API Call) ---
const fetchData = async () => {
  if (!props.clusterId) return;
  loading.value = true;

  // Simulate network delay
  setTimeout(() => {
    const points = 12;
    const now = new Date();

    // Generate random values between 0.0 and 0.8
    // To match the scale -1 to 1, we keep them positive small floats
    const randomData = () =>
      Array.from({ length: points }, () => (Math.random() * 0.8).toFixed(2));

    // Generate Time Labels
    categories.value = Array.from({ length: points }, (_, i) => {
      const d = new Date(now);
      d.setMinutes(d.getMinutes() - (points - i) * 30);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    });

    // Update Series
    series.value = [
      { name: "CPU", data: randomData() },
      { name: "Memory", data: randomData() },
      { name: "Load", data: randomData() },
    ];

    loading.value = false;
    chartKey.value++; // Force Chart Refresh
  }, 600);
};

// --- WATCHERS ---
watch(() => [props.clusterId, props.timeRange], fetchData, { immediate: true });
</script>

<template>
  <div class="w-full h-full relative">
    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-[#161b22]/80 z-10 backdrop-blur-sm"
    >
      <div
        class="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <!-- Chart -->
    <ClientOnly>
      <VueApexCharts
        :key="chartKey"
        type="line"
        height="320"
        width="100%"
        :options="chartOptions"
        :series="series"
      />
    </ClientOnly>
  </div>
</template>
