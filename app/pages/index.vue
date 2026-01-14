<script setup>
definePageMeta({
  layout: "default",
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col md:flex-row bg-[#0f111a] text-white w-full"
  >
    <div
      class="md:w-1/2 bg-cover bg-center flex items-end justify-end relative overflow-hidden bg-[url('/home/navaneeth/hpc-infra-platform/public/images/bg-login.png')] rotate-180 inset-0"
    >
      <div class="p-12 flex flex-col gap-4 z-20 rotate-180">
        <img
          alt="img"
          class="w-[300px] h-auto mb-2"
          src="/images/hpc_logo.png"
        />

        <h1 class="text-4xl font-bold leading-tight">
          Streamline HPC management,<br />
          <span class="text-purple-400">maximize performance.</span>
        </h1>
        <p class="text-gray-300 text-lg">
          Seamless HPC control and performance
        </p>
      </div>

      <div
        class="absolute inset-0 bg-blue-900/30 mix-blend-multiply z-10"
      ></div>
      <div class="absolute inset-0 bg-black/50 z-10"></div>
    </div>

    <div class="md:w-1/2 flex items-center justify-center bg-[#0f111a]">
      <Login />
    </div>
  </div>
</template>
