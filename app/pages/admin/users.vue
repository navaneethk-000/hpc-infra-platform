<script setup>
import { ref } from "vue";

definePageMeta({ layout: "admin" });

const users = ref([
  {
    id: 1,
    name: "sulaim saed",
    date: "2025/12/11",
    email: "sulaim@hamon.in",
    role: "IT Manager",
  },
  {
    id: 2,
    name: "Nizar K",
    date: "2026/01/05",
    email: "nizar@hamon.in",
    role: "Developer",
  },
  {
    id: 3,
    name: "Navaneeth K",
    date: "2026/01/12",
    email: "navaneeth@gmail.com",
    role: "CAD Manager",
  },
]);

const openMenu = ref(null);
const editingUser = ref(null);
const deletingUser = ref(null);
const isCreating = ref(false);

const toggleMenu = (index) => {
  openMenu.value = openMenu.value === index ? null : index;
};

const openCreate = () => {
  isCreating.value = true;
  editingUser.value = {
    id: null,
    name: "",
    email: "",
    role: "Developer",
  };
};

const openEdit = (user) => {
  isCreating.value = false;
  editingUser.value = { ...user };
  openMenu.value = null;
};

const saveUser = () => {
  if (isCreating.value) {
    users.value.push({
      ...editingUser.value,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    });
  } else {
    const index = users.value.findIndex((u) => u.id === editingUser.value.id);
    users.value[index] = editingUser.value;
  }
  editingUser.value = null;
  isCreating.value = false;
};

const openDelete = (user) => {
  deletingUser.value = user;
  openMenu.value = null;
};

const confirmDelete = () => {
  users.value = users.value.filter((u) => u.id !== deletingUser.value.id);
  deletingUser.value = null;
};
</script>

<template>
  <div class="min-h-screen bg-[#0f1117] p-6 w-full">
    <!-- HEADER -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-xl font-semibold text-white">Users List</h1>

      <button
        @click="openCreate"
        class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        <span class="text-lg leading-none">+</span>
        New user
      </button>
    </div>

    <!-- TABLE -->
    <div class="rounded-xl border border-white/10 bg-[#141821]">
      <table class="w-full table-fixed">
        <thead class="bg-[#171b26] text-xs uppercase text-gray-400">
          <tr>
            <th class="px-6 py-4 text-left">Name</th>
            <th class="px-6 py-4 text-left">Date Added</th>
            <th class="px-6 py-4 text-left">Email</th>
            <th class="px-6 py-4 text-left">Role</th>
            <th class="w-14 px-6 py-4 text-right"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-t border-white/5 hover:bg-white/5"
          >
            <!-- NAME + AVATAR -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white"
                >
                  {{ user.name.charAt(0).toUpperCase() }}
                </div>
                <span class="text-sm text-white">{{ user.name }}</span>
              </div>
            </td>

            <td class="px-6 py-4 text-gray-300">{{ user.date }}</td>
            <td class="px-6 py-4 text-gray-300">{{ user.email }}</td>

            <td class="px-6 py-4">
              <span
                class="inline-flex rounded-full bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-300"
              >
                {{ user.role }}
              </span>
            </td>

            <!-- ACTIONS -->
            <td class="relative px-6 py-4 text-right">
              <button
                @click="toggleMenu(index)"
                class="text-gray-400 hover:text-white"
              >
                ⋮
              </button>

              <div
                v-if="openMenu === index"
                class="absolute right-6 top-10 z-10 w-32 rounded-lg bg-[#1a1f2e] border border-white/10"
              >
                <button
                  @click="openEdit(user)"
                  class="block w-full px-4 py-2 text-left text-sm hover:bg-white/10"
                >
                  Edit
                </button>
                <button
                  @click="openDelete(user)"
                  class="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CREATE / EDIT MODAL -->
    <div
      v-if="editingUser"
      class="fixed inset-0 z-30 flex items-center justify-center bg-black/60"
    >
      <div class="w-full max-w-md rounded-xl bg-[#141821] p-6">
        <h2 class="mb-4 text-lg font-semibold text-white">
          {{ isCreating ? "New User" : "Edit User" }}
        </h2>

        <div class="space-y-4">
          <input
            v-model="editingUser.name"
            placeholder="Name"
            class="w-full rounded bg-[#1a1f2e] px-4 py-2 text-white"
          />
          <input
            v-model="editingUser.email"
            placeholder="Email"
            class="w-full rounded bg-[#1a1f2e] px-4 py-2 text-white"
          />
          <select
            v-model="editingUser.role"
            class="w-full rounded bg-[#1a1f2e] px-4 py-2 text-white"
          >
            <option>IT Manager</option>
            <option>Developer</option>
            <option>CAD Manager</option>
          </select>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button @click="editingUser = null" class="px-4 py-2 text-gray-400">
            Cancel
          </button>
          <button
            @click="saveUser"
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- DELETE MODAL -->
    <div
      v-if="deletingUser"
      class="fixed inset-0 z-30 flex items-center justify-center bg-black/60"
    >
      <div class="w-full max-w-sm rounded-xl bg-[#141821] p-6">
        <h2 class="text-lg font-semibold text-white">Delete User</h2>
        <p class="mt-2 text-sm text-gray-400">
          Are you sure you want to delete
          <b>{{ deletingUser.name }}</b
          >?
        </p>

        <div class="mt-6 flex justify-end gap-3">
          <button @click="deletingUser = null" class="text-gray-400">
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
