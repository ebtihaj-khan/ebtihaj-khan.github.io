<script setup lang="ts">
const education = [
  {
    "period": "2014 - 2020",
    "degree": "Masters of Science",
    "major": "Computer Sciences",
    "university": "University of Engineering and Technology",
  },
  {
    "period": "2010 - 2014",
    "degree": "Bachelors of Science",
    "major": "Computer Science",
    "university": "University of Engineering and Technology",
  }
]
</script>
<template>
  <section id="education" class="my-12 md:my-16 xl:my-20">
    <SectionTitle title="Education" icon="i-heroicons-academic-cap" />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="(item, index) in education" 
        :key="index"
        class="group"
      >
        <UCard 
          class="h-full hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300 group-hover:-translate-y-1"
          :ui="{ 
            divide: 'divide-none', 
            background: 'bg-white dark:bg-gray-800', 
            body: { padding: 'p-6' }, 
            ring: 'ring-1 ring-gray-200 dark:ring-gray-700', 
            shadow: 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50',
            rounded: 'rounded-2xl'
          }"
        >
          <!-- Degree Header -->
          <div class="mb-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Icon name="i-heroicons-academic-cap" class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                  {{ item.degree }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.major }}</p>
              </div>
            </div>
          </div>
          
          <!-- University & Period -->
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Icon name="i-heroicons-building-library" class="w-4 h-4 text-gray-500" />
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ item.university }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="i-heroicons-calendar" class="w-4 h-4 text-gray-500" />
              <UBadge color="green" variant="soft" size="sm">
                {{ item.period }}
              </UBadge>
            </div>
          </div>
          
          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </UCard>
      </div>
    </div>
  </section>
</template>