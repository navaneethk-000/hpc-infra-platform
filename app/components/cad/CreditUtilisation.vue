<template>
  <div
    class="bg-[#1a1f2b] rounded-lg p-6 border border-gray-700 shadow-lg mt-6 relative overflow-hidden"
  >
    <!-- Decorative Background Image Placeholder -->
    <div class="absolute right-0 top-0 opacity-10">
      <div class="w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
    </div>

    <h2 class="text-xl text-gray-300 font-bold mb-6 relative z-10">
      Credit Utilization Overview
    </h2>
    <div class="flex flex-wrap justify-between md:w-2/3 relative z-10">
      <div class="text-left">
        <p class="text-gray-500 text-sm">Total Credits</p>
        <h1 class="text-4xl font-bold text-gray-200">84,000</h1>
      </div>
      <div class="w-px bg-gray-700 h-16 mx-4"></div>
      <div class="text-left">
        <p class="text-gray-500 text-sm">Credits Used</p>
        <h1 class="text-4xl font-bold text-gray-200">71,000</h1>
      </div>
      <div class="w-px bg-gray-700 h-16 mx-4"></div>
      <div class="text-left">
        <p class="text-gray-500 text-sm">Credits Remaining</p>
        <h1 class="text-4xl font-bold text-blue-400">13,000</h1>
      </div>
    </div>
  </div>
</template>
