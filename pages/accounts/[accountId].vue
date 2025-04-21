<template>
  <div class="flex flex-col gap-9">

    <div class="grid grid-cols-4 gap-9">
      <Card class="col-span-1 flex flex-col">
        <PieChart :data="filteredAccount" />
      </Card>
      <div class="col-span-3">
        <Card class="p-6">
          <CardHeader class="p-0 mb-4 flex items-center justify-between">
            <CardTitle class="text-lg font-medium">Account Information</CardTitle>
            <Button>
              <component :is="Settings"/>
              Settings
            </Button>
          </CardHeader>
          <CardContent class="p-0">
            <ul class="space-y-3">
              <li class="flex items-center justify-between border-b pb-2">
                <span class="text-muted-foreground">Name</span>
                <span class="font-medium">{{ filteredAccount.accountName }}</span>
              </li>
              <li class="flex items-center justify-between border-b pb-2">
                <span class="text-muted-foreground">Number</span>
                <span class="font-mono tracking-tight">{{ spacingAccountNumber(filteredAccount.accountNumber) }}</span>
              </li>
              <li class="flex items-center justify-between border-b pb-2">
                <span class="text-muted-foreground">Type</span>
                <span class="capitalize">{{ filteredAccount.accountType.toLowerCase() }}</span>
              </li>
              <li class="flex items-center justify-between border-b pb-2">
                <span class="text-muted-foreground">Currency</span>
                <span class="uppercase">{{ filteredAccount.currency }}</span>
              </li>
              <li class="flex items-center justify-between border-b pb-2">
                <span class="text-muted-foreground">Status</span>
                <Badge :variant="filteredAccount.active ? 'default' : 'secondary'" class="capitalize">
                  {{ filteredAccount.active ? 'Active' : 'Inactive' }}
                </Badge>
              </li>
              <li class="flex items-center justify-between">
                <span class="text-muted-foreground">Created</span>
                <span class="text-sm text-muted-foreground">
                  {{ filteredAccount.createdAt }}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>

    <TransactionTable class="cols-span-3" :data="filteredTransaction"
          :accountNumber="filteredAccount.accountNumber" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useTransactionStore } from '@/stores/transaction.js'
import { useAccountStore } from '@/stores/account.js'
import TransactionTable from '@/components/TransactionTable.vue'
import PieChart from '@/components/PieChart.vue'
import { getTransaction } from '@/api/transaction'
import { getAccount } from '@/api/account'
import { Settings } from 'lucide-vue-next'
import {spacingAccountNumber} from '@/utils/helper.js'

const { accountId } = useRoute().params
const accountStore = useAccountStore()
const userStore = useUserStore()
const transactionStore = useTransactionStore()

const filteredTransaction = computed(() => transactionStore.transactions || [])
const filteredAccount = computed(() => accountStore.accounts.find(account => account.id == accountId))

console.log(filteredAccount.value)

onMounted(async () => {
  transactionStore.transactions = await getTransaction(accountId)
  accountStore.accounts = await getAccount(userStore.user?.id)
})
</script>
