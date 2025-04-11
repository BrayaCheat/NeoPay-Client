<template>
  <!-- component -->
<div class="flex flex-col items-center">
  <!-- Notification Badge Component -->
  <div class="relative flex justify-center">
    <div>
      <button
        class="inline-grid place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[38px] min-h-[38px] rounded-md shadow-sm hover:shadow-md bg-stone-200 border-stone-200 text-stone-800 hover:bg-stone-100"
      >
        {{ title }}
      </button>
    </div>
    <span
      class="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs border leading-none grid place-items-center rounded-full min-w-[20px] min-h-[20px] bg-stone-800 text-stone-50 border-white"
    >
      5
    </span>
  </div>
</div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  })
</script>