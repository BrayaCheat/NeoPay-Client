<template>
  <div>
    <span v-if="status == 'SUCCESS'" class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{{ status }}</span>
    <span v-else class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">{{ status }}</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    status: {
      type: String,
      required: true
    }
  })
</script>