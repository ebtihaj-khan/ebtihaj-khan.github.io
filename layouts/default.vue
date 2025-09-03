<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    <main class="flex-1">
      <UContainer class="py-8 sm:py-12 lg:py-16" :ui="{ constrained: 'max-w-6xl' }">
        <slot />
      </UContainer>
    </main>
    
    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <UContainer class="py-8" :ui="{ constrained: 'max-w-6xl' }">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            © {{ new Date().getFullYear() }} Ebtihaj Khan. All rights reserved.
          </div>
          <div class="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/ebtihajkhan/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Icon name="mdi:linkedin" size="20" />
            </a>
            <a 
              href="https://medium.com/@ebtihaj316/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <Icon name="mdi:medium" size="20" />
            </a>
            <a 
              href="mailto:ebtihaj316@gmail.com" 
              class="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            >
              <Icon name="i-heroicons-envelope" size="20" />
            </a>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>
