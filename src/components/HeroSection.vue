<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const handleAction = (action) => {
  console.log(`Action triggered: ${action}`)
}
</script>

<template>
  <section
    v-if="loading"
    id="home"
    aria-label="Hero section loading"
    class="relative grid min-h-[90svh] place-items-center overflow-hidden bg-[linear-gradient(180deg,#fefbf5_0%,#fbf9f4_50%,#f4f7fb_100%)] px-4 py-24 sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <div class="relative z-10 grid w-full max-w-7xl gap-8">
      <div class="h-6 w-64 animate-pulse rounded-full bg-slate-200"></div>
      <div class="space-y-3">
        <div class="h-12 w-full max-w-4xl animate-pulse rounded bg-slate-200"></div>
        <div class="h-12 w-4/5 animate-pulse rounded bg-slate-200"></div>
      </div>
      <div class="space-y-3">
        <div class="h-5 w-full max-w-5xl animate-pulse rounded bg-slate-200"></div>
        <div class="h-5 w-11/12 animate-pulse rounded bg-slate-200"></div>
      </div>
      <div class="flex gap-3">
        <div class="h-12 w-56 animate-pulse rounded-full bg-slate-200"></div>
        <div class="h-12 w-40 animate-pulse rounded-full bg-slate-200"></div>
      </div>
    </div>
  </section>

  <section
    v-else
    id="home"
    aria-label="Hero section"
    class="relative grid min-h-[90svh] place-items-center overflow-hidden bg-[radial-gradient(circle_at_12%_15%,rgba(255,106,61,0.18),transparent_45%),radial-gradient(circle_at_88%_25%,rgba(28,166,164,0.18),transparent_40%),linear-gradient(180deg,#fefbf5_0%,#fbf9f4_50%,#f4f7fb_100%)] px-4 py-24 text-[#10131a] sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <!-- Background Ambient Orbs -->
    <div
      aria-hidden="true"
      class="motion-safe:animate-float-orb absolute left-[-6%] top-[8%] aspect-square w-[min(45vw,380px)] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0),rgba(255,201,182,0.65))] pointer-events-none blur-sm"
    ></div>
    <div
      aria-hidden="true"
      class="motion-safe:animate-float-orb absolute bottom-[-15%] right-[-8%] aspect-square w-[min(48vw,420px)] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0),rgba(179,235,233,0.65))] [animation-delay:1.5s] pointer-events-none blur-sm"
    ></div>

    <div
      class="motion-safe:animate-hero-reveal relative z-10 grid w-full max-w-7xl gap-8 text-left"
    >
      <!-- Academic & Status Pill -->
      <div class="flex flex-wrap items-center gap-4">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-[rgba(214,79,38,0.2)] bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#d64f26] shadow-sm backdrop-blur-md"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6a3d] opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-[#d64f26]"></span>
          </span>
          Software Engineer & Informatics Specialist
        </span>
        <span class="hidden text-xs font-medium text-[#516078] sm:inline-block">
          Strathmore University '27 | Informatics & Computer Science
        </span>
      </div>

      <!-- Main Headline -->
      <h1
        class="m-0 max-w-[17ch] text-[clamp(2.4rem,6.8vw,5.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-[#10131a] [font-family:'Avenir_Next','Gill_Sans','Segoe_UI',sans-serif]"
      >
        Engineered systems that bridge 
        <span class="mt-2 block bg-gradient-to-r from-[#d64f26] via-[#e65c33] to-[#1ca6a4] bg-clip-text text-transparent">
          software precision & intuitive UX.
        </span>
      </h1>

      <!-- Subtitle Description -->
      <p class="m-0 max-w-[68ch] text-[clamp(1.05rem,2vw,1.25rem)] leading-[1.7] text-[#425066]">
        I design and deliver resilient end-to-end digital solutions—ranging from native mobile apps 
        and full-stack platforms to intelligent data systems and embedded designs. Driven by clean architecture, refined interaction, and real-world impact.
      </p>

      <!-- Primary Action Buttons -->
      <div class="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
        <button
          type="button"
          class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-[#ff6a3d] px-6 py-3.5 text-[0.98rem] font-bold tracking-[0.01em] text-white shadow-[0_10px_28px_rgba(214,79,38,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d64f26] hover:shadow-[0_14px_32px_rgba(214,79,38,0.38)] active:translate-y-0 min-[430px]:w-auto"
          @click="handleAction('projects')"
        >
          <span>Explore Featured Work</span>
          <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <button
          type="button"
          class="w-full rounded-full border border-[rgba(16,19,26,0.18)] bg-white/80 px-6 py-3.5 text-[0.98rem] font-bold tracking-[0.01em] text-[#10131a] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(16,19,26,0.3)] hover:bg-white hover:shadow-[0_8px_24px_rgba(16,19,26,0.12)] active:translate-y-0 min-[430px]:w-auto"
          @click="handleAction('contact')"
        >
          Let's Connect
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes hero-reveal {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-orb {
  0%,
  100% {
    transform: translateY(0) translateX(0) scale(1);
  }
  50% {
    transform: translateY(-16px) translateX(8px) scale(1.03);
  }
}

.animate-hero-reveal {
  animation: hero-reveal 850ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-float-orb {
  animation: float-orb 8s ease-in-out infinite;
}
</style>
