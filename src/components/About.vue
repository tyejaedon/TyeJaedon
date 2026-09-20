<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section
    v-if="loading"
    id="about"
    aria-label="About section loading"
    class="relative w-full overflow-hidden bg-[#f4f7fb] px-4 py-24 sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <div class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      <div class="space-y-4">
        <div class="h-4 w-32 animate-pulse rounded bg-slate-200"></div>
        <div class="h-10 w-full max-w-xl animate-pulse rounded bg-slate-200"></div>
        <div class="h-10 w-5/6 animate-pulse rounded bg-slate-200"></div>
        <div class="h-5 w-full animate-pulse rounded bg-slate-200"></div>
        <div class="h-5 w-11/12 animate-pulse rounded bg-slate-200"></div>
        <div class="h-5 w-10/12 animate-pulse rounded bg-slate-200"></div>
      </div>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div class="h-36 animate-pulse rounded-2xl bg-slate-200 sm:col-span-2"></div>
        <div class="h-40 animate-pulse rounded-2xl bg-slate-200"></div>
        <div class="h-40 animate-pulse rounded-2xl bg-slate-200"></div>
        <div class="h-28 animate-pulse rounded-2xl bg-slate-200 sm:col-span-2"></div>
      </div>
    </div>
  </section>

  <section
    v-else
    id="about"
    aria-label="About Me section"
    class="relative w-full overflow-hidden bg-[#f4f7fb] px-4 py-24 text-[#10131a] sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <!-- Ambient Background Accent -->
    <div
      aria-hidden="true"
      class="absolute left-[-10%] top-[-10%] aspect-square w-[min(40vw,350px)] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(28,166,164,0.12),transparent_60%)] pointer-events-none blur-3xl"
    ></div>

    <div class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      
      <!-- Left Column: Narrative -->
      <div class="flex flex-col justify-center">
        <span class="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#d64f26]">
          The Journey
        </span>
        <h2 class="mb-7 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10131a] [font-family:'Avenir_Next','Gill_Sans','Segoe_UI',sans-serif] [text-wrap:balance]">
          Engineering at the intersection of hardware and human experience.
        </h2>
        <p class="mb-6 text-[1.05rem] leading-[1.7] text-[#425066]">
          I am a software engineer and Informatics specialist currently completing my degree at Strathmore University. I believe the best digital products don't just live on a screen—they connect seamlessly with the physical world and intelligent systems.
        </p>
        <p class="text-[1.05rem] leading-[1.7] text-[#425066]">
          My approach is rooted in clean architecture and resilient engineering. Whether I am architecting a Node.js backend, crafting a native mobile interface, or programming an embedded microcontroller, my focus remains on building solutions that are both precise and profoundly usable.
        </p>
      </div>

      <!-- Right Column: Tech Stack Bento Grid -->
      <div>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <!-- Academic Card -->
        <div class="col-span-1 flex flex-col justify-between rounded-2xl border border-[rgba(16,19,26,0.08)] bg-white/60 p-7 shadow-sm backdrop-blur-md sm:col-span-2">
          <svg class="mb-4 h-6 w-6 text-[#1ca6a4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <div>
            <h3 class="text-lg font-bold text-[#10131a]">Strathmore University '27 | Informatics & Computer Science</h3>
          </div>
        </div>

        <!-- Full-Stack & Mobile -->
        <div class="flex flex-col justify-between rounded-2xl border border-[rgba(16,19,26,0.08)] bg-white/60 p-7 shadow-sm backdrop-blur-md">
          <h3 class="mb-8 text-lg font-bold leading-tight text-[#10131a]">Full-Stack &<br>Mobile</h3>
          <p class="text-sm font-medium text-[#516078]">Vue, React, Kotlin & Jetpack Compose</p>
        </div>

        <!-- Systems & Data -->
        <div class="flex flex-col justify-between rounded-2xl border border-[rgba(16,19,26,0.08)] bg-white/60 p-7 shadow-sm backdrop-blur-md">
          <h3 class="mb-8 text-lg font-bold leading-tight text-[#10131a]">Systems &<br>Data</h3>
          <p class="text-sm font-medium text-[#516078]">ML Optimization & Node.js Backends</p>
        </div>

        <!-- Hardware & IoT -->
        <div class="col-span-1 flex flex-col justify-between rounded-2xl border border-[rgba(16,19,26,0.08)] bg-[#10131a] p-7 shadow-md sm:col-span-2">
          <div class="flex items-start justify-between">
            <h3 class="mb-4 text-lg font-bold text-white">Hardware & IoT</h3>
            <span class="rounded-full bg-[#ff6a3d]/20 px-2.5 py-1 text-xs font-bold tracking-wider text-[#ff6a3d]">EMBEDDED</span>
          </div>
          <p class="text-sm font-medium text-gray-300">ESP32 Microcontrollers & NodeMCU</p>
        </div>

        </div>

        <!-- Bonus Stat Card Section -->
        <div class="mt-10 flex flex-col items-center">
          <h3 class="mb-4 text-lg font-bold text-[#10131a]">Coding Streak & Activity Metrics</h3>
          <div class="flex justify-center rounded-2xl border border-[rgba(16,19,26,0.08)] bg-white/60 p-6 shadow-sm backdrop-blur-md">
            <img
              src="https://streak-stats.demolab.com?user=tyejaedon&theme=transparent&hide_border=true&stroke=10131a&side_ts=10131a&fire=ff6a3d&ring=1ca6a4"
              alt="GitHub Streak Card"
              class="h-auto w-full max-w-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>