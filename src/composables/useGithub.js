import { ref } from 'vue'

const USER = 'tyejaedon'
const API = 'https://api.github.com'
const CACHE_KEY = 'gh-activity-v1'
const CACHE_TTL = 30 * 60 * 1000

const profile = ref(null)
const repos = ref([])
const releases = ref([])
const events = ref([])
const status = ref('idle')
const error = ref('')

const get = async (path) => {
  const response = await fetch(`${API}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (!response.ok) {
    throw Object.assign(new Error(`GitHub responded ${response.status}`), {
      status: response.status,
    })
  }

  return response.json()
}

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    return Date.now() - cached.savedAt < CACHE_TTL ? cached.data : null
  } catch {
    return null
  }
}

const writeCache = (data) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // Storage full or blocked — cache is an optimisation, not a requirement.
  }
}

const apply = (data) => {
  profile.value = data.profile
  repos.value = data.repos
  releases.value = data.releases
  events.value = data.events
}

const mapRepo = (repo) => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  language: repo.language,
  stars: repo.stargazers_count,
  url: repo.html_url,
  pushedAt: repo.pushed_at,
})

const mapEvent = (event) => {
  const repo = event.repo?.name?.split('/').pop() ?? 'a repository'
  const commits = event.payload?.size ?? event.payload?.commits?.length ?? 0
  const prAction = event.payload?.action ?? 'updated'

  const label =
    {
      PushEvent: `Pushed ${commits} commit${commits === 1 ? '' : 's'} to`,
      ReleaseEvent: `Released ${event.payload?.release?.tag_name ?? ''} in`,
      CreateEvent: `Created ${event.payload?.ref_type ?? 'ref'} in`,
      PullRequestEvent: `${prAction[0].toUpperCase()}${prAction.slice(1)} a pull request in`,
      WatchEvent: 'Starred',
    }[event.type] ?? null

  return label ? { id: event.id, label, repo, createdAt: event.created_at } : null
}

export const loadGithubActivity = async ({ force = false } = {}) => {
  if (status.value === 'loading') return

  if (!force) {
    const cached = readCache()
    if (cached) {
      apply(cached)
      status.value = 'ready'
      return
    }
  }

  status.value = 'loading'
  error.value = ''

  try {
    const [profileResult, reposResult, eventsResult] = await Promise.allSettled([
      get(`/users/${USER}`),
      get(`/users/${USER}/repos?sort=pushed&per_page=6&type=owner`),
      get(`/users/${USER}/events/public?per_page=30`),
    ])

    if (reposResult.status === 'rejected') {
      throw reposResult.reason
    }

    const activeRepos = reposResult.value.filter((repo) => !repo.fork).map(mapRepo)

    const releaseResults = await Promise.allSettled(
      activeRepos.slice(0, 4).map((repo) => get(`/repos/${USER}/${repo.name}/releases/latest`)),
    )

    const latestReleases = releaseResults
      .map((result, index) =>
        result.status === 'fulfilled'
          ? {
              id: result.value.id,
              repo: activeRepos[index].name,
              tag: result.value.tag_name,
              name: result.value.name,
              url: result.value.html_url,
              publishedAt: result.value.published_at,
            }
          : null,
      )
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3)

    const data = {
      profile:
        profileResult.status === 'fulfilled'
          ? {
              login: profileResult.value.login,
              name: profileResult.value.name,
              avatar: profileResult.value.avatar_url,
              bio: profileResult.value.bio,
              followers: profileResult.value.followers,
              publicRepos: profileResult.value.public_repos,
              url: profileResult.value.html_url,
            }
          : null,
      repos: activeRepos,
      releases: latestReleases,
      events:
        eventsResult.status === 'fulfilled'
          ? eventsResult.value.map(mapEvent).filter(Boolean).slice(0, 6)
          : [],
    }

    apply(data)
    writeCache(data)
    status.value = 'ready'
  } catch (requestError) {
    const stale = readCache()
    if (stale) {
      apply(stale)
      status.value = 'ready'
      return
    }

    error.value =
      requestError.status === 403
        ? 'GitHub rate limit reached. Try again in a little while.'
        : 'Could not reach GitHub right now.'
    status.value = 'error'
  }
}

export const useGithubActivity = () => ({
  profile,
  repos,
  releases,
  events,
  status,
  error,
  load: loadGithubActivity,
})
