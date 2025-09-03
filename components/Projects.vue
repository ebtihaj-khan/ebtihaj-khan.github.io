<script setup lang="ts">
const projects = [
  {
    "period": "September 2024 - Present",
    "organization": "Rayn Group",
    "project": "Digital Information Systems for PEI (DISP)",
    "description": "Leading the design and development of DISP, a mobile application aimed at digitizing data collection for polio eradication campaigns.",
    "bullets": [
      "Replaces manual tally sheets with a robust digital workflow, improving efficiency, accuracy, and real-time decision-making for frontline vaccination teams.",
      "Ensures data integrity and faster reporting, enabling quicker response from health officials and campaign planners.",
      "Working closely with field teams, UX designers, and engineers to build a user-friendly solution tailored for use in low-connectivity environments."
    ]
  },
  {
    "period": "February 2022 - September 2024",
    "organization": "Rayn Group",
    "project": "Geographical Coverage Support System (GCSS)",
    "description": "As the Product Manager for GCSS, I worked closely with engineers, data teams, and health program stakeholders to define product requirements, map workflows, and prioritize features. The platform allows managers to track polio teams and supervisors in real time, identify missed or persistently uncovered areas, and catch issues like irregular vaccination patterns or non-compliance with SOPs.",
    "bullets": [
      "Developed a comprehensive system for monitoring and analyzing polio vaccination coverage across Pakistan.",
      "Implemented real-time tracking of vaccination teams and supervisors to ensure efficient operations.",
      "Created a tool for identifying areas with low vaccination rates and potential coverage gaps.",
      "Designed a platform for monitoring vaccination compliance and SOP adherence."
    ]
  },
  {
    "period": "February 2022 - September 2024",
    "organization": "Rayn Group",
    "project": "ML Based Model to Identify Team Support Centers",
    "description": "In this project, I led the product development of an ML-based model designed to identify Team Support Centers (TSCs)—the physical locations where polio vaccinators begin and end their day. The goal was to use data more intelligently to understand field team movements, workloads, and overall performance.",
    "bullets": [
      "ML model to detect ingress and egress movement patterns of vaccinators.",
      "Automatic detection of start and end points of daily vaccinator routes.",
      "Mapping of TSCs to actual field behavior (vs. planned deployment points)."
    ]
  },
  {
    "period": "February 2022 - September 2024",
    "organization": "Rayn Group",
    "project": "xLATS",
    "description": "In this project, I led the product vision and delivery of xLATS, a custom-built platform for AgriTech startups to monitor and manage their field operations, farmer onboarding, and geospatial farm data. I worked closely with engineering and GIS teams to define use cases, design workflows, and prioritize features that would support both business users and farmers in making data-driven agricultural decisions.",
    "bullets": [
      "Custom-built platform for AgriTech startups to monitor and manage their field operations, farmer onboarding, and geospatial farm data.",
      "Designed workflows and prioritized features that would support both business users and farmers in making data-driven agricultural decisions."
    ]
  }
]
</script>
<template>
  <section id="projects" class="my-12 md:my-16 xl:my-20">
    <SectionTitle title="Projects" icon="i-heroicons-rocket-launch" />
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div 
        v-for="(item, index) in projects" 
        :key="index"
        class="group"
      >
        <UCard 
          class="h-full hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-300 group-hover:-translate-y-1"
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
              <!-- Project Title & Organization -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  {{ item.project }}
                </h2>
                <UBadge 
                  color="purple" 
                  variant="soft" 
                  size="sm"
                  class="self-start sm:self-center"
                >
                  {{ item.period }}
                </UBadge>
              </div>
              
              <!-- Organization -->
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span class="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {{ item.organization }}
                </span>
              </div>
            </div>
          </template>
          
          <!-- Description -->
          <div class="mb-6">
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
          
          <!-- Key Features -->
          <div v-if="item.bullets" class="space-y-3">
            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Icon name="i-heroicons-star" class="w-4 h-4 text-purple-500" />
              Key Features
            </h4>
            <ul class="space-y-2">
              <li 
                v-for="(bullet, idx) in item.bullets" 
                :key="idx"
                class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
              >
                <div class="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </UCard>
      </div>
    </div>
  </section>
</template>