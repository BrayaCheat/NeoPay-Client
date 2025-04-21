<template>
  <div class="flex flex-col items-start">
    <h1 class="text-xl font-bold uppercase">{{ title }}</h1>
    <p class="text-md text-muted-foreground">{{ spacingAccountNumber(subtitle) }}</p>
  </div>
</template>

<script setup>
import {spacingAccountNumber} from '@/utils/helper.js';
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
})
</script>