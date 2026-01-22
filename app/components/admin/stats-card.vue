<script setup>
const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  sub: { type: String, default: "" },
  icon: { type: String, required: true },
  color: { type: String, default: "text-purple-400" },
});

const dotColor = computed(() => {
  return props.color.replace("text-", "bg-");
});
</script>

<template>
  <div
    class="bg-[#161b22] border border-gray-800 rounded-lg p-5 relative shadow-lg hover:border-gray-700 transition-colors"
  >
    <!-- Info Icon (Top Right) -->
    <div
      class="absolute top-3 right-3 text-gray-600 hover:text-gray-400 cursor-pointer group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    </div>

    <div class="flex flex-col gap-3">
      <!-- Icon Box -->
      <div
        class="w-10 h-10 rounded bg-[#1f2633] flex items-center justify-center border border-gray-700"
      >
        <!-- Dynamic Icons -->
        <svg
          v-if="icon === 'project'"
          :class="color"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>

        <svg
          v-if="icon === 'cpu'"
          :class="color"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="14" x2="23" y2="14"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>

        <svg
          v-if="icon === 'users'"
          :class="color"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>

        <svg
          v-if="icon === 'jobs'"
          :class="color"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M20 7h-3a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
          ></path>
        </svg>

        <svg
          v-if="icon === 'license'"
          :class="color"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"></path>
        </svg>
      </div>

      <!-- Value & Dot -->
      <div class="flex items-center gap-2 mt-2">
        <div class="w-2 h-2 rounded-full" :class="dotColor"></div>
        <h2 class="text-3xl font-bold text-gray-200">{{ value }}</h2>
      </div>

      <!-- Labels -->
      <div class="flex flex-col">
        <p class="text-gray-400 text-xs">{{ label }}</p>
        <p v-if="sub" class="text-gray-500 text-[10px]">{{ sub }}</p>
      </div>
    </div>
  </div>
</template>
