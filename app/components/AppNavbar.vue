<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

// Dynamic Links based on Role
const menuItems = computed(() => {
  const role = authStore.user?.role;
  switch (role) {
    case 'IT_MANAGER': return [
      { name: 'Home', path: '/admin/dashboard' },
      { name: 'Users', path: '/admin/users' }
    ];
    case 'CAD_MANAGER': return [
      { name: 'Home', path: '/cad/dashboard' },
      { name: 'Projects', path: '/cad/projects' }
    ];
    default: return [
      { name: 'Home', path: '/developer/dashboard' }
    ];
  }
});

// Helper for Icons
const isITManager = computed(() => authStore.user?.role === 'IT_MANAGER');

const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value;
const handleLogout = () => { isDropdownOpen.value = false; authStore.logout(); };

// Click outside logic
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};
onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <nav class="flex items-center justify-between bg-[#232A38] box px-4 py-2 shadow-md">
    <!-- Left: Logo & Menu -->
    <div class="flex items-center gap-8">
      <div class="flex gap-2 items-center">
        <img src="/images/hpc_logo.png" alt="logo" class="h-auto w-[150px]" />
        <!-- Role Badge -->
        <span class="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded font-bold uppercase">
          {{ authStore.user?.role === 'IT_MANAGER' ? 'ADMIN' : (authStore.user?.role === 'CAD_MANAGER' ? 'CAD' : 'DEV') }}
        </span>
      </div>    

      <ul class="flex gap-4 text-gray-300">
        <nuxt-link v-for="(item, idx) in menuItems" :key="idx" :to="item.path" active-class="border-b-2 border-purple-500 text-white" class="hover:text-white transition-colors py-1 text-sm">
          {{ item.name }}
        </nuxt-link>
      </ul>
    </div>

    <!-- Right: Icons & Avatar -->
    <div class="flex gap-5 items-center text-gray-300">
      <!-- Admin sees specific icons, others see default -->
      <template v-if="isITManager">
         <div class="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full text-gray-400 cursor-pointer"><font-awesome-icon icon="bell" /></div>
         <div class="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full text-gray-400 cursor-pointer"><font-awesome-icon icon="gear" /></div>
      </template>
      <template v-else>   
         <div class="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full cursor-pointer hover:text-gray-600">
          <font-awesome-icon icon="bell" />
        
        </div>
         <div class="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full cursor-pointer hover:text-gray-600">
          <font-awesome-icon icon="gear" />
        
        </div>

      </template>

      <!-- Avatar Dropdown -->
      <div class="relative" ref="dropdownRef">
        <div class="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-black font-bold cursor-pointer select-none" @click.stop="toggleDropdown">
          {{ authStore.user?.email?.[0]?.toUpperCase() || 'U' }}
        </div>
        <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-[#1a1f2b] border border-gray-700 rounded shadow-lg py-1 z-50 text-white">
          <div class="px-4 py-2 text-xs text-gray-500 border-b border-gray-700">{{ authStore.user?.email }}</div>
          <nuxt-link to="/profile">
             <div class="px-4 py-2 text-gray-200 border-b text-sm border-gray-700">Profile</div>
          </nuxt-link>
          <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>