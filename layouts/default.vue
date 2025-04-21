<template>
  <div>
    <SidebarProvider>
      <AppSideBar />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col md:ml-[--sidebar-width] transition-all duration-300">
        <!-- Navbar - Sticky positioned -->
        <NavBar class="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />

        <!-- Page Content with Transition -->
        <main class="flex-1 px-4 py-6 md:px-6">
          <NuxtPage />
        </main>
      </div>
    </SidebarProvider>

    <!-- Toaster - Fixed positioning -->
    <Toaster position="top-right" :rich-colors="true" />
  </div>
</template>

<script setup>
import AppSideBar from '@/components/AppSideBar.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import NavBar from '@/components/NavBar.vue'
import { Toaster } from '@/components/ui/sonner'

// Smooth scroll to top on page navigation
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style>
:root {
  --sidebar-width: 240px;
}

/* Page transition effects */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Mobile sidebar overlay */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 80px;
  }

  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 30;
  }
}
</style>
