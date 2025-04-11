<template>
  <div>
    <form @submit.prevent="handleSearch">
      <Input placeholder="Find transactions..." v-model="searchQuery"/>
    </form>

  </div>
</template>

<script setup>
  import { Input } from '@/components/ui/input';
  import { useTransactionStore } from '@/stores/transaction.js';

  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    accountId: {
      type: String,
      required: true
    }
  })

  const searchQuery = ref('')
  const transactionStore = useTransactionStore()
  const handleSearch = () => {
    switch(props.type){
      case 'receive':
        transactionStore.getReceiverTransaction(props.accountId, 1, searchQuery.value)
        break
      case 'transfer':
        transactionStore.getTransferTransaction(props.accountId, 1, searchQuery.value)
        break
    }
    console.log('Searching for:', searchQuery.value);
  }
</script>