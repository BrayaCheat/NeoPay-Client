<template>
  <main class="flex flex-col gap-12">
    <HeaderLabel title="All Accounts" subtitle="desc"/>
    <div v-if="accountStore.accounts.length > 0" class="grid grid-cols-3 gap-3">
      <div v-for="(item, index) in accountStore.accounts" :key="index">
        <AccountCard :data="item" />
      </div>
    </div>
    <SkeletonCard v-else message="No accounts found. Create one?" :icon="Scroll" path="/dashboard/accounts/createAccount"/>
  </main>
</template>

<script setup>

import AccountCard from '@/components/AccountCard.vue';
import { Scroll } from 'lucide-vue-next';
import HeaderLabel from '@/components/HeaderLabel.vue';
import { getAccount } from '@/api/account';
import { useUserStore } from '@/stores/user.js';
import SkeletonCard from '@/components/SkeletonCard.vue';
import { useAccountStore } from '@/stores/account.js';

const accountStore = useAccountStore()
const userStore = useUserStore()

onMounted(async () => {
  accountStore.accounts = await getAccount(userStore.user?.id);
})
</script>