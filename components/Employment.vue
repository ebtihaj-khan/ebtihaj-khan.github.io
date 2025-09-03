<script setup lang="ts">
const columns = [
  { key: 'period', label: 'Period' },
  { key: 'designation', label: 'Designation' },
  { key: 'organization', label: 'Organization' },
  { key: 'sector', label: 'Sector' },
]
const employment = [
  {
    "period": "2022 - Present",
    "designation": "Senior Product Manager",
    "organization": "Rayn Group",
    "sector": "Private"
  },
  {
    "period": "2016 - 2022",
    "designation": "Government Innovation Lead (Product)",
    "organization": "Code for Pakistan",
    "sector": "Development"
  },
  {
    "period": "2015 - 2016",
    "designation": "Business Innovation Officer",
    "organization": "The Nerd Camp",
    "sector": "Private"
  },
  {
    "period": "2014 - 2015",
    "designation": "Software Engineer",
    "organization": "Sweet Pixel Studios",
    "sector": "Private"
  }
]
</script>
<template>
  <section id="employment" class="my-12 md:my-16 xl:my-20">
    <SectionTitle title="Employment History" icon="i-heroicons-building-office-2" />
    
    <div class="space-y-4">
      <div 
        v-for="(item, index) in employment" 
        :key="index"
        class="group"
      >
        <UCard 
          class="hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-orange-500/20 transition-all duration-300 group-hover:-translate-y-1"
          :ui="{ 
            divide: 'divide-none', 
            background: 'bg-white dark:bg-gray-800', 
            body: { padding: 'p-6' }, 
            ring: 'ring-1 ring-gray-200 dark:ring-gray-700', 
            shadow: 'shadow-md shadow-gray-200/50 dark:shadow-gray-900/50',
            rounded: 'rounded-xl'
          }"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <!-- Left Side - Job Info -->
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Icon name="i-heroicons-building-office-2" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                    {{ item.designation }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 font-medium">{{ item.organization }}</p>
                </div>
              </div>
            </div>
            
            <!-- Right Side - Period & Sector -->
            <div class="flex flex-col sm:items-end gap-2">
              <UBadge 
                color="orange" 
                variant="soft" 
                size="sm"
              >
                {{ item.period }}
              </UBadge>
              <UBadge 
                :color="item.sector === 'Private' ? 'blue' : item.sector === 'Development' ? 'green' : 'gray'" 
                variant="outline" 
                size="sm"
              >
                {{ item.sector }}
              </UBadge>
            </div>
          </div>
          
          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </UCard>
      </div>
    </div>
  </section>
</template>