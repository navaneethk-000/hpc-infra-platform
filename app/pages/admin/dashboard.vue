<script setup>
import { useAuthStore } from "~/stores/auth";

definePageMeta({ layout: "admin" });

const authStore = useAuthStore();
// 1. Get Token directly from cookie (Bypasses Store delay)
const tokenCookie = useCookie("token");

// 3. Safety Redirect (Only if token is totally missing)
if (!tokenCookie.value) {
  if (process.client) window.location.href = "/";
}

// 4. Fetch Data
const {
  data: analytics,
  error,
  refresh,
} = await useFetch(
  "https://tenant.hpcinfra.com/api/v1/usage/aggregated-analytics",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
    // Only run if token exists
    immediate: !!tokenCookie.value,

    onResponseError({ response }) {
      // IF TOKEN EXPIRED (401)
      if (response.status === 401) {
        // Pass 'true' to trigger the toast on the login page
        authStore.logout(true);
      }
    },
  },
);

// 5. Map Data to UI
const stats = computed(() => {
  const data = analytics.value || {};
  // Handle API typo 'mechines'
  const machines = data.mechines || { active: 0, total: 0 };
  const license = data.license || { available: 0, hold: 0 };

  return [
    {
      id: 1,
      label: "Active Projects",
      value: data.projects ?? 0,
      sub: "",
      icon: "project",
      color: "text-purple-400",
    },
    {
      id: 2,
      label: "Active Machines",
      value: `${machines.active}/${machines.total}`,
      sub: "( Last 24 hrs )",
      icon: "cpu",
      color: "text-blue-400",
    },
    {
      id: 3,
      label: "Number of Users",
      value: data.users ?? 0,
      sub: "",
      icon: "users",
      color: "text-pink-400",
    },
    {
      id: 4,
      label: "Number of Jobs",
      value: data.jobs ?? 0,
      sub: "( Last 24 hrs )",
      icon: "jobs",
      color: "text-purple-400",
    },
    {
      id: 5,
      label: "Licenses",
      value: license.available ?? 0,
      sub: "",
      icon: "license",
      color: "text-yellow-600",
    },
  ];
});
</script>

<template>
  <div class="container-box px-6 pb-20">
    <!-- Sticky Header -->
    <div class="sticky top-0 z-20 bg-[#0f111a] pt-6 pb-2">
      <!-- DEBUG ERROR BOX: Shows if API fails -->

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <admin-stats-card
          v-for="stat in stats"
          :key="stat.id"
          :label="stat.label"
          :value="stat.value"
          :sub="stat.sub"
          :icon="stat.icon"
          :color="stat.color"
        />
      </div>
      <!-- Fade effect -->
      <div
        class="h-4 bg-gradient-to-b from-[#0f111a] to-transparent pointer-events-none"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      <admin-resource-overview />
      <admin-job-analytics-card />

      <admin-generic-data-card title="User details" />
      <admin-generic-data-card title="Job details" />

      <admin-request-table />
    </div>
  </div>
</template>
