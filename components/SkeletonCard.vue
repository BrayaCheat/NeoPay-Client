<template>
  <div class="w-full flex flex-col items-center justify-center text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-xl py-12 px-4 bg-white dark:bg-transparent">
    <component :is="icon" class="w-8 h-8 text-gray-400 dark:text-gray-500 mb-3" />
    <p class="text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>
    <RouterLink
      v-if="path"
      :to="path"
      class="mt-3 text-sm text-primary font-medium hover:underline"
    >
      {{ linkText }}
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  message: String,
  icon: [Object, Function],
  path: String,
  linkText: {
    type: String,
    default: 'Create one',
  },
})
</script>
