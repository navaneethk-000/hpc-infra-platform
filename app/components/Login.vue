<script setup>
import { useAuthStore } from "~/stores/auth";

const error = ref(null);
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

async function submitForm() {
  error.value = null;

  if (!form.email) {
    error.value = "Email is required";
    return;
  }

  if (!form.password) {
    error.value = "Password is required";
    return;
  }

  try {
    await authStore.login(form.email, form.password);
  } catch (err) {
    if (err.response?.status === 401) {
      error.value = err.response._data?.message || "Invalid email or password";
      return;
    }
    error.value = "Invalid credentials";
  }
}
</script>

<template>
  <div class="md:w-1/2 flex items-center justify-center">
    <div class="w-[300px]">
      <form class="flex flex-col gap-2" @submit.prevent="submitForm">
        <h1 class="text-3xl font-bold mb-1">Sign in to HPC Infra</h1>

        <label for="email" class="text-sm font-medium">Your work email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          class="bg-transparent border mb-2 border-solid rounded-md px-4 py-2 outline-none focus:border-blue-500"
          v-model="form.email"
        />

        <label for="password" class="text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          class="bg-transparent border p-2 mb-2 border-solid rounded-md px-4 outline-none focus:border-blue-500"
          v-model="form.password"
        />

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <div class="flex gap-2 text-sm">
          <input type="checkbox" name="remember" id="remember" />
          <label for="remember">Remember me</label>
        </div>

        <button
          type="submit"
          class="bg-[#4679E5] font-bold hover:bg-blue-600 transition-colors rounded-md p-2 mt-2 text-sm"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>
