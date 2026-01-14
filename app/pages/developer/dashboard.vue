<script setup>
import RightSidebar from "~/components/developer/RightSidebar.vue";

definePageMeta({ layout: "developer" });

const open = ref(false);
</script>

<template>
  <!-- Page Title -->
  <h1 class="text-2xl font-semibold mb-6">Projects</h1>

  <!-- Card -->
  <div
    v-if="!value"
    class="rounded-xl border border-gray-700 bg-[#1a1f2b] shadow-lg"
  >
    <div class="px-6 py-4 border-b border-slate-800">
      <h2 class="text-lg font-medium">All Projects</h2>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto p-6">
      <table class="w-full text-sm">
        <thead class="text-slate-400">
          <tr class="border-b border-slate-800">
            <th class="py-3 text-left font-medium">Name</th>
            <th class="py-3 text-left font-medium">Start Date</th>
            <th class="py-3 text-left font-medium">Status</th>
            <th class="py-3 text-left font-medium">Clusters</th>
            <th class="py-3 text-left font-medium">Users</th>
            <th class="py-3 text-left font-medium">Id</th>
            <th class="py-3"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="border-b border-slate-800 hover:bg-slate-800/40 transition"
          >
            <td class="py-4 font-medium">Alpha Project</td>
            <td class="py-4">05-01-2026</td>
            <td class="py-4">
              <span
                class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30"
              >
                ACTIVE
              </span>
            </td>
            <td class="py-4">14</td>
            <td class="py-4">—</td>
            <td class="py-4 text-slate-400">
              fb87d012-b07d-45d5-b4cf-4427a88d4f60
            </td>
            <td class="py-4 text-right">
              <button
                class="rounded-md bg-indigo-600 px-4 py-2 text-white"
                @click="open = true"
              >
                View Project
              </button>

              <RightSidebar v-model="open">
                <!-- Your project details UI goes here -->
                <h3 class="text-xl font-semibold mb-6">Alpha Project</h3>

                <div class="grid grid-cols-2 gap-4 mb-8">
                  <div class="rounded-xl bg-slate-900 p-5">
                    <p class="text-slate-400 text-sm">Clusters</p>
                    <p class="text-3xl font-bold mt-2">14</p>
                  </div>
                  <div class="rounded-xl bg-slate-900 p-5">
                    <p class="text-slate-400 text-sm">Users</p>
                    <p class="text-3xl font-bold mt-2">0</p>
                  </div>
                </div>
              </RightSidebar>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <h1 class="text-3xl font-bold mb-6">My Workspace</h1>
    <div
      class="bg-[#1a1f2b] p-6 rounded-lg border border-gray-700 h-64 flex items-center justify-center"
    >
      <p class="text-gray-500">No projects found.</p>
    </div>
  </div>
</template>
