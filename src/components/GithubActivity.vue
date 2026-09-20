<script setup>
import { computed, onMounted } from 'vue'
import { useGithubActivity } from '../composables/useGithub.js'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const { profile, repos, releases, events, status, error, load } = useGithubActivity()

const showSkeleton = computed(() => props.loading || status.value === 'loading' || status.value === 'idle')

const languageColors = {
  Kotlin: '#a97bff',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Python: '#3572a5',
  C: '#555555',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
}

const relativeTime = (value) => {
  if (!value) return ''

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const seconds = (new Date(value) - Date.now()) / 1000
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]

  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(seconds) >= secondsInUnit) {
      return formatter.format(Math.round(seconds / secondsInUnit), unit)
    }
  }

  return 'just now'
}

onMounted(() => load())
</script>

<template>
  <section
    id="github"
    aria-label="GitHub activity"
    class="relative w-full overflow-hidden bg-[#fefbf5] px-4 py-24 text-[#10131a] sm:px-6 lg:px-10 lg:py-28 2xl:px-14"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute left-[-10%] bottom-[-15%] aspect-square w-[min(40vw,360px)] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(28,166,164,0.12),transparent_60%)] blur-3xl"
    ></div>

    <div class="relative z-10 mx-auto w-full max-w-7xl">
      <div class="mb-12 flex flex-col items-start gap-4 md:mb-14 md:items-center md:text-center">
        <span class="text-xs font-bold uppercase tracking-[0.15em] text-[#1ca6a4]">
          Live From GitHub
        </span>
        <h2 class="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
          What I'm building right now.
        </h2>
      </div>

      <div
        class="overflow-hidden rounded-3xl border border-[rgba(16,19,26,0.08)] bg-white/70 shadow-sm backdrop-blur-md"
      >
        <!-- Profile header -->
        <div
          class="flex flex-col gap-5 border-b border-[rgba(16,19,26,0.08)] bg-[#10131a] p-7 text-white sm:flex-row sm:items-center sm:justify-between"
        >
          <template v-if="showSkeleton">
            <div class="flex items-center gap-4">
              <div class="h-14 w-14 animate-pulse rounded-full bg-white/15"></div>
              <div class="space-y-2">
                <div class="h-4 w-32 animate-pulse rounded bg-white/15"></div>
                <div class="h-3 w-48 animate-pulse rounded bg-white/10"></div>
              </div>
            </div>
            <div class="h-9 w-32 animate-pulse rounded-full bg-white/15"></div>
          </template>

          <template v-else>
            <div class="flex items-center gap-4">
              <img
                v-if="profile?.avatar"
                :src="profile.avatar"
                :alt="`${profile.login} avatar`"
                class="h-14 w-14 rounded-full border border-white/20 object-cover"
                loading="lazy"
              />
              <div>
                <p class="text-base font-bold">{{ profile?.name || 'Jaedon Munyua' }}</p>
                <p class="text-sm text-gray-400">@{{ profile?.login || 'tyejaedon' }}</p>
              </div>
            </div>

            <div class="flex items-center gap-6">
              <div v-if="profile" class="flex gap-6">
                <div>
                  <p class="text-lg font-black">{{ profile.publicRepos }}</p>
                  <p class="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400">Repos</p>
                </div>
                <div>
                  <p class="text-lg font-black">{{ profile.followers }}</p>
                  <p class="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gray-400">Followers</p>
                </div>
              </div>
              <a
                :href="profile?.url || 'https://github.com/tyejaedon'"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.07em] text-[#10131a] transition hover:-translate-y-0.5"
              >
                View Profile
              </a>
            </div>
          </template>
        </div>

        <!-- Error state -->
        <div v-if="status === 'error'" class="flex flex-col items-center gap-4 p-10 text-center">
          <p class="text-sm font-medium text-[#425066]">{{ error }}</p>
          <button
            type="button"
            class="rounded-full bg-[#10131a] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.07em] text-white transition hover:-translate-y-0.5"
            @click="load({ force: true })"
          >
            Retry
          </button>
        </div>

        <div v-else class="grid grid-cols-1 divide-y divide-[rgba(16,19,26,0.08)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <!-- Active projects -->
          <div class="p-7 lg:col-span-2">
            <h3 class="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-[#516078]">
              Active Projects
            </h3>

            <div v-if="showSkeleton" class="grid gap-4 sm:grid-cols-2">
              <div v-for="n in 4" :key="n" class="h-28 animate-pulse rounded-xl bg-slate-200"></div>
            </div>

            <div v-else class="grid gap-4 sm:grid-cols-2">
              <a
                v-for="repo in repos"
                :key="repo.id"
                :href="repo.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex flex-col rounded-xl border border-[rgba(16,19,26,0.08)] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p class="mb-2 text-sm font-bold text-[#10131a] group-hover:text-[#d64f26]">
                  {{ repo.name }}
                </p>
                <p class="mb-4 line-clamp-2 text-xs leading-[1.6] text-[#516078]">
                  {{ repo.description || 'No description yet.' }}
                </p>
                <div class="mt-auto flex items-center gap-4 text-[0.7rem] font-bold text-[#516078]">
                  <span v-if="repo.language" class="flex items-center gap-1.5">
                    <span
                      class="h-2.5 w-2.5 rounded-full"
                      :style="{ backgroundColor: languageColors[repo.language] || '#94a3b8' }"
                    ></span>
                    {{ repo.language }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg viewBox="0 0 16 16" class="h-3.5 w-3.5 fill-current" aria-hidden="true">
                      <path d="M8 .25l2.4 4.87 5.35.78-3.87 3.78.91 5.32L8 12.5l-4.79 2.5.91-5.32L.25 5.9l5.35-.78z" />
                    </svg>
                    {{ repo.stars }}
                  </span>
                  <span class="ml-auto font-medium">{{ relativeTime(repo.pushedAt) }}</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Releases + activity -->
          <div class="flex flex-col divide-y divide-[rgba(16,19,26,0.08)]">
            <div class="p-7">
              <h3 class="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-[#516078]">
                Latest Releases
              </h3>

              <div v-if="showSkeleton" class="space-y-3">
                <div v-for="n in 3" :key="n" class="h-12 animate-pulse rounded-lg bg-slate-200"></div>
              </div>

              <ul v-else-if="releases.length" class="space-y-3">
                <li v-for="release in releases" :key="release.id">
                  <a
                    :href="release.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-[#f4f7fb]"
                  >
                    <span
                      class="rounded-md bg-[#ff6a3d]/12 px-2 py-1 text-[0.7rem] font-black text-[#d64f26]"
                    >
                      {{ release.tag }}
                    </span>
                    <span class="min-w-0 flex-1">
                      <span class="block truncate text-xs font-bold text-[#10131a]">{{ release.repo }}</span>
                      <span class="block text-[0.7rem] text-[#516078]">{{ relativeTime(release.publishedAt) }}</span>
                    </span>
                  </a>
                </li>
              </ul>

              <p v-else class="text-xs text-[#516078]">No tagged releases published yet.</p>
            </div>

            <div class="p-7">
              <h3 class="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-[#516078]">
                Recent Activity
              </h3>

              <div v-if="showSkeleton" class="space-y-3">
                <div v-for="n in 4" :key="n" class="h-4 animate-pulse rounded bg-slate-200"></div>
              </div>

              <ul v-else-if="events.length" class="space-y-3">
                <li v-for="event in events" :key="event.id" class="flex gap-2.5 text-xs leading-[1.6] text-[#425066]">
                  <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1ca6a4]"></span>
                  <span>
                    {{ event.label }} <span class="font-bold text-[#10131a]">{{ event.repo }}</span>
                    <span class="text-[#8494a8]"> · {{ relativeTime(event.createdAt) }}</span>
                  </span>
                </li>
              </ul>

              <p v-else class="text-xs text-[#516078]">No public activity in the last few days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
