<template>
  <section class="w-full py-8">
    <h2 class="text-lg font-semibold text-slate-200 mb-4">Job Analytics</h2>
    <div
      class="overflow-hidden rounded-xl border border-slate-800 bg-[url('/images/bg-dashboard.png')] bg-no-repeat bg-cover bg-center shadow-xl"
    >
      <div class="relative p-6">
        <h3 class="text-sm font-medium text-slate-300 mb-6">Job Overview</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-400">Total</span
            ><span class="text-3xl font-semibold text-white">0</span>
          </div>
          <div
            class="hidden md:block absolute left-1/4 top-20 bottom-6 w-px bg-slate-800"
          ></div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-400">Success</span
            ><span class="text-3xl font-semibold text-white">0</span>
          </div>
          <div
            class="hidden md:block absolute left-2/4 top-20 bottom-6 w-px bg-slate-800"
          ></div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-400">Failures</span
            ><span class="text-3xl font-semibold text-white">0</span>
          </div>
          <div
            class="hidden md:block absolute left-3/4 top-20 bottom-6 w-px bg-slate-800"
          ></div>
          <div class="flex flex-col gap-1">
            <span class="text-xs text-slate-400">Average Wait Time</span
            ><span class="text-3xl font-semibold text-white"
              >0
              <span class="text-sm font-medium text-slate-400">sec</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
