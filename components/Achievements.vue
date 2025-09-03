<template>
  <section id="achievements" class="my-12 md:my-16 xl:my-20">
    <SectionTitle title="Achievements & Recognition" icon="i-heroicons-trophy" />
    
    <UCard 
      class="hover:shadow-xl hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/20 transition-all duration-300"
      :ui="{ 
        divide: 'divide-none', 
        background: 'bg-white dark:bg-gray-800', 
        body: { padding: 'p-8' }, 
        ring: 'ring-1 ring-gray-200 dark:ring-gray-700', 
        shadow: 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50',
        rounded: 'rounded-2xl'
      }"
    >
      <div class="space-y-6">
        <div 
          v-for="(achievement, index) in achievements" 
          :key="index"
          class="group flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 dark:hover:from-yellow-900/20 dark:hover:to-orange-900/20 transition-all duration-300"
        >
          <!-- Achievement Icon -->
          <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon name="i-heroicons-trophy" class="w-5 h-5 text-white" />
          </div>
          
          <!-- Achievement Content -->
          <div class="flex-1">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
              {{ achievement }}
            </p>
          </div>
        </div>
      </div>
    </UCard>
  </section>
</template>

<script setup lang="ts">
const achievements = [
  "In collaboration with KP PMRU, I helped draft the KP Open Data Strategy.",
  "Spoke on Building Policy for Open and Inclusive Governance at the g0v summit 2020.",
  "Co-authored a position paper on Civic Fellowships: A Framework for Civic Technology Innovation in Pakistan which was presented at a workshop on 'Civic Technologies: Research, Practice, and Open Challenges' at the 23rd ACM Conference on Computer-Supported Cooperative Work and Social Computing.",
  "Presented the Impacts of Civic Tech Projects in Pakistan at The Impacts of Civic Technology Conference 2017 in Taiwan.",
  "Lead a conversation about civic tech initiatives to address and respond to COVID-19 at the Code for All 2020 Summit."
]
</script>
