<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { photoCategories, photos } from '../data/photos.js'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const selectedCategory = ref('All')
const lightboxIndex = ref(-1)

const filteredPhotos = computed(() =>
  selectedCategory.value === 'All'
    ? photos
    : photos.filter((photo) => photo.category === selectedCategory.value),
)

const activePhoto = computed(() => filteredPhotos.value[lightboxIndex.value] ?? null)

const openLightbox = (index) => {
  lightboxIndex.value = index
}

const closeLightbox = () => {
  lightboxIndex.value = -1
}

const step = (offset) => {
  const total = filteredPhotos.value.length
  if (total === 0) return
  lightboxIndex.value = (lightboxIndex.value + offset + total) % total
}

const onKeydown = (event) => {
  if (event.key === 'Escape') closeLightbox()
  else if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
}

const releaseLightbox = () => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
}

watch(activePhoto, (photo) => {
  if (photo) {
    window.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    releaseLightbox()
  }
})

watch(selectedCategory, closeLightbox)

onBeforeUnmount(releaseLightbox)
</script>

<template>
  <section
    v-if="loading"
    id="photography"
    aria-label="Photography section loading"
    class="w-full bg-[#f4f7fb] px-4 py-24 sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <div class="mx-auto w-full max-w-7xl">
      <div class="mb-14 flex flex-col items-start gap-4 md:items-center">
        <div class="h-4 w-32 animate-pulse rounded bg-slate-200"></div>
        <div class="h-10 w-full max-w-lg animate-pulse rounded bg-slate-200"></div>
      </div>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 6" :key="n" class="h-64 animate-pulse rounded-2xl bg-slate-200"></div>
      </div>
    </div>
  </section>

  <section
    v-else
    id="photography"
    aria-label="Photography gallery"
    class="relative w-full overflow-hidden bg-[#f4f7fb] px-4 py-24 text-[#10131a] sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-[-12%] top-[-8%] aspect-square w-[min(42vw,380px)] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,106,61,0.12),transparent_60%)] blur-3xl"
    ></div>

    <div class="relative z-10 mx-auto w-full max-w-7xl">
      <div class="mb-14 flex flex-col items-start gap-4 md:mb-16 md:items-center md:text-center">
        <span class="text-xs font-bold uppercase tracking-[0.15em] text-[#d64f26]">
          Through The Lens
        </span>
        <h2 class="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10131a]">
          Photography.
        </h2>
        <p class="max-w-xl text-[1.05rem] leading-[1.7] text-[#425066]">
          The same attention to composition I bring to an interface, pointed at the world instead of a screen.
        </p>
      </div>

      <div class="mb-8 flex flex-wrap items-center gap-2 md:mb-10 md:justify-center">
        <button
          v-for="category in photoCategories"
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

      <div class="columns-1 gap-5 sm:columns-2 lg:columns-3">
        <button
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          type="button"
          class="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-[rgba(16,19,26,0.08)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          :aria-label="`View ${photo.title} full size`"
          @click="openLightbox(index)"
        >
          <img
            :src="photo.src"
            :alt="photo.title"
            loading="lazy"
            decoding="async"
            class="block w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span
            class="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-10 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <span class="text-sm font-bold text-white">{{ photo.title }}</span>
            <span class="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white/70">
              {{ photo.category }}
            </span>
          </span>
        </button>
      </div>

      <p
        v-if="filteredPhotos.length === 0"
        class="mt-8 text-center text-sm font-medium text-[#516078]"
      >
        No photographs in this category yet.
      </p>
    </div>

    <Teleport to="body">
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0"
      >
        <div
          v-if="activePhoto"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070c]/92 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          :aria-label="activePhoto.title"
          @click.self="closeLightbox"
        >
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:right-8 sm:top-8"
            aria-label="Close"
            @click="closeLightbox"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4l-6.3 6.3-1.42-1.42 6.3-6.29-6.3-6.29 1.42-1.42 6.3 6.3 6.3-6.3z" />
            </svg>
          </button>

          <button
            v-if="filteredPhotos.length > 1"
            type="button"
            class="absolute left-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:left-8"
            aria-label="Previous photo"
            @click.stop="step(-1)"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M15.4 7.41 14 6l-6 6 6 6 1.4-1.41L10.83 12z" />
            </svg>
          </button>

          <figure class="flex max-h-full max-w-5xl flex-col items-center gap-4" @click.stop>
            <img
              :src="activePhoto.src"
              :alt="activePhoto.title"
              class="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption class="flex items-center gap-3 text-center">
              <span class="text-sm font-bold text-white">{{ activePhoto.title }}</span>
              <span class="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white/60">
                {{ activePhoto.category }}
              </span>
            </figcaption>
          </figure>

          <button
            v-if="filteredPhotos.length > 1"
            type="button"
            class="absolute right-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 sm:right-8"
            aria-label="Next photo"
            @click.stop="step(1)"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M8.6 16.59 10 18l6-6-6-6-1.4 1.41L13.17 12z" />
            </svg>
          </button>
        </div>
      </transition>
    </Teleport>
  </section>
</template>
