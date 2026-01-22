<template>
  <aside
    class="w-20 bg-[#161b22] border-r border-gray-800 flex flex-col items-center py-6 gap-8 shrink-0 h-full"
  >
    <!-- Resource Utilization Link -->
    <NuxtLink to="/admin/dashboard" custom v-slot="{ navigate, isActive }">
      <div
        @click="navigate"
        class="flex flex-col items-center gap-1 group relative w-full px-2 cursor-pointer"
      >
        <!-- Active Purple Bar -->
        <div
          v-if="isActive"
          class="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple-500 rounded-r"
        ></div>

        <!-- Icon -->
        <div
          class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
          :class="
            isActive
              ? 'bg-[#232A38] text-white border border-gray-600'
              : 'text-gray-500 group-hover:text-gray-300'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        </div>

        <!-- Text -->
        <span
          class="text-[10px] font-medium text-center leading-tight"
          :class="isActive ? 'text-white' : 'text-gray-500'"
        >
          Resource<br />Utilization
        </span>
      </div>
    </NuxtLink>

    <!-- 2. Tools Link -->
    <NuxtLink to="/admin/tools" custom v-slot="{ navigate, isActive }">
      <div
        @click="navigate"
        class="flex flex-col items-center gap-1 group relative w-full px-2 cursor-pointer"
      >
        <div
          v-if="isActive"
          class="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple-500 rounded-r"
        ></div>

        <div
          class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
          :class="
            isActive
              ? 'bg-[#232A38] text-white border border-gray-600'
              : 'text-gray-500 group-hover:text-gray-300'
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            ></path>
          </svg>
        </div>

        <span
          class="text-[10px] font-medium text-center"
          :class="isActive ? 'text-white' : 'text-gray-500'"
        >
          Tools
        </span>
      </div>
    </NuxtLink>
  </aside>
</template>
