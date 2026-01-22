<script setup>
// State for Sidebar
const isSidebarOpen = ref(false);
const selectedRequest = ref(null);

// Mock Data
const requests = ref([
  {
    id: 1,
    project: "Alpha Project",
    user: "nizarcad",
    budget: "100000",
    date: "2026-01-05",
    priority: "Medium",
    status: "APPROVED",
  },
  // Add more rows here later
]);

// Actions
const openRequest = (req) => {
  selectedRequest.value = req;
  isSidebarOpen.value = true;
};
</script>

<template>
  <section class="py-4">
    <div
      class="overflow-hidden rounded-xl border border-slate-800 bg-[#1C1F28] shadow-xl flex flex-col justify-center p-6"
    >
      <h2 class="text-lg font-semibold text-white mb-1">Requests</h2>
      <p class="text-sm text-gray-400 mb-6">
        *You can view the Project Resource Pool Quota Requests here.
      </p>

      <div
        class="overflow-scroll rounded-lg border border-gray-800 no-scrollbar"
      >
        <table class="min-w-full text-sm text-left">
          <thead class="text-gray-400 tracking-wide bg-[#161b22]">
            <tr>
              <th class="px-6 py-4 font-medium">Requests</th>
              <th class="px-6 py-4 font-medium">Submitted By</th>
              <th class="px-6 py-4 font-medium">Budget</th>
              <th class="px-6 py-4 font-medium">Date</th>
              <th class="px-6 py-4 font-medium">Priority</th>
              <th class="px-6 py-4 font-medium">Status</th>
              <th class="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <!-- Using v-for now -->
            <tr v-for="req in requests" :key="req.id">
              <td class="px-6 py-4 text-white font-medium">
                {{ req.project }}
              </td>
              <td class="px-6 py-4 text-gray-300">{{ req.user }}</td>
              <td class="px-6 py-4 text-gray-300">{{ req.budget }}</td>
              <td class="px-6 py-4 text-gray-300">{{ req.date }}</td>
              <td class="px-6 py-4 text-gray-300">{{ req.priority }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-900/40 text-green-400"
                >
                  {{ req.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <!-- Button triggers the function -->
                <button
                  @click="openRequest(req)"
                  class="px-4 py-2 rounded-md text-sm text-gray-200 bg-[#222731] hover:bg-[#263355] transition"
                >
                  View Request
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- The Sidebar Component -->
    <admin-request-details-sidebar
      :is-open="isSidebarOpen"
      :request="selectedRequest"
      @close="isSidebarOpen = false"
    />
  </section>
</template>
