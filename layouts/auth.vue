<template>
  <div>
    <NuxtPage/>
    <Toaster position="top-right" :rich-colors="true" />
  </div>
</template>

<script setup>
  import { Toaster } from 'vue-sonner';
</script>