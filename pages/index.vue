<template>
  <div class="flex flex-col gap-9">
    <WelcomeCard />
    <div class="grid grid-cols-4 gap-6">
      <div v-for="item in metrics" :key="item.title">
        <MetricCard :data="item" />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <Card class="col-span-2">

      </Card>
      <Card class="col-span-1">

      </Card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})
import WelcomeCard from '@/components/WelcomeCard.vue';
import MetricCard from '@/components/MetricCard.vue';
import { useUserStore } from '@/stores/user.js';
import { useAccountStore } from '@/stores/account.js';
import { getAccount } from '@/api/account/index'
import { getUserBalance, getUserDetail } from '@/api/user';

const userStore = useUserStore()
const accountStore = useAccountStore()

const totalBalance = computed(() => userStore.balance?.totalBalance?.toFixed(2) || 0)
const totalAccounts = computed(() => accountStore.accounts?.length || 0)

const metrics = ref([
  {
    title: "Total Balance (USD)",
    value: `$ ${totalBalance.value}`,
    change: 12.3,
    period: "vs last month"
  },
  {
    title: "Total Accounts",
    value: totalAccounts.value,
    change: 12.3,
    period: "vs last month"
  },
  {
    title: "Monthly Received Transactions",
    value: "$24,580",
    change: 12.3,
    period: "vs last month"
  },
  {
    title: "Monthly Sent Transactions",
    value: "$24,580",
    change: 12.3,
    period: "vs last month"
  },
])

onMounted(async () => {
  
})
</script>