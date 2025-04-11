<template>
  <Card class="flex flex-row items-start p-6">
    <PieChart :data="accounts" width="500"/>
    <div class="flex flex-1 flex-col">
      <div class="flex items-center justify-between">
        <p class="font-bold text-lg">{{ totalAccounts }} Bank Accounts</p>
        <Button variant="link" class="text-muted-foreground cursor-pointer">
          <component :is="Plus" />
          Add Bank
        </Button>
      </div>
      <p class="text-muted-foreground text-sm">Total Current Balance</p>
      <p class="text-lg font-bold">${{ userStore.balance }}</p>
    </div>
  </Card>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
import { Plus } from 'lucide-vue-next';
import PieChart from '@/components/PieChart.vue';

const userStore = useUserStore()
const accounts = computed(() => userStore.user?.accounts)
const totalAccounts = computed(() => accounts.value.length || 0)
</script>