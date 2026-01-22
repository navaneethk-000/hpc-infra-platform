<script setup>
const props = defineProps({
  title: String,
  options: { type: Array, default: () => ["All", "Active", "Completed"] },
});

const open = ref(false);
const selected = ref("All");
const dropdownRef = ref(null);

const toggleDropdown = () => (open.value = !open.value);
const selectOption = (opt) => {
  selected.value = opt;
  open.value = false;
};

// Click outside logic
onMounted(() =>
  document.addEventListener("click", (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target))
      open.value = false;
  })
);
</script>

<template>
  <section class="w-full py-4">
    <div
      class="overflow-hidden rounded-xl border border-slate-800 bg-[#1C1F28] shadow-xl flex flex-col items-center justify-center p-6"
    >
      <div class="w-full flex justify-between mb-4">
        <h2 class="text-lg font-semibold text-slate-200">{{ title }}</h2>

        <!-- Reusable Dropdown -->
        <div ref="dropdownRef" class="relative w-40 text-sm">
          <button
            class="flex w-full items-center justify-between rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200 hover:bg-slate-800"
            @click.stop="toggleDropdown"
          >
            <span>{{ selected }}</span>
            <svg
              class="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            v-if="open"
            class="absolute z-10 mt-1 w-full rounded-md border border-slate-700 bg-slate-900 shadow-lg"
          >
            <div
              v-for="option in options"
              :key="option"
              class="cursor-pointer px-3 py-2 text-slate-200 hover:bg-slate-800"
              @click="selectOption(option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State Content -->
      <div
        class="flex items-center justify-center rounded-xl text-center border border-gray-800 w-full h-auto p-8"
      >
        <h3 class="text-sm font-medium text-slate-300">No data available</h3>
      </div>
    </div>
  </section>
</template>
