<template>
  <div class="flex flex-col gap-12">
    <!-- Chart + Account Info -->
    <div class="flex items-center gap-12">
      <PieChart :data="[{ balance: accountDetail.balance, accountName: accountDetail.accountName }]" width="300" />
      <HeaderLabel :title="accountDetail.accountName" :subtitle="accountDetail.accountNumber" />
    </div>

    <!-- Tabs -->
    <Tabs v-model="currentTab">
      <TabsList>
        <TabsTrigger value="receive">
          <component :is="ArrowDownLeft"/>
          Receive
        </TabsTrigger>
        <TabsTrigger value="sender">
          <component :is="ArrowUpRight"/>
          Sender
        </TabsTrigger>
      </TabsList>

      <!-- Receive Transactions -->
      <TabsContent value="receive" class="flex flex-col gap-3">
        <!-- <TransactionFilter type="receive" :accountId="id" /> -->
        <TransactionTable
          :data="transactionStore.receiverTransactions.content"
          status="receive"
          :accountNumber="accountDetail.accountNumber"
        />
        <Paginatation v-model="currentPageMap.receive"
          :total-items="transactionStore.receiverTransactions.totalElements" :page-size="10" />
      </TabsContent>

      <!-- Transfer Transactions -->
      <TabsContent value="sender">
        <!-- <TransactionFilter type="transfer" :accountId="id" /> -->
        <TransactionTable
          :data="transactionStore.senderTransactions.content"
          status="transfer"
          :accountNumber="accountDetail.accountNumber"
        />
        <Paginatation v-model="currentPageMap.transfer" :total-items="transactionStore.senderTransactions.totalElements"
          :page-size="10" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useTransactionStore } from '@/stores/transaction.js'
import TransactionFilter from '@/components/TransactionFilter.vue'
import HeaderLabel from '@/components/HeaderLabel.vue'
import TransactionTable from '@/components/TransactionTable.vue'
import PieChart from '@/components/PieChart.vue'
import Paginatation from '@/components/Paginatation.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { getReceiverTransaction, getSenderTransaction } from '@/api/transaction'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next'

// Route param
const { id } = useRoute().params

// Stores
const userStore = useUserStore()
const transactionStore = useTransactionStore()

// Reactive tab & page states
const currentTab = ref('receive')

const currentPageMap = ref({
  receive: 1,
  transfer: 1
})

const currentPage = computed({
  get: () => currentPageMap.value[currentTab.value],
  set: (val) => (currentPageMap.value[currentTab.value] = val)
})

// Watchers
watch(() => currentPage, async (page) => {
  console.log('This is page: ', page.value)
  if (currentTab.value === 'receive') {
    transactionStore.receiverTransactions = await getReceiverTransaction(id, page.value)
  } else {
    transactionStore.senderTransactions = await getSenderTransaction(id, page.value)
  }
}, {immediate: true, deep: true})

watch(() => currentTab, async (tab) => {
  const page = currentPageMap.value[tab]
  if (tab === 'receive') {
    transactionStore.receiverTransactions = await getReceiverTransaction(id, page)
  } else {
    transactionStore.senderTransactions = await getSenderTransaction(id, page)
  }
}, { immediate: true, deep: true })

// Computed account detail
const accountDetail = computed(() => userStore.filteredAccount(id))

// Fetch on mount
onMounted(async () => {
  transactionStore.receiverTransactions = await getReceiverTransaction(id)
  transactionStore.senderTransactions = await getSenderTransaction(id)
})
</script>
