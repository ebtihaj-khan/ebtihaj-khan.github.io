<script setup lang="ts">
const experience = [
  {
    "period": "February 2022 till date",
    "organization": "Rayn Group",
    "designation": "Senior Product Manager",
    "introduction": "Rayn is on a mission to leverage cutting-edge technology and large-scale program implementation to solve some of the most critical public sector challenges in Pakistan.",
    "contributions": [
      "Led the development of ML-powered GIS analytics systems, increasing automation in identifying unvisited areas by 87%.",
      "Built GIS-driven spatial intelligence solutions for real-time public health interventions, boosting vaccination coverage by 25%.",
      "Designed and implemented geofencing ML based models, enhancing workforce tracking and security compliance through automated timestamped movement logs",
      "Helped manage key accounts and stakeholders, including WHO, Gates Foundation, and government agencies, aligning product goals with global health initiatives.",
      "Developed and maintained a comprehensive product roadmap, ensuring alignment with strategic objectives and market trends."
    ]
  },
  {
    "period": "October 2016 - January 2022",
    "organization": "Code for Pakistan",
    "designation": "Government Innovation Lead",
    "introduction": "Tech for Change is a civic innovation non-profit made up of a passionate community of technologists and talented professionals, driven by a strong belief in civic innovation and social impact that can move Pakistan forward in measurable and meaningful ways.",
    "contributions": [
      "Led product development and user testing of civic tech solutions, achieving 80%+ adoption rates across 20 government departments.",
      "Managed strategic partnerships with the World Bank, Ministry of National Health Services Regulations and Coordination, Khyber Pakhtunkhwa Information Technology Board, and the Punjab Information Technology Board securing funding and scaling digital solutions.",
      "Conducted workshops and training sessions for government officials, empowering them to leverage technology for better governance and service delivery."
    ]
  },
  {
    "period": "October 2015 - September 2016",
    "organization": "The Nerd Camp",
    "designation": "Business Innovation Officer",
    "introduction": "The Nerd Camp is a for-profit organization that provides training and resources to help people learn to code and build their own apps.",
    "contributions": [
      "Developed and implemented a comprehensive business strategy for The Nerd Camp, focusing on growth and expansion of the organization.",
      "Managed client relationships and partnerships, ensuring high levels of customer satisfaction and retention.",
      "Led the development of new business opportunities and partnerships, resulting in increased revenue and market share."
    ]
  },
  {
    "period": "April 2014 - October 2015",
    "organization": "Sweet Pixel Studios",
    "designation": "Software Engineer",
    "introduction": "Sweet Pixel Studios is an indie game development agency.",
    "contributions": [
      "Developed and maintained various indie games and apps, including a mobile game called 'Pixel Fall'.",
      "Managed client relationships and partnerships, ensuring high levels of customer satisfaction and retention.",
      "Integrated gaming analytics, improving user engagement and retention."
    ]
  }
]
</script>
<template>
  <section class="my-12 md:my-16 xl:my-20" id="experience">
    <SectionTitle title="Experience" icon="i-heroicons-briefcase" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div 
        v-for="(item, index) in experience" 
        :key="index"
        class="group relative"
      >
        <!-- Timeline Line for Desktop -->
        <div v-if="index % 2 === 0" class="hidden lg:block absolute left-full top-0 w-px h-full bg-gradient-to-b from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 transform translate-x-3"></div>
        
        <UCard 
          class="h-full hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300 group-hover:-translate-y-1"
          :ui="{ 
            divide: 'divide-none', 
            background: 'bg-white dark:bg-gray-800', 
            body: { 
              base: 'text-sm print:text-xs', 
              padding: 'p-6' 
            }, 
            header: { 
              padding: 'p-6 pb-4' 
            }, 
            ring: 'ring-1 ring-gray-200 dark:ring-gray-700', 
            shadow: 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50',
            rounded: 'rounded-2xl'
          }"
        >
          <template #header>
            <div class="space-y-3">
              <!-- Organization & Period -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {{ item.organization }}
                </h2>
                <UBadge 
                  color="blue" 
                  variant="soft" 
                  size="sm"
                  class="self-start sm:self-center"
                >
                  {{ item.period }}
                </UBadge>
              </div>
              
              <!-- Designation -->
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span class="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {{ item.designation }}
                </span>
              </div>
            </div>
          </template>
          
          <!-- Introduction -->
          <div class="mb-6">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ item.introduction }}
            </p>
          </div>
          
          <!-- Contributions -->
          <div class="space-y-3">
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Icon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500" />
              Key Contributions
            </h4>
            <ul class="space-y-2">
              <li 
                v-for="(contribution, idx) in item.contributions" 
                :key="idx"
                class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <div class="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{{ contribution }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </UCard>
      </div>
    </div>
  </section>
</template>