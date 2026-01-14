<script setup>
defineProps({
  isOpen: Boolean,
  request: Object,
});

const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop (Click to close) -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-linear"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-linear"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        @click="$emit('close')"
      ></div>
    </transition>

    <!-- Sidebar Panel -->
    <transition
      enter-active-class="transform transition ease-in-out duration-300 sm:duration-500"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-300 sm:duration-500"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-y-0 right-0 w-full max-w-md bg-[#1C1F28] border-l border-gray-700 shadow-2xl z-50 overflow-y-auto"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-700"
        >
          <h2 class="text-xl font-bold text-white">Request Details</h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6" v-if="request"></div>
      </div>
    </transition>
  </Teleport>
</template>
