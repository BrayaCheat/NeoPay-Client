<template>
  <SidebarProvider>
    <SideBar />
    <main class="flex-1">
      <!-- <SidebarTrigger /> -->
      <div class="px-3 flex flex-col gap-3">
        <Breadcrumb/>
        <slot />
      </div>
    </main>
  </SidebarProvider>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Breadcrumb from '@/components/Breadcrumb.vue';
</script>