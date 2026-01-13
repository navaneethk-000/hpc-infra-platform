<script setup>
definePageMeta({ layout: 'cad-manager' });

// Mock Projects
const projects = ref([
  { id: 101, title: 'Aerodynamics Simulation v4', progress: 75, credits: 1200 },
  { id: 102, title: 'Thermal Analysis Engine', progress: 30, credits: 850 },
  { id: 103, title: 'Structural Integrity Test', progress: 100, credits: 500 },
]);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">CAD Projects</h1>
      <div class="text-sm text-gray-400">Total Projects: {{ projects.length }}</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="p in projects" :key="p.id" class="bg-[#1a1f2b] p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer group">
        <div class="flex justify-between items-start mb-4">
          <div class="w-10 h-10 rounded bg-blue-900/30 flex items-center justify-center text-blue-400 border border-blue-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            #{{ p.id }}
          </div>
          <span class="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Credits: {{ p.credits }}</span>
        </div>
        
        <h3 class="text-lg font-bold text-white mb-2">{{ p.title }}</h3>
        
        <div class="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500" :style="`width: ${p.progress}%`"></div>
        </div>
        <div class="text-right text-xs text-gray-400">{{ p.progress }}% Complete</div>
      </div>
    </div>
  </div>
</template>