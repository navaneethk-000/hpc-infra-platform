<script setup>
definePageMeta({ layout: "admin" });

// 1. Setup Auth & Token
const tokenCookie = useCookie("token");
const config = useRuntimeConfig();

const apiBase = "https://tenant.hpcinfra.com/api/v1/users/";

// 2. Fetch Users (READ)
const {
  data: usersData,
  pending,
  refresh,
  error,
} = await useFetch(apiBase, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${tokenCookie.value}`,
  },
  // If the API returns { data: [...] }, unwrap it here
  transform: (res) => res.data || res,
});

// State
const openMenu = ref(null);
const editingUser = ref(null);
const deletingUser = ref(null);
const isCreating = ref(false);
const isSubmitting = ref(false); // To show loading on buttons

// --- ACTIONS ---

const toggleMenu = (index) => {
  openMenu.value = openMenu.value === index ? null : index;
};

// Open Modal for Create
const openCreate = () => {
  isCreating.value = true;
  editingUser.value = {
    name: "",
    email: "",
    role: "Developer",
    password: "", // Usually needed for new users
  };
};

// Open Modal for Edit
const openEdit = (user) => {
  isCreating.value = false;
  // Clone the user object so we don't mutate the table directly
  editingUser.value = { ...user };
  openMenu.value = null;
};

// SAVE (Create or Update)
const saveUser = async () => {
  if (!editingUser.value.name || !editingUser.value.email) return;

  isSubmitting.value = true;

  try {
    if (isCreating.value) {
      // --- CREATE (POST) ---
      await $fetch(apiBase, {
        method: "POST",
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
        body: editingUser.value,
      });
    } else {
      // --- UPDATE (PUT) ---
      // We assume the URL is /users/{id}
      await $fetch(`${apiBase}/${editingUser.value.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${tokenCookie.value}` },
        body: editingUser.value,
      });
    }

    // Refresh the table data from server
    await refresh();

    // Close Modal
    editingUser.value = null;
    isCreating.value = false;
  } catch (err) {
    console.error("Failed to save user:", err);
    alert("Error saving user. Check console.");
  } finally {
    isSubmitting.value = false;
  }
};

// DELETE Actions
const openDelete = (user) => {
  deletingUser.value = user;
  openMenu.value = null;
};

const confirmDelete = async () => {
  if (!deletingUser.value) return;
  isSubmitting.value = true;

  try {
    // --- DELETE ---
    await $fetch(`${apiBase}/${deletingUser.value.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenCookie.value}` },
    });

    await refresh(); // Refresh list
    deletingUser.value = null;
  } catch (err) {
    console.error("Failed to delete user:", err);
    alert("Error deleting user.");
  } finally {
    isSubmitting.value = false;
  }
};

// Helper: Format Date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-CA"); // YYYY-MM-DD
};
</script>

<template>
  <div class="min-h-screen bg-[#0f1117] p-6 w-full">
    <!-- HEADER -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-xl font-semibold text-white">Users List</h1>
      <button
        @click="openCreate"
        class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        <span class="text-lg leading-none">+</span> New user
      </button>
    </div>

    <!-- LOADING STATE -->
    <div v-if="pending" class="text-center py-10 text-gray-500">
      Loading users...
    </div>

    <!-- ERROR STATE -->
    <div
      v-else-if="error"
      class="text-center py-10 text-red-400 border border-red-900 bg-red-900/10 rounded-lg"
    >
      Failed to load users. {{ error.message }}
    </div>

    <!-- TABLE -->
    <div
      v-else
      class="rounded-xl border border-white/10 bg-[#141821] overflow-hidden"
    >
      <!-- TABLE CONTAINER -->
      <table class="w-full text-left border-collapse">
        <!-- HEADER -->
        <thead>
          <tr class="border-b border-gray-800 bg-[#161b22]">
            <th
              class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
            >
              Date Added
            </th>
            <th
              class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
            >
              Role
            </th>
            <th class="px-6 py-4 w-12"></th>
          </tr>
        </thead>

        <!-- BODY -->
        <tbody class="divide-y divide-gray-800">
          <tr
            v-for="(user, index) in usersData"
            :key="user.id"
            class="hover:bg-[#1c222b] transition-colors group"
          >
            <!-- NAME & AVATAR -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <!-- White Avatar Circle with Black Text -->
                <div
                  class="h-8 w-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-black select-none"
                >
                  {{ user.name?.charAt(0).toUpperCase() || "U" }}
                </div>
                <span class="text-sm font-medium text-gray-200">{{
                  user.name || "User"
                }}</span>
              </div>
            </td>

            <!-- DATE -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm text-gray-400">{{
                formatDate(user.created_at || user.date)
              }}</span>
            </td>

            <!-- EMAIL -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm text-gray-400">{{ user.email }}</span>
            </td>

            <!-- ROLE BADGE (Uniform Purple Style) -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#2A2735] text-[#A78BFA] border border-[#3E3B4E]"
              >
                {{ user.role }}
              </span>
            </td>

            <!-- ACTIONS (Three Dots) -->
            <td class="px-6 py-4 text-right relative">
              <button
                @click.stop="toggleMenu(index)"
                class="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700/50 focus:outline-none"
              >
                <!-- Vertical Ellipsis Icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                  />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="openMenu === index"
                v-click-outside="() => (openMenu = null)"
                class="absolute right-8 top-8 z-50 w-32 origin-top-right rounded-md bg-[#1f2937] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700"
              >
                <div class="py-1">
                  <button
                    @click="openEdit(user)"
                    class="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    @click="openDelete(user)"
                    class="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div
        v-if="usersData && usersData.length === 0"
        class="p-8 text-center text-gray-500 text-sm"
      >
        No users found. Create one to get started.
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="usersData && usersData.length === 0"
      class="p-8 text-center text-gray-500 text-sm"
    >
      No users found.
    </div>

    <!-- CREATE / EDIT MODAL -->
    <div
      v-if="editingUser"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-md rounded-xl bg-[#141821] border border-white/10 p-6 shadow-2xl"
      >
        <h2 class="mb-4 text-lg font-semibold text-white">
          {{ isCreating ? "New User" : "Edit User" }}
        </h2>

        <form @submit.prevent="saveUser" class="space-y-4">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">Full Name</label>
            <input
              v-model="editingUser.name"
              type="text"
              class="w-full rounded bg-[#1a1f2e] border border-gray-700 px-4 py-2 text-white focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label class="text-xs text-gray-400 mb-1 block">Email</label>
            <input
              v-model="editingUser.email"
              type="email"
              class="w-full rounded bg-[#1a1f2e] border border-gray-700 px-4 py-2 text-white focus:border-blue-500 outline-none"
              required
            />
          </div>

          <!-- Password field only for New Users usually -->
          <div v-if="isCreating">
            <label class="text-xs text-gray-400 mb-1 block">Password</label>
            <input
              v-model="editingUser.password"
              type="password"
              class="w-full rounded bg-[#1a1f2e] border border-gray-700 px-4 py-2 text-white focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label class="text-xs text-gray-400 mb-1 block">Role</label>
            <select
              v-model="editingUser.role"
              class="w-full rounded bg-[#1a1f2e] border border-gray-700 px-4 py-2 text-white focus:border-blue-500 outline-none"
            >
              <option value="DEVELOPER">Developer</option>
              <option value="CAD_MANAGER">CAD Manager</option>
              <option value="IT_MANAGER">IT Manager</option>
            </select>
          </div>

          <div
            class="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-800"
          >
            <button
              type="button"
              @click="editingUser = null"
              class="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span
                v-if="isSubmitting"
                class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></span>
              {{ isSubmitting ? "Saving..." : "Save" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- DELETE MODAL -->
    <div
      v-if="deletingUser"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-sm rounded-xl bg-[#141821] border border-white/10 p-6 shadow-2xl"
      >
        <h2 class="text-lg font-semibold text-white">Delete User</h2>
        <p class="mt-2 text-sm text-gray-400">
          Are you sure you want to delete
          <b class="text-white">{{ deletingUser.name }}</b
          >? This action cannot be undone.
        </p>

        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="deletingUser = null"
            class="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            :disabled="isSubmitting"
            class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            <span
              v-if="isSubmitting"
              class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></span>
            {{ isSubmitting ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
