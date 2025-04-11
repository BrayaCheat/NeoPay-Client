<template>
  <div class="flex items-center justify-between gap-4 mt-4">
    <button
      :disabled="modelValue <= 1"
      @click="emit('update:modelValue', modelValue - 1)"
      class="px-3 py-1 rounded-md border disabled:opacity-50 flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer"
    >
      <component :is="ChevronsLeft" class="w-5" />
      Prev
    </button>

    <span class="text-sm font-medium">{{ modelValue }} / {{totalPages}}</span>

    <button
      :disabled="modelValue >= totalPages"
      @click="emit('update:modelValue', modelValue + 1)"
      class="px-3 py-1 rounded-md border disabled:opacity-50 flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer"
    >
      Next
      <component :is="ChevronsRight" class="w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ChevronsLeft, ChevronsRight } from 'lucide-vue-next'
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['update:modelValue'])

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.pageSize)
)
</script>
