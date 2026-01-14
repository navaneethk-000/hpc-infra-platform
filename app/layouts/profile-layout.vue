<script setup>
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const route = useRoute();

// Determine which Top Navbar to use based on Role
const navbarLayout = computed(() => {
  const role = authStore.user?.role;
  if (role === "IT_MANAGER") return "admin";
  if (role === "CAD_MANAGER") return "cad-manager";
  return "developer";
});

// Helper to check active route for sidebar styling
const isActive = (path) => route.path === path;
</script>

<template>
  <AppNavbar />
  <div class="flex min-h-[calc(100vh-64px)] bg-[#0f111a] text-white">
    <!-- Left Sidebar -->
    <aside
      class="w-64 border-r border-gray-800 pt-8 px-4 flex flex-col gap-2 bg-[#1A1D27] shrink-0"
    >
      <!-- Profile Link -->
      <NuxtLink to="/profile">
        <div
          class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors"
          :class="
            isActive('/profile')
              ? 'bg-[#1C1F28] text-white'
              : 'text-gray-400 hover:text-gray-200'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span class="text-sm font-medium">Profile</span>
        </div>
      </NuxtLink>

      <!-- Settings Link -->
      <NuxtLink to="/settings">
        <div
          class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors"
          :class="
            isActive('/settings')
              ? 'bg-[#1C1F28] text-white'
              : 'text-gray-400 hover:text-gray-200'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            ></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span class="text-sm font-medium">Settings</span>
        </div>
      </NuxtLink>
    </aside>

    <!-- === MAIN CONTENT INJECTION === -->
    <main class="flex-1 p-12 overflow-y-auto">
      <slot />
    </main>
  </div>

  <!-- Footer -->
  <div class="fixed bottom-4 left-6 text-[10px] text-gray-600 z-50">
    ©2025 HPC Infra. All rights reserved.
  </div>
</template>
