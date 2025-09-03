<script setup lang="ts">
const expertise = [
  "Product Strategy",
  "Product Lifecycle Management", 
  "Product Documentation",
  "User Research & Discovery",
  "Data Analysis & Decision-Making",
  "Technical Fluency",
  "Execution & Delivery",
  "Stakeholder & Team Management"
]
</script>

<template>
  <section id="expertise" class="my-12 md:my-16 xl:my-20">
    <SectionTitle title="Core Expertise" icon="i-heroicons-star" />
    
    <UCard 
      class="hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 transition-all duration-300"
      :ui="{ 
        divide: 'divide-none', 
        background: 'bg-white dark:bg-gray-800', 
        body: { padding: 'p-8' }, 
        ring: 'ring-1 ring-gray-200 dark:ring-gray-700', 
        shadow: 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50',
        rounded: 'rounded-2xl'
      }"
    >
      <div class="flex flex-wrap gap-3">
        <UBadge 
          v-for="item in expertise" 
          :key="item"
          color="indigo" 
          variant="soft" 
          size="lg"
          class="hover:scale-105 transition-transform duration-200 cursor-default"
        >
          <Icon name="i-heroicons-check-circle" class="w-4 h-4 mr-1" />
          {{ item }}
        </UBadge>
      </div>
    </UCard>
  </section>
</template>