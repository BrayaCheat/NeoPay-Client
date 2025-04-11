<template>
  <NuxtLink :to="`/dashboard/accounts/${data.id}`">
    <Card class="p-3 hover:opacity-50 duration-300">

      <!-- layer1 -->
      <div class="flex items-center justify-between">
        <h1 class="text-lg">{{ data.accountName }}</h1>
        <component :is="data.active ? Lock : Unlock"/>
      </div>

      <!-- layer2 -->
      <div class="flex text-muted-foreground">
        <div class="flex gap-3">
          <p>{{ spacingAccountNumber(data.accountNumber) }}</p>
          <Separator orientation="vertical"/>
          <p>{{ data.accountType }}</p>
        </div>
        <p class="flex-1 text-right">{{ balance }}</p>
      </div>
    </Card>
  </NuxtLink>
</template>

<script setup>
import { Card } from '@/components/ui/card';
import { Lock, Unlock } from 'lucide-vue-next';
import { spacingAccountNumber } from '@/utils/helper.js';

const props = defineProps({
  data: {
    type: Object,
    reqired: true
  }
})
const balance = computed(() => `$${props.data.balance}`)
</script>