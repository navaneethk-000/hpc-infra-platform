<script setup>
definePageMeta({ layout: 'admin' });

// Mock Data
const users = ref([
  { id: 1, name: 'Alice Admin', email: 'admin@hpc.com', role: 'IT_MANAGER', status: 'Active' },
  { id: 2, name: 'Bob Builder', email: 'cad@hpc.com', role: 'CAD_MANAGER', status: 'Active' },
  { id: 3, name: 'John Dev', email: 'dev@hpc.com', role: 'DEVELOPER', status: 'Offline' },
]);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">User Management</h1>
      <button class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-bold">
        + Add New User
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-[#1a1f2b] border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <table class="w-full text-left border-collapse">
        <thead class="bg-[#232A38] text-gray-400 text-sm uppercase">
          <tr>
            <th class="p-4 border-b border-gray-700">Name</th>
            <th class="p-4 border-b border-gray-700">Email</th>
            <th class="p-4 border-b border-gray-700">Role</th>
            <th class="p-4 border-b border-gray-700">Status</th>
            <th class="p-4 border-b border-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-300 text-sm">
          <tr v-for="u in users" :key="u.id" class="hover:bg-gray-800/50 border-b border-gray-700 last:border-0 transition-colors">
            <td class="p-4 font-medium text-white">{{ u.name }}</td>
            <td class="p-4">{{ u.email }}</td>
            <td class="p-4">
              <span class="px-2 py-1 rounded text-xs font-bold"
                :class="{
                  'bg-red-900/50 text-red-300 border border-red-800': u.role === 'IT_MANAGER',
                  'bg-green-900/50 text-green-300 border border-green-800': u.role === 'CAD_MANAGER',
                  'bg-blue-900/50 text-blue-300 border border-blue-800': u.role === 'DEVELOPER',
                }">
                {{ u.role.replace('_', ' ') }}
              </span>
            </td>
            <td class="p-4">
              <span class="flex items-center gap-1.5" :class="u.status === 'Active' ? 'text-green-400' : 'text-gray-500'">
                <div class="w-1.5 h-1.5 rounded-full" :class="u.status === 'Active' ? 'bg-green-400' : 'bg-gray-500'"></div>
                {{ u.status }}
              </span>
            </td>
            <td class="p-4 text-right">
              <button class="text-blue-400 hover:text-white mr-3">Edit</button>
              <button class="text-red-400 hover:text-white">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>