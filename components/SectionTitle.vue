<script setup>
const props = defineProps(['title', 'icon'])
</script>
<template>
  <div class="flex items-center gap-4 mb-8">
    <div class="flex items-center gap-3">
      <div v-if="props.icon" class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
        <Icon :name="props.icon" class="w-5 h-5 text-white" />
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {{ props.title }}
      </h1>
    </div>
    <div class="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"></div>
  </div>
</template>
