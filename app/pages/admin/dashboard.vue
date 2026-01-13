<script setup>
import StatsCard from "~/components/StatsCard.vue";

definePageMeta({ layout: "admin" });

const stats = ref([
  {
    id: 1,
    label: "Active Projects",
    value: "1",
    sub: "",
    icon: "project",
    color: "text-purple-400",
  },
  {
    id: 2,
    label: "Active Machines",
    value: "0/9",
    sub: "( Last 24 hrs )",
    icon: "cpu",
    color: "text-blue-400",
  },
  {
    id: 3,
    label: "Number of Users",
    value: "4",
    sub: "",
    icon: "users",
    color: "text-pink-400",
  },
  {
    id: 4,
    label: "Number of Jobs",
    value: "0",
    sub: "( Last 24 hrs )",
    icon: "jobs",
    color: "text-purple-400",
  },
  {
    id: 5,
    label: "Licenses",
    value: "N/A",
    sub: "",
    icon: "license",
    color: "text-yellow-600",
  },
]);
</script>

<template>
  <div class="container-box mt-5">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatsCard
        v-for="stat in stats"
        :key="stat.id"
        :label="stat.label"
        :value="stat.value"
        :sub="stat.sub"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <!-- Resource Utilization section -->
    <div class="container-box h-[650px] overflow-scroll no-scrollbar">
      <h2 class="text-xl font-bold text-gray-200 mb-6">Resource Utilization</h2>

      <!-- FILTERS ROW -->
      <div class="flex flex-wrap gap-6 mb-8">
        <div class="w-72">
          <label class="block text-gray-400 text-xs font-bold mb-2"
            >Project</label
          >
          <div class="relative">
            <select
              v-model="selectedProject"
              class="w-full bg-[#161b22] border border-gray-700 text-gray-300 text-sm rounded-md px-4 py-2.5 appearance-none focus:border-purple-500 outline-none"
            >
              <option value="" disabled selected>Project</option>
              <option value="1">Aerodynamics</option>
              <option value="2">Thermal</option>
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

        <div class="w-72">
          <label class="block text-gray-400 text-xs font-bold mb-2"
            >Cluster</label
          >
          <div class="relative">
            <select
              v-model="selectedCluster"
              class="w-full bg-[#161b22] border border-gray-700 text-gray-300 text-sm rounded-md px-4 py-2.5 appearance-none focus:border-purple-500 outline-none"
            >
              <option value="" disabled selected>Cluster</option>
              <option value="1">Alpha Node</option>
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
      <div
        class="flex items-center justify-between flex-wrap gap-4 mb-8 text-sm"
      >
        <div class="flex items-center gap-12">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 bg-[#1f2633] border border-gray-700 rounded flex items-center justify-center text-[10px] text-gray-500 text-center leading-tight"
            >
              No<br />Image
            </div>
            <div class="flex flex-col items-center">
              <p class="text-gray-400 text-xs mb-1">Cluster Owner</p>
              <p class="text-white font-bold">-</p>
            </div>
            <div class="flex flex-col items-center">
              <p class="text-gray-400 text-xs mb-1">Email</p>
              <p class="text-white font-bold">-</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1 w-64">
          <div class="flex justify-between w-full text-xs text-gray-400">
            <span>Shared Storage</span><span>Allocated: 0 MB</span>
          </div>
          <div class="w-full h-2 bg-[#1f2633] rounded-full overflow-hidden">
            <div class="h-full bg-blue-600 w-[0%]"></div>
          </div>
          <div class="text-[10px] text-gray-500 self-start">Used: 0 MB</div>
        </div>
      </div>

      <!-- CHART PLACEHOLDER -->
      <div
        class="bg-[#161b22] border border-gray-800 rounded-lg p-6 min-h-[400px] flex flex-col relative"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-md font-bold text-gray-200">Cluster Utilization</h3>
          <div class="relative">
            <select
              class="bg-[#0f111a] border border-gray-700 text-gray-300 text-xs rounded px-3 py-1 outline-none appearance-none pr-8"
            >
              <option>6 hr</option>
              <option>12 hr</option>
              <option>24 hr</option>
            </select>
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
        <div
          class="flex-1 flex items-center justify-center text-gray-500 text-sm"
        >
          Please choose a project and cluster to view data
        </div>
      </div>
      <!--Job analytics section -->
      <section class="w-full py-8">
        <!-- Title -->
        <h2 class="text-lg font-semibold text-slate-200 mb-4">Job Analytics</h2>

        <!-- Card -->
        <div
          class="overflow-hidden rounded-xl border border-slate-800 bg-[url('/images/bg-dashboard.png')] bg-no-repeat bg-cover bg-center shadow-xl"
        >
          <!-- Content -->
          <div class="relative p-6">
            <h3 class="text-sm font-medium text-slate-300 mb-6">
              Job Overview
            </h3>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <!-- Metric -->
              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-400">Total</span>
                <span class="text-3xl font-semibold text-white">0</span>
              </div>

              <!-- Divider -->
              <div
                class="hidden md:block absolute left-1/4 top-20 bottom-6 w-px bg-slate-800"
              ></div>

              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-400">Success</span>
                <span class="text-3xl font-semibold text-white">0</span>
              </div>

              <div
                class="hidden md:block absolute left-2/4 top-20 bottom-6 w-px bg-slate-800"
              ></div>

              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-400">Failures</span>
                <span class="text-3xl font-semibold text-white">0</span>
              </div>

              <div
                class="hidden md:block absolute left-3/4 top-20 bottom-6 w-px bg-slate-800"
              ></div>

              <div class="flex flex-col gap-1">
                <span class="text-xs text-slate-400">Average Wait Time</span>
                <span class="text-3xl font-semibold text-white">
                  0 <span class="text-sm font-medium text-slate-400">sec</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- User details -->
      <section class="w-full py-8">
        <!-- Title -->

        <!-- Card -->
        <div
          class="overflow-hidden rounded-xl border border-slate-800 bg-[#1C1F28] shadow-xl flex flex-col items-center justify-center"
        >
          <div class="w-full flex justify-between container-box">
            <h2 class="text-lg font-semibold text-slate-200 mb-4">
              User details
            </h2>
            <!-- <select
              class="w-40 bg-[#0f111a] border border-gray-700 text-gray-300 text-xs rounded px-3 py-1 outline-none appearance-none pr-8"
            >
              <option>All</option>
            </select> -->
            <div class="relative w-40 text-sm">
              <!-- Trigger -->
              <button
                id="dropdownButton"
                class="flex w-full items-center justify-between rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200 hover:bg-slate-800"
                onclick="toggleDropdown()"
              >
                <span>All</span>
                <svg
                  class="h-4 w-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <!-- Dropdown -->
              <div
                id="dropdownMenu"
                class="absolute z-10 mt-1 hidden w-full rounded-md border border-slate-700 bg-slate-900 shadow-lg"
              >
                <div
                  class="cursor-pointer rounded-sm px-3 py-2 text-slate-200 hover:bg-slate-800 bg-slate-800"
                >
                  All
                </div>
              </div>
            </div>
          </div>
          <!-- Content -->
          <div
            class="p-6 m-6 flex items-center justify-center rounded-xl text-center border border-gray-800 w-full"
          >
            <h3 class="text-sm font-medium text-slate-300">Job Overview</h3>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
