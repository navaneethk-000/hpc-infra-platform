<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

definePageMeta({
  layout: "profile-layout",
});

const fullDisplayName = computed(() => {
  if (authStore.user?.name) return authStore.user.name;
  const email = authStore.user?.email || "";
  const username = email.split("@")[0] || "User";
  return username
    .replace(/[\.\+]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
});

const firstName = computed(() => fullDisplayName.value.split(" ")[0]);
const lastName = computed(() => {
  const parts = fullDisplayName.value.split(" ");
  return parts.length > 1 ? parts.slice(1).join(" ") : "-";
});
</script>

<template>
  <div class="w-full">
    <h1 class="text-xl font-bold mb-8">Settings</h1>

    <!-- User details-->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- First Name -->
      <div class="space-y-2">
        <label class="block text-xs text-gray-400 font-medium ml-1"
          >First name</label
        >
        <div
          class="bg-[#161b22] border border-gray-800 rounded-md px-4 py-3 text-sm font-semibold text-gray-200"
        >
          {{ firstName }}
        </div>
      </div>

      <!-- Last Name -->
      <div class="space-y-2">
        <label class="block text-xs text-gray-400 font-medium ml-1"
          >Last name</label
        >
        <div
          class="bg-[#161b22] border border-gray-800 rounded-md px-4 py-3 text-sm font-semibold text-gray-200"
        >
          {{ lastName }}
        </div>
      </div>

      <!-- Email -->
      <div class="space-y-2">
        <label class="block text-xs text-gray-400 font-medium ml-1"
          >Email</label
        >
        <div
          class="bg-[#161b22] border border-gray-800 rounded-md px-4 py-3 text-sm font-semibold text-gray-200"
        >
          {{ authStore.user?.email }}
        </div>
      </div>

      <!-- Role -->
      <div class="space-y-2">
        <label class="block text-xs text-gray-400 font-medium ml-1">Role</label>
        <div
          class="bg-[#161b22] border border-gray-800 rounded-md px-4 py-3 text-sm font-semibold text-gray-200 uppercase"
        >
          {{ authStore.user?.role?.replace("_", " ") }}
        </div>
      </div>
    </div>

    <!-- API KEYS SECTION -->
    <div class="bg-[#161b22] border border-gray-800 rounded-lg p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold text-gray-200">API Keys</h2>
        <button
          class="bg-[#4679E5] hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Key
        </button>
      </div>

      <!-- Content (Empty State) -->
      <div class="text-gray-500 text-sm">No API keys are available</div>
    </div>
  </div>
</template>
