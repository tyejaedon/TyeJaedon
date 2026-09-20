<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const selectedCategory = ref('All')

const categoryFilterOptions = ['All', 'Web', 'Mobile', 'Hardware', 'Machine Learning']

// The Structured Data Array featuring 14 repositories
const projects = [
  {
    id: 1,
    category: 'Mobile',
    title: 'TigerPlayer',
    description: 'A high-fidelity, performance-oriented Android music player built for enthusiasts. Designed with an emphasis on Neural Expressive UI and uncompromising audio quality.',
    techStack: ['Kotlin', 'Android', 'Glassmorphism'],
    accent: 'bg-[#ff6a3d]'
  },
  {
    id: 2,
    category: 'Machine Learning',
    title: 'AI Neural Compressor Engine',
    description: 'Advanced, on-device neural compression suite for Android utilizing hybrid autoencoder architectures for images, video, and audio.',
    techStack: ['Kotlin', 'Machine Learning', 'Autoencoders'],
    accent: 'bg-[#10131a]'
  },
  {
    id: 3,
    category: 'Web',
    title: 'Waste Connect (ICS-PROJECT-1)',
    description: 'A digital solution designed to bridge the gap between citizens and waste management authorities to combat plastic and toxic waste pollution.',
    techStack: ['JavaScript', 'Web Architecture', 'Vue.js'],
    accent: 'bg-[#1ca6a4]'
  },
  {
    id: 4,
    category: 'Hardware',
    title: 'Intelligent Environmental Node',
    description: 'Custom hardware integration utilizing ESP32 microcontrollers and DHT22 sensors to process environmental data for remote optimization.',
    techStack: ['ESP32', 'Embedded C', 'Circuit Design'],
    accent: 'bg-[#ff6a3d]'
  },
  {
    id: 5,
    category: 'Mobile',
    title: 'Cover-Screen-OS',
    description: 'A specialized Android application designed to transform and optimize the outer cover display interfaces of clamshell foldable smartphones.',
    techStack: ['Kotlin', 'Android UI', 'System Architecture'],
    accent: 'bg-[#1ca6a4]'
  },
  {
    id: 6,
    category: 'Web',
    title: 'Enterprise CRM Tool',
    description: 'A scalable customer relationship management tool built to handle complex enterprise data flows and server administration.',
    techStack: ['TypeScript', 'Node.js', 'System Architecture'],
    accent: 'bg-[#10131a]'
  },
  {
    id: 7,
    category: 'Mobile',
    title: 'Complaint Management System',
    description: 'A dedicated mobile system built to streamline issue reporting, tracking, and resolution workflows for user complaints.',
    techStack: ['Kotlin', 'Android', 'Backend Integration'],
    accent: 'bg-[#ff6a3d]'
  },
  {
    id: 8,
    category: 'Machine Learning',
    title: 'AI_Compressor Core',
    description: 'A local-first neural compression project training autoencoders for media data, bypassing traditional codecs like JPEG and MP3.',
    techStack: ['Python', 'TensorFlow', 'Image Processing'],
    accent: 'bg-[#10131a]'
  },
  {
    id: 9,
    category: 'Web',
    title: 'Digital Portfolio Architecture',
    description: 'A highly optimized, responsive personal portfolio built with modern web frameworks and styled with utility-first CSS.',
    techStack: ['Vue.js', 'Vite', 'Tailwind CSS'],
    accent: 'bg-[#1ca6a4]'
  },
  {
    id: 10,
    category: 'Machine Learning',
    title: 'AI Compressor Mobile App',
    description: 'Neural media compression application supporting full on-device workflows for image, audio, and video compression.',
    techStack: ['Kotlin', 'Jetpack Compose', 'TensorFlow Lite'],
    accent: 'bg-[#ff6a3d]'
  },
  {
    id: 11,
    category: 'Hardware',
    title: 'C-Based IoT Project',
    description: 'Low-level embedded programming project interfacing directly with hardware components for precise sensor control.',
    techStack: ['C', 'Embedded Systems', 'IoT Architecture'],
    accent: 'bg-[#10131a]'
  },
  {
    id: 12,
    category: 'Web',
    title: 'Ubiquitous Lamp',
    description: 'A specialized third-year university project focused on advanced server administration and network deployment protocols.',
    techStack: ['JavaScript', 'Server Admin', 'Networking'],
    accent: 'bg-[#1ca6a4]'
  },
  {
    id: 13,
    category: 'Web',
    title: 'M-Pesa QR Scanner System',
    description: 'A financial technology integration designed to instantly parse, validate, and process mobile payment QR codes.',
    techStack: ['JavaScript', 'FinTech', 'API Integration'],
    accent: 'bg-[#ff6a3d]'
  },
  {
    id: 14,
    category: 'Web',
    title: 'CMS Platform',
    description: 'A robust Content Management System architected for streamlined data entry, secure access control, and dynamic content delivery.',
    techStack: ['Kotlin', 'Backend Architecture', 'Database Design'],
    accent: 'bg-[#10131a]'
  }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects
  }

  return projects.filter((project) => project.category === selectedCategory.value)
})
</script>

