<template>
  <div class="min-h-screen bg-[#0f111a] flex flex-col h-screen overflow-hidden">
    <!-- Top Navbar -->
    <AppNavbar />

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar Component -->
      <AdminSidebar />

      <main class="flex-1 overflow-y-auto bg-[#0f111a]">
        <slot />
      </main>
    </div>
  </div>
</template>
