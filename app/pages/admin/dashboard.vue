<script setup>
import StatsCard from "~/components/StatsCard.vue";
import ResourceOverview from "~/components/admin/ResourceOverview.vue";
import JobAnalyticsCard from "~/components/admin/JobAnalyticsCard.vue";
import GenericDataCard from "~/components/admin/GenericDataCard.vue";
import RequestsTable from "~/components/admin/RequestsTable.vue";

definePageMeta({ layout: "admin" });

const stats = ref([
  {
    id: 1,
    label: "Active Projects",
    value: "1",
    sub: "",
    icon: "project",
    color: "text-purple-400",
  },
  {
    id: 2,
    label: "Active Machines",
    value: "0/9",
    sub: "( Last 24 hrs )",
    icon: "cpu",
    color: "text-blue-400",
  },
  {
    id: 3,
    label: "Number of Users",
    value: "4",
    sub: "",
    icon: "users",
    color: "text-pink-400",
  },
  {
    id: 4,
    label: "Number of Jobs",
    value: "0",
    sub: "( Last 24 hrs )",
    icon: "jobs",
    color: "text-purple-400",
  },
  {
    id: 5,
    label: "Licenses",
    value: "N/A",
    sub: "",
    icon: "license",
    color: "text-yellow-600",
  },
]);
</script>

<template>
  <div class="container-box px-6 pb-20">
    <div class="sticky top-0 z-20 bg-[#0f111a] pt-6 pb-2">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatsCard
          v-for="stat in stats"
          :key="stat.id"
          :label="stat.label"
          :value="stat.value"
          :sub="stat.sub"
          :icon="stat.icon"
          :color="stat.color"
        />
      </div>
    </div>

    <div class="space-y-6">
      <ResourceOverview />
      <JobAnalyticsCard />

      <!-- Data Cards (User & Job Details) -->
      <GenericDataCard title="User details" />

      <GenericDataCard title="Job details" />
      <RequestsTable />
    </div>
  </div>
</template>
