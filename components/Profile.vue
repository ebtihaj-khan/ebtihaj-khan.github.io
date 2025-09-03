<template>
  <section id="profile" class="relative mb-12 md:mb-16 xl:mb-20 print:text-xs">
    <!-- Hero Section with Gradient Background -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 md:p-12 lg:p-16">
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
      
      <div class="relative z-10">
        <!-- Main Title -->
        <div class="mb-6">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
            Technical Product Manager
          </h1>
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <UBadge color="blue" variant="soft" size="lg" class="text-sm font-medium">
              Data & Analytics
            </UBadge>
            <UBadge color="purple" variant="soft" size="lg" class="text-sm font-medium">
              GIS Technology
            </UBadge>
            <UBadge color="green" variant="soft" size="lg" class="text-sm font-medium">
              HealthTech
            </UBadge>
          </div>
        </div>

        <!-- Experience Highlight -->
        <div class="mb-8 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">8+ Years Experience</span>
          </div>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I am a data-driven Product Manager passionate about developing solutions that solve real-life problems through technology. From citizen-centric tech to tackling pressing health issues, I've shipped over <strong class="text-gray-900 dark:text-white">30 digital products</strong> across public, private, and nonprofit sectors.
          </p>
        </div>

        <!-- Current Focus -->
        <div class="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon name="i-heroicons-sparkles" class="w-5 h-5 text-blue-500" />
            Current Mission
          </h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Currently tackling a critical challenge in the global health sector with a <strong class="text-blue-600 dark:text-blue-400">Gates Foundation-backed program</strong>. Spearheading the development of a data-driven GIS-based product that has the potential to impact millions of lives.
          </p>
        </div>

        <!-- What Sets Me Apart -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
          <div class="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <Icon name="i-heroicons-heart" class="w-6 h-6 text-white" />
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Passion for Impact</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">I don't just build products, I build products that matter. My social conscience fuels my drive to create solutions that address real-world challenges.</p>
          </div>
          
          <div class="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <Icon name="i-heroicons-chart-bar" class="w-6 h-6 text-white" />
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Data-Driven Decisions</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">Numbers are my friends! I leverage data analysis to inform every step of the product development process, ensuring we build what users truly need.</p>
          </div>
          
          <div class="p-6 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <Icon name="i-heroicons-users" class="w-6 h-6 text-white" />
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Collaborative Leadership</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">I believe in the power of cross-functional teams. I bring everyone to the table, fostering a culture of open communication and shared ownership.</p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
            More than products, I build solutions that empower people and leave a lasting impact.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <UButton 
              color="blue" 
              variant="solid" 
              size="lg"
              icon="i-heroicons-envelope"
              class="font-semibold"
            >
              Let's Connect
            </UButton>
            <UButton 
              color="gray" 
              variant="outline" 
              size="lg"
              icon="i-heroicons-document-text"
              class="font-semibold"
            >
              View Projects
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
