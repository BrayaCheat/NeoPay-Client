<template>
  <Card class="p-3 flex flex-row shrink-0 items-center gap-3 text-muted-foreground">
    <component :is="icon" />
    <NuxtLink :to="props.path" class="underline">{{ props.message }}</NuxtLink>
  </Card>
</template>

<script setup>
import { Card } from '@/components/ui/card'
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  icon: {
    required: true
  },
  path: {
    type: String,
    required: true
  }
})
</script>