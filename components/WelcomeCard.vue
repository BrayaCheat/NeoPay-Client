<template>
  <Card class="p-3 border-none shadow-none">
    <h1 class="text-3xl">Welcome, <span>{{ username }}</span></h1>
    <p>Access & manage your account and transactions efficiently.</p>
  </Card>
</template>

<script setup>
  import { Card } from '@/components/ui/card';
  import { useUserStore } from '@/stores/user.js';

  const userStore = useUserStore()
  const username = computed(() => userStore.user?.fullName?.toUpperCase() || 'Duma mei')
</script>