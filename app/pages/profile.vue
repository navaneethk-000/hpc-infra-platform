<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

// 1. DISABLE DEFAULT LAYOUT
// This prevents Nuxt from wrapping this page in layouts/default.vue
definePageMeta({
  layout: false 
});

// 2. CALCULATE DYNAMIC LAYOUT
const layoutName = computed(() => {
  const role = authStore.user?.role;
  if (role === 'IT_MANAGER') return 'admin';
  if (role === 'CAD_MANAGER') return 'cad-manager';
  return 'developer';
});
</script>

<template>
  <!-- 3. MANUALLY APPLY THE LAYOUT HERE -->
  <NuxtLayout :name="layoutName">
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-white mb-6">User Profile</h1>

      <div class="bg-[#1a1f2b] p-8 rounded-lg border border-gray-700 shadow-xl flex flex-col md:flex-row gap-8">
        
        <!-- Avatar Circle -->
        <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white shadow-lg shrink-0">
          {{ authStore.user?.email?.charAt(0).toUpperCase() || 'U' }}
        </div>

        <!-- User Details -->
        <div class="flex-1 space-y-5">
          <div>
            <label class="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Role</label>
            <span class="px-3 py-1 rounded text-xs font-bold uppercase inline-block"
              :class="{
                'bg-red-500/20 text-red-300 border border-red-500/50': authStore.user?.role === 'IT_MANAGER',
                'bg-green-500/20 text-green-300 border border-green-500/50': authStore.user?.role === 'CAD_MANAGER',
                'bg-blue-500/20 text-blue-300 border border-blue-500/50': authStore.user?.role === 'DEVELOPER',
              }">
              {{ authStore.user?.role?.replace('_', ' ') || 'UNKNOWN' }}
            </span>
          </div>

          <div>
            <label class="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Email</label>
            <div class="text-xl text-white font-medium bg-[#0f111a] p-3 rounded border border-gray-600">
                {{ authStore.user?.email }}
            </div>
          </div>

          <div>
            <label class="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Account Status</label>
            <div class="flex items-center gap-2 bg-[#0f111a] p-3 rounded border border-gray-600 text-green-400">
              <div class="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
              Active
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>