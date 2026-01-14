<template>
  <!-- Overlay -->
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      @click="$emit('update:modelValue', false)"
    />
  </Transition>

  <!-- Sidebar -->
  <Transition name="slide-right">
    <aside
      v-if="modelValue"
      class="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-gradient-to-b from-[#0f172a] to-black shadow-xl"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-slate-800 px-6 py-4"
      >
        <h2 class="text-lg font-semibold text-slate-200">Project Details</h2>

        <button
          class="text-slate-400 hover:text-slate-200"
          @click="$emit('update:modelValue', false)"
        >
          ✕
        </button>
      </div>

      <!-- Content Slot -->
      <div class="p-6 overflow-y-auto h-[calc(100%-64px)]">
        <slot />
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* Fade overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide from right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
