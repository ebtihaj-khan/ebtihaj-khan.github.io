<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
      color="gray" 
      variant="ghost"
      aria-label="Toggle theme"
      size="lg" 
      :ui="{ rounded: 'rounded-full' }"
      @click="isDark = !isDark"
      class="print:hidden hover:scale-110 transition-transform duration-200 group"
    >
      <template #icon>
        <div class="relative w-5 h-5">
          <Icon 
            :name="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'" 
            class="w-5 h-5 transition-all duration-300 group-hover:rotate-180"
          />
        </div>
      </template>
    </UButton>
    <template #fallback>
      <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
    </template>
  </ClientOnly>
</template>
