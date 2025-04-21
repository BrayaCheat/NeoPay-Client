<template>
  <div>
    <SidebarProvider>
      <AppSideBar />
      <div class="flex-1 flex flex-col transition-all duration-300">
        <NavBar class="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
        <main class="flex-1 px-4 py-6 md:px-6">
          <slot/>
        </main>
      </div>
    </SidebarProvider>
    <Toaster position="top-right" :rich-colors="true" />
  </div>
</template>

<script setup>
import AppSideBar from '@/components/AppSideBar.vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import NavBar from '@/components/NavBar.vue'
import { Toaster } from '@/components/ui/sonner'
</script>
