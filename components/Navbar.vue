<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
    <UContainer class="flex items-center justify-between py-4" :ui="{ constrained: 'min-w-full', base: '' }">
      <!-- Site Title -->
      <div class="flex items-center">
        <SiteTitle class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
      </div>
      
      <!-- Contact Info & Social Links -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Contact Badges -->
        <div class="flex items-center gap-2">
          <a href="mailto:ebtihaj316@gmail.com" class="group">
            <UBadge 
              color="blue" 
              variant="soft" 
              size="sm"
              class="group-hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <Icon name="i-heroicons-envelope" class="w-3 h-3 mr-1" />
              Email
            </UBadge>
          </a>
        </div>
        
        <!-- Social Links & Theme Toggle -->
        <div class="flex items-center gap-2">
          <a 
            href="https://www.linkedin.com/in/ebtihajkhan/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
          >
            <Icon name="mdi:linkedin" size="20" class="group-hover:scale-110 transition-transform duration-200" />
          </a>
          <a 
            href="https://medium.com/@ebtihaj316/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
          >
            <Icon name="mdi:medium" size="20" class="group-hover:scale-110 transition-transform duration-200" />
          </a>
          <a 
            href="https://github.com/ebtihaj-khan" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
          >
            <Icon name="mdi:github" size="20" class="group-hover:scale-110 transition-transform duration-200" />
          </a>
          <ThemeToggle />
        </div>
      </div>
      
      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center gap-2">
        <UButton
          :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          color="gray"
          variant="ghost"
          size="sm"
          @click="isMenuOpen = !isMenuOpen"
        />
      </div>
    </UContainer>
    
    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
      <UContainer class="py-4 space-y-3">
        <div class="flex items-center gap-2">
          <a href="mailto:ebtihaj316@gmail.com" class="flex-1">
            <UBadge color="blue" variant="soft" size="sm" class="w-full justify-center">
              <Icon name="i-heroicons-envelope" class="w-3 h-3 mr-1" />
              Email
            </UBadge>
          </a>
        </div>
        <div class="flex items-center justify-center gap-4">
          <a 
            href="https://www.linkedin.com/in/ebtihajkhan/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
          >
            <Icon name="mdi:linkedin" size="24" />
          </a>
          <a 
            href="https://medium.com/@ebtihaj316/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            <Icon name="mdi:medium" size="24" />
          </a>
          <a 
            href="https://github.com/ebtihaj-khan" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            <Icon name="mdi:github" size="24" />
          </a>
          <ThemeToggle />
        </div>
      </UContainer>
    </div>
  </nav>
</template>

<script setup>
const isMenuOpen = ref(false)
</script>

