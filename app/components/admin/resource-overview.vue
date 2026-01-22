<script setup>
const selectedProject = ref("");
const selectedCluster = ref("");
</script>

<template>
  <div class="py-6 px-1 h-auto">
    <h2 class="text-xl font-bold text-gray-200 mb-6">Resource Utilization</h2>

    <!-- FILTERS -->
    <div class="flex flex-wrap gap-6 mb-8">
      <!-- Project Select -->
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
            <option value="1">Alpha project</option>
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
    <div class="flex items-center justify-between flex-wrap gap-4 mb-8 text-sm">
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
  </div>
</template>
