<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// Get current route
const route = useRoute()

// Create breadcrumb parts from the path
const breadcrumbParts = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.map((segment, index) => {
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize
      path: '/' + segments.slice(0, index + 1).join('/'),
      isLast: index === segments.length - 1,
    }
  })
})
</script>

<template>
  <Breadcrumb class="sticky top-0 z-10 backdrop-blur-md p-3">
    <BreadcrumbList>
      <!-- Home always first -->
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator v-if="breadcrumbParts.length" />

      <template v-for="(crumb, index) in breadcrumbParts" :key="crumb.path">
        <BreadcrumbItem v-if="!crumb.isLast">
          <BreadcrumbLink :href="crumb.path">
            {{ crumb.name }}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbPage v-else>
          {{ crumb.name }}
        </BreadcrumbPage>
        <BreadcrumbSeparator v-if="index < breadcrumbParts.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
