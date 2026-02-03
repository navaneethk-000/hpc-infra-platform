<script setup>
const props = defineProps({
  isOpen: Boolean,
  isSubmitting: Boolean,
});

const emit = defineEmits(["close", "save"]);

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  role: "developer",
});

// Reset form fields when the sidebar opens
watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      form.firstName = "";
      form.lastName = "";
      form.email = "";
      form.username = "";
      form.password = "";
      form.role = "developer";
    }
  },
);

const submit = () => {
  emit("save", { ...form });
};
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
      @click="$emit('close')"
    ></div>

    <!-- Sidebar -->
    <div
      class="fixed inset-y-0 right-0 w-full max-w-lg bg-[#11141d] border-l border-gray-800 shadow-2xl z-[101] transform transition-transform duration-300 flex flex-col"
      :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-800"
      >
        <h2 class="text-xl font-semibold text-white">Add User</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-white text-2xl"
        >
          &times;
        </button>
      </div>

      <div class="p-6 space-y-5 flex-1 overflow-y-auto">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-400 mb-1"
              >First Name *</label
            >
            <input
              v-model="form.firstName"
              type="text"
              class="w-full bg-[#1a1f2e] border border-gray-800 rounded px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-400 mb-1"
              >Last Name *</label
            >
            <input
              v-model="form.lastName"
              type="text"
              class="w-full bg-[#1a1f2e] border border-gray-800 rounded px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1"
            >Email *</label
          >
          <input
            v-model="form.email"
            type="email"
            class="w-full bg-[#1a1f2e] border border-gray-800 rounded px-4 py-2.5 text-white outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1"
            >Username *</label
          >
          <input
            v-model="form.username"
            type="text"
            class="w-full bg-[#1a1f2e] border border-gray-800 rounded px-4 py-2.5 text-white outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1"
            >Password *</label
          >
          <input
            v-model="form.password"
            type="password"
            class="w-full bg-[#1a1f2e] border border-gray-800 rounded px-4 py-2.5 text-white outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1"
            >Role *</label
          >
          <select
            v-model="form.role"
            class="w-full bg-[#1a1f2e] border border-gray-800 rounded px-4 py-2.5 text-white outline-none focus:border-blue-500"
          >
            <option value="it_manager">IT Manager</option>
            <option value="developer">Developer</option>
            <option value="cad_manager">CAD Manager</option>
          </select>
        </div>
      </div>

      <div class="p-6 border-t border-gray-800 flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-6 py-2 rounded bg-[#1c222b] text-white hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          @click="submit"
          :disabled="isSubmitting"
          class="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-50 transition"
        >
          {{ isSubmitting ? "Adding..." : "Add User" }}
        </button>
      </div>
    </div>
  </Teleport>
</template>
