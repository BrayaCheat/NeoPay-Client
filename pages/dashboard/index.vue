<template>
  <main class="flex flex-col gap-12">
    <WelcomeCard />
    <!-- <AccountMetric /> -->
  </main>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})
import WelcomeCard from '@/components/WelcomeCard.vue';
import AccountMetric from '@/components/AccountMetric.vue';
import { getUserBalance, getUserDetail } from '@/api/user';
import { useUserStore } from '@/stores/user.js';

const userStore = useUserStore()

onMounted(async () => {
  userStore.user = await getUserDetail();
  userStore.balance = await getUserBalance(userStore.user?.id);
})
</script>