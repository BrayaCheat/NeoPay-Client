<template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})
import LoginForm from '@/components/LoginForm.vue'
</script>