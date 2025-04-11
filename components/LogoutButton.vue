<template>
  <Button variant="destructive" @click="onLogout">
    Logout
  </Button>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js';
import { useUserStore } from '@/stores/user.js';
import { useAccountStore } from '@/stores/account.js';
import { useTransactionStore } from '@/stores/transaction.js';
import { Button } from '@/components/ui/button';

const authStore = useAuthStore()
const userStore = useUserStore()
const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

const onLogout = async () => {
  authStore.clearAuth()
  userStore.clearUser()
  transactionStore.clearTransactions()
  accountStore.clearAccount()
  return navigateTo('/login')
}
</script>