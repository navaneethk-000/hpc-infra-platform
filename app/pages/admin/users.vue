<script setup>
import { useAuthStore } from "~/stores/auth";
definePageMeta({ layout: "admin" });

const authStore = useAuthStore();
const tokenCookie = useCookie("token");
const apiBase = "/proxy-api/v1/users";

const usersData = ref([]);
const pending = ref(true);
const isAddSidebarOpen = ref(false);
const editingUser = ref(null);
const deletingUser = ref(null);
const openMenu = ref(null);
const isSubmitting = ref(false);

const getHeaders = () => {
  let t = tokenCookie.value;
  if (t && typeof t === "object" && t.AccessToken) t = t.AccessToken;
  return { Authorization: `Bearer ${t}` };
};

const fetchUsers = async () => {
  pending.value = true;
  try {
    const res = await $fetch(apiBase, { method: "GET", headers: getHeaders() });
    usersData.value = res.data || res;
  } catch (err) {
    if (err.response?.status === 401) authStore.logout(true);
  } finally {
    pending.value = false;
  }
};

onMounted(() => fetchUsers());

const handleCreateUser = async (formData) => {
  isSubmitting.value = true;
  try {
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      role: formData.role.toLowerCase(),
      password: formData.password,
      username: formData.username,
    };
    await $fetch(apiBase, {
      method: "POST",
      headers: getHeaders(),
      body: payload,
    });
    await fetchUsers();
    isAddSidebarOpen.value = false;
  } catch (err) {
    alert("Error adding user.");
  } finally {
    isSubmitting.value = false;
  }
};

const saveEdit = async () => {
  isSubmitting.value = true;
  try {
    const { id, created_at, updated_at, deleted_at, ...payload } =
      editingUser.value;
    payload.role = payload.role.toLowerCase();
    await $fetch(`${apiBase}/${id}/`, {
      method: "PUT",
      headers: getHeaders(),
      body: payload,
    });
    await fetchUsers();
    editingUser.value = null;
  } catch (err) {
    alert("Update failed.");
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = async () => {
  isSubmitting.value = true;
  try {
    await $fetch(`${apiBase}/${deletingUser.value.id}/`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    await fetchUsers();
    deletingUser.value = null;
  } catch (err) {
    alert("Delete failed.");
  } finally {
    isSubmitting.value = false;
  }
};

// FIX: Prioritize real name, fallback to email username
const getDisplayName = (u) => {
  if (u.name && u.name.trim() !== "" && u.name !== "User") return u.name;
  return u.email ? u.email.split("@")[0] : "User";
};

const formatDate = (d) => (d ? new Date(d).toLocaleDateString("en-CA") : "-");

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target)))
        binding.value(event);
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
</script>

<template>
  <div class="min-h-screen bg-[#0f111a] p-8 w-full flex flex-col">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Users List</h1>
      <button
        @click="isAddSidebarOpen = true"
        class="bg-[#4679E5] px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600 transition"
      >
        + New user
      </button>
    </div>

    <div v-if="pending" class="text-gray-500 text-center py-10 italic">
      Loading users...
    </div>

    <div
      v-else
      class="rounded-lg border border-gray-800 bg-[#161b22] overflow-visible shadow-xl"
    >
      <table class="w-full text-left border-collapse">
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
        <tbody class="divide-y divide-gray-800">
          <tr
            v-for="(user, index) in usersData"
            :key="user.id"
            class="hover:bg-[#1c222b] transition-colors"
          >
            <td class="px-6 py-4 flex items-center gap-3">
              <div
                class="h-8 w-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-black uppercase"
              >
                {{ getDisplayName(user).charAt(0) }}
              </div>
              <span class="text-sm font-medium text-gray-200">{{
                getDisplayName(user)
              }}</span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-400">
              {{ formatDate(user.created_at) }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-400">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-medium bg-[#2A2735] text-[#A78BFA] border border-[#3E3B4E]"
                >{{ user.role }}</span
              >
            </td>
            <td class="px-6 py-4 text-right relative">
              <button
                @click.stop="openMenu = openMenu === index ? null : index"
                class="text-gray-400 hover:text-white p-1"
              >
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
              <div
                v-if="openMenu === index"
                v-click-outside="() => (openMenu = null)"
                class="absolute right-8 top-8 z-50 w-32 rounded-md bg-[#1f2937] border border-gray-700 shadow-xl overflow-hidden text-left"
              >
                <button
                  @click="
                    editingUser = { ...user };
                    openMenu = null;
                  "
                  class="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  @click="
                    deletingUser = user;
                    openMenu = null;
                  "
                  class="block w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <AdminAddUserSidebar
      :is-open="isAddSidebarOpen"
      :is-submitting="isSubmitting"
      @close="isAddSidebarOpen = false"
      @save="handleCreateUser"
    />

    <div
      v-if="editingUser"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <div
        class="w-full max-w-md rounded-xl bg-[#161b22] border border-gray-700 p-6 shadow-2xl"
      >
        <h2 class="mb-4 text-lg font-bold text-white">Edit User</h2>
        <div class="space-y-4">
          <input
            v-model="editingUser.name"
            class="w-full rounded bg-[#0f111a] border border-gray-700 px-4 py-2 text-white outline-none"
          />
          <input
            v-model="editingUser.email"
            class="w-full rounded bg-[#0f111a] border border-gray-700 px-4 py-2 text-white outline-none"
          />
        </div>
        <div class="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-800">
          <button @click="editingUser = null" class="px-4 py-2 text-gray-400">
            Cancel
          </button>
          <button
            @click="saveEdit"
            :disabled="isSubmitting"
            class="rounded bg-[#4679E5] px-6 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="deletingUser"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
    >
      <div
        class="w-full max-w-sm rounded-xl bg-[#161b22] border border-gray-700 p-6 shadow-2xl text-center"
      >
        <h2 class="text-lg font-bold text-white mb-2">Delete User</h2>
        <p class="text-sm text-gray-400 mb-6">
          Delete <b class="text-white">{{ getDisplayName(deletingUser) }}</b
          >?
        </p>
        <div class="flex justify-center gap-3">
          <button
            @click="deletingUser = null"
            class="px-6 py-2 rounded bg-gray-700 text-white"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            :disabled="isSubmitting"
            class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
