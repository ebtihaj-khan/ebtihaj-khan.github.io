<script setup lang="ts">
const skills = {
  "Product Strategy": [
      "Product Lifecycle",
      "Roadmapping",
      "PRDs",
      "Go-to-Market",
      "Product Discovery",
      "OKRs"
    ],
    "User Research & UX": [
      "User Interviews",
      "Usability Testing",
      "JTBD",
      "Personas",
      "Journey Mapping",
      "Wireframing"
    ],
    "Data & Analysis": [
      "SQL",
      "Funnel Analysis",
      "A/B Testing",
      "Google Analytics",
      "Mixpanel",
      "Tableau",
      "Excel"
    ],
    "Agile & Delivery": [
      "Scrum",
      "Kanban",
      "Jira",
      "Confluence",
      "Sprint Planning",
      "Backlog Grooming",
      "Release Management"
    ],
    "Tech Fluency": [
      "APIs",
      "REST",
      "JSON",
      "SQL",
      "PostgreSQL",
      "PostGIS",
      "Git",
    ],
    "Collaboration Tools": [
      "Slack",
      "Notion",
      "Miro",
      "Figma",
      "Trello",
      "Asana"
    ],
    "Stakeholder Management": [
      "Cross-functional Alignment",
      "Communication Plans",
      "Workshops",
      "Change Management"
    ],
    "Domain Expertise": [  
    "B2B2C",
    "B2B",
    "B2C",
    "HealthTech",
      "GIS",
      "Humanitarian Tech",
      "Digital Infrastructure",
      "Citizen-Centric Tech",
      "Public Sector",
      "Non-Profit",
      "Startups",
    ]
  }
</script>
<template>
  <section id="skills" class="my-12 md:my-16 xl:my-20 print:break-before-page">
    <SectionTitle title="Skills" icon="i-heroicons-cpu-chip" />
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(items, category) in skills" 
        :key="category"
        class="group"
      >
        <UCard 
          class="h-full hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-300 group-hover:-translate-y-1"
          :ui="{ 
            divide: 'divide-none', 
            body: { padding: 'p-6' }, 
            background: 'bg-white dark:bg-gray-800', 
            ring: 'ring-1 ring-gray-200 dark:ring-gray-700', 
            shadow: 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50',
            rounded: 'rounded-2xl'
          }"
        >
          <!-- Category Header -->
          <div class="mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
              <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              {{ category }}
            </h3>
          </div>
          
          <!-- Skills Grid -->
          <div class="flex flex-wrap gap-2">
            <UBadge 
              v-for="skill in items" 
              :key="skill"
              color="blue" 
              variant="soft" 
              size="sm"
              class="group-hover:scale-105 transition-transform duration-200"
            >
              {{ skill }}
            </UBadge>
          </div>
          
          <!-- Hover Effect Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </UCard>
      </div>
    </div>
  </section>
</template>