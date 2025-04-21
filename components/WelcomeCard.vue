<template>
  <Card class="p-3 border-none shadow-none gap-1">
    <h1 class="text-2xl font-semibold">Welcome, <span>{{ username }}</span></h1>
    <p class="text-sm text-muted-foreground">Access & manage your account and transactions efficiently.</p>
  </Card>
</template>

<script setup>
  import { Card } from '@/components/ui/card';
  import { useUserStore } from '@/stores/user.js';
  const userStore = useUserStore()
  const username = computed(() => userStore.user?.fullName?.toUpperCase() || 'Duma mei')
</script>