<template>
  <section
    id="projects"
    aria-label="Project Showcase"
    class="relative w-full overflow-hidden bg-[#fefbf5] px-4 py-24 text-[#10131a] sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <div class="relative z-10 mx-auto w-full max-w-7xl">
      
      <!-- Section Header -->
      <div class="mb-14 flex flex-col items-start gap-4 md:mb-16 md:items-center md:text-center">
        <span class="text-xs font-bold uppercase tracking-[0.15em] text-[#1ca6a4]">
          Featured Work
        </span>
        <h2 class="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10131a]">
          Open Source & Engineered Solutions.
        </h2>
      </div>

      <!-- Category Filter -->
      <div class="mb-8 flex flex-wrap items-center gap-2 md:mb-10 md:justify-center">
        <button
          v-for="category in categoryFilterOptions"
          :key="category"
          type="button"
          class="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200"
          :class="selectedCategory === category
            ? 'border-transparent bg-[#10131a] text-white shadow-[0_10px_20px_rgba(16,19,26,0.18)]'
            : 'border-[rgba(16,19,26,0.18)] bg-white/80 text-[#425066] hover:-translate-y-0.5 hover:border-[rgba(16,19,26,0.3)] hover:bg-white'"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Dynamic Project Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        <article 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(16,19,26,0.08)] bg-white/60 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[rgba(16,19,26,0.15)]"
        >
          <!-- Top Content -->
          <div>
            <div class="mb-5 flex items-center justify-between">
              <span class="text-xs font-bold tracking-wider text-[#516078] uppercase">
                {{ project.category }}
              </span>
              <span :class="['h-2.5 w-2.5 rounded-full shadow-sm', project.accent]"></span>
            </div>
            <h3 class="mb-3 text-xl font-bold leading-tight text-[#10131a] group-hover:text-[#d64f26] transition-colors duration-200">
              {{ project.title }}
            </h3>
            <p class="mb-8 text-sm leading-[1.6] text-[#425066]">
              {{ project.description }}
            </p>
          </div>
          
          <!-- Bottom Content: Tech Stack -->
          <div class="mt-auto border-t border-[rgba(16,19,26,0.08)] pt-5">
            <ul class="flex flex-wrap gap-2">
              <li 
                v-for="tech in project.techStack" 
                :key="tech"
                class="rounded-md border border-[rgba(16,19,26,0.05)] bg-[#f4f7fb] px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-[#516078]"
              >
                {{ tech }}
              </li>
            </ul>
          </div>
        </article>
      </div>

      <p
        v-if="filteredProjects.length === 0"
        class="mt-8 text-center text-sm font-medium text-[#516078]"
      >
        No projects found in this category yet.
      </p>

    </div>
  </section>
</template>