<template>
  <div class="rounded-2xl p-6 border">
    <!-- Header -->
    <div class="flex justify-between items-start mb-2">
      <p class="text-sm font-medium truncate">
        {{ data.title }}
      </p>
      <div
        class="h-6 w-6 rounded-full flex items-center justify-center"
        :class="trendDirection === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
      >
        <ArrowUp v-if="trendDirection === 'up'" class="h-3 w-3" />
        <ArrowDown v-else class="h-3 w-3" />
      </div>
    </div>

    <!-- Value -->
    <p class="text-2xl font-semibold mb-1">
      {{ data.value }}
    </p>

    <!-- Footer -->
    <div class="flex items-center gap-1">
      <p
        class="text-xs font-medium"
        :class="trendDirection === 'up' ? 'text-green-600' : 'text-red-600'"
      >
        {{ data.change }}%
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        {{ data.period }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ArrowUp, ArrowDown } from 'lucide-vue-next';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const trendDirection = computed(() =>
  props.data.change >= 0 ? 'up' : 'down'
)
</script>