<script setup>
import ClusterUtilizationChart from "./charts/cluster-utilization-chart.vue";

// 1. Setup Auth & API
const tokenCookie = useCookie("token");
const apiUrl = "https://tenant.hpcinfra.com/api/v1/projects/?limit=50";

// 2. Fetch Projects
const { data: apiResponse, error } = await useFetch(apiUrl, {
  method: "GET",
  headers: { Authorization: `Bearer ${tokenCookie.value}` },
  onRequest({ options }) {
    let t = tokenCookie.value;
    if (t && typeof t === "object" && t.AccessToken) t = t.AccessToken;
    if (t) options.headers.Authorization = `Bearer ${t}`;
  },
});

// 3. State
const selectedProjectId = ref("");
const selectedClusterId = ref("");
// const selectedTimeRange = ref("6 hr"); // New State for Time

const timeOptions = [
  { label: "6 hr", value: "6h" },
  { label: "12 hr", value: "12h" },
  { label: "24 hr", value: "24h" },
  { label: "7 Days", value: "7d" },
];
const selectedTimeRange = ref(timeOptions[0].value);

// 4. Computed Helpers
const projects = computed(() => apiResponse.value?.project || []);

const currentProject = computed(() => {
  return projects.value.find((p) => p.id === selectedProjectId.value) || null;
});

const clusterOptions = computed(() => {
  return currentProject.value?.resources || [];
});

const currentCluster = computed(() => {
  return (
    clusterOptions.value.find((c) => c.id === selectedClusterId.value) || null
  );
});

watch(selectedProjectId, () => {
  selectedClusterId.value = "";
});

const storageAllocated = computed(
  () => currentCluster.value?.storage_size || 0,
);
const storageUsed = ref(0);
const storagePercent = computed(() => {
  if (!storageAllocated.value) return 0;
  return Math.min(100, (storageUsed.value / storageAllocated.value) * 100);
});
</script>

<template>
  <div class="py-6 px-1 h-auto">
    <h2 class="text-xl font-bold text-gray-200 mb-6">Resource Utilization</h2>

    <!-- FILTERS (Dropdowns) -->
    <div class="flex flex-wrap gap-6 mb-8">
      <!-- Project Select -->
      <div class="w-72">
        <label class="block text-gray-400 text-xs font-bold mb-2"
          >Project</label
        >
        <div class="relative">
          <select
            v-model="selectedProjectId"
            class="w-full bg-[#161b22] border border-gray-700 text-gray-300 text-sm rounded-md px-4 py-2.5 appearance-none focus:border-purple-500 outline-none"
          >
            <option value="" disabled>Select Project</option>
            <option v-for="p in projects" :key="p.id" :value="p.id">
              {{ p.name }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Cluster Select -->
      <div class="w-72">
        <label class="block text-gray-400 text-xs font-bold mb-2"
          >Cluster</label
        >
        <div class="relative">
          <select
            v-model="selectedClusterId"
            :disabled="!selectedProjectId"
            class="w-full bg-[#161b22] border border-gray-700 text-gray-300 text-sm rounded-md px-4 py-2.5 appearance-none focus:border-purple-500 outline-none disabled:opacity-50"
          >
            <option value="" disabled>
              {{
                clusterOptions.length
                  ? "Select Cluster"
                  : "No Clusters Available"
              }}
            </option>
            <option v-for="c in clusterOptions" :key="c.id" :value="c.id">
              {{ c.name }} ({{ c.status }})
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- INFO STRIP -->
    <div class="flex items-center justify-between flex-wrap gap-4 mb-8 text-sm">
      <div class="flex items-center gap-12">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 bg-[#1f2633] border border-gray-700 rounded flex items-center justify-center text-[10px] text-gray-500 text-center leading-tight"
          >
            No<br />Image
          </div>
          <div class="flex flex-col">
            <p class="text-gray-400 text-xs mb-1">Project/Owner</p>
            <p class="text-white font-bold">
              {{ currentProject ? currentProject.name : "-" }}
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-gray-400 text-xs mb-1">OS Type</p>
            <p class="text-white font-bold">
              {{ currentCluster ? currentCluster.os_name : "-" }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end gap-1 w-64">
        <div class="flex justify-between w-full text-xs text-gray-400">
          <span>Shared Storage</span
          ><span>Allocated: {{ storageAllocated }} GB</span>
        </div>
        <div class="w-full h-2 bg-[#1f2633] rounded-full overflow-hidden">
          <div
            class="h-full bg-blue-600 transition-all duration-500"
            :style="{ width: `${storagePercent}%` }"
          ></div>
        </div>
        <div class="text-[10px] text-gray-500 self-start">
          Used: {{ storageUsed }} GB
        </div>
      </div>
    </div>

    <!-- CHART CARD -->
    <!-- CHART CARD -->
    <div
      class="bg-[#161b22] border border-gray-800 rounded-lg p-6 min-h-[400px] flex flex-col relative"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-md font-bold text-gray-200">Cluster Utilization</h3>

        <!-- Dynamic Time Filter -->
        <div class="relative">
          <select
            v-model="selectedTimeRange"
            class="bg-[#0f111a] border border-gray-700 text-gray-300 text-xs rounded px-3 py-1 outline-none appearance-none pr-8 hover:border-gray-500 transition-colors cursor-pointer"
          >
            <option
              v-for="opt in timeOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>

          <!-- Dropdown Icon -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"
          >
            <svg
              class="fill-current h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Logic: Show Chart only if Cluster Selected -->
      <div
        v-if="!selectedClusterId"
        class="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-20"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
        <span class="text-sm"
          >Please choose a project and cluster to view data</span
        >
      </div>

      <div v-else class="w-full flex-1 min-h-0">
        <!-- The Chart Component receives the dynamic time range -->
        <cluster-utilization-chart
          :cluster-id="selectedClusterId"
          :time-range="selectedTimeRange"
        />
      </div>
    </div>
  </div>
</template>
