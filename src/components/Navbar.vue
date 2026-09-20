<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
})

const links = [
	{ id: 'home', label: 'Home' },
	{ id: 'about', label: 'About' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'contact', label: 'Contact' },
]

const menuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')

let observer
let navInitialized = false

const initNavbarState = () => {
	if (navInitialized || props.loading) {
		return
	}

	navInitialized = true
	updateScrollState()
	window.addEventListener('scroll', updateScrollState, { passive: true })

	observer = new IntersectionObserver(
		(entries) => {
			const inView = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)

			if (inView.length > 0) {
				activeSection.value = inView[0].target.id
			}
		},
		{
			root: null,
			threshold: [0.25, 0.5, 0.75],
			rootMargin: '-15% 0px -55% 0px',
		},
	)

	links.forEach((link) => {
		const section = document.getElementById(link.id)
		if (section) {
			observer.observe(section)
		}
	})
}

const closeMenu = () => {
	menuOpen.value = false
}

const toggleMenu = () => {
	menuOpen.value = !menuOpen.value
}

const updateScrollState = () => {
	isScrolled.value = window.scrollY > 18
}

const setActiveSection = (id) => {
	activeSection.value = id
	closeMenu()
}

onMounted(() => {
	initNavbarState()
})

watch(
	() => props.loading,
	(loading) => {
		if (!loading) {
			initNavbarState()
		}
	},
)

onBeforeUnmount(() => {
	window.removeEventListener('scroll', updateScrollState)
	if (observer) {
		observer.disconnect()
	}
})
</script>

<template>
	<header
		class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
		:class="
			isScrolled
				? 'px-3 pt-3 sm:px-6 lg:px-10 2xl:px-14'
				: 'border-b border-transparent bg-transparent px-3 pt-2.5 sm:px-6 lg:px-10 2xl:px-14'
		"
	>
		<template v-if="loading">
			<nav
				class="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-[0_8px_30px_rgba(16,19,26,0.08)] backdrop-blur-xl sm:px-6 lg:px-8"
				aria-label="Primary navigation loading"
			>
				<div class="flex items-center gap-3">
					<div class="h-8 w-8 animate-pulse rounded-lg bg-slate-200"></div>
					<div class="h-4 w-32 animate-pulse rounded bg-slate-200"></div>
				</div>
				<div class="hidden items-center gap-3 md:flex">
					<div class="h-8 w-14 animate-pulse rounded-full bg-slate-200"></div>
					<div class="h-8 w-16 animate-pulse rounded-full bg-slate-200"></div>
					<div class="h-8 w-20 animate-pulse rounded-full bg-slate-200"></div>
					<div class="h-8 w-16 animate-pulse rounded-full bg-slate-200"></div>
				</div>
				<div class="h-10 w-11 animate-pulse rounded-lg bg-slate-200 md:hidden"></div>
				<div class="hidden h-9 w-24 animate-pulse rounded-full bg-slate-200 md:block"></div>
			</nav>
		</template>

		<template v-else>
		<nav
			class="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/50 px-4 py-3 shadow-[0_8px_30px_rgba(16,19,26,0.08)] backdrop-blur-xl transition-all duration-300 sm:px-6 lg:px-8"
			:class="
				isScrolled
					? 'bg-white/86 ring-1 ring-black/5'
					: 'bg-white/70 ring-0'
			"
			aria-label="Primary navigation"
		>
			<a
				href="#home"
				class="group flex items-center gap-2"
				@click="setActiveSection('home')"
			>
				<span
					class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff6a3d] via-[#ef5c32] to-[#1ca6a4] text-sm font-black text-white"
				>
					JM
				</span>
				<span class="hidden text-sm font-bold tracking-[0.08em] text-[#172033] min-[430px]:inline sm:text-base">
                    Jaedon Munyua
				</span>
			</a>

			<ul class="hidden items-center gap-2 md:flex">
				<li v-for="link in links" :key="link.id">
					<a
						:href="`#${link.id}`"
						class="nav-link px-4 py-2.5 text-sm font-semibold tracking-[0.02em]"
						:class="
							activeSection === link.id
								? 'is-active text-[#10131a]'
								: 'text-[#4f5f79] hover:text-[#1e2c44]'
						"
						@click="setActiveSection(link.id)"
					>
						{{ link.label }}
					</a>
				</li>
			</ul>

			<a
				href="#contact"
				class="hidden rounded-full bg-[#10131a] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.07em] text-white transition hover:-translate-y-0.5 hover:bg-[#1f2a3d] md:inline-flex"
				@click="setActiveSection('contact')"
			>
				Hire Me
			</a>

			<button
				type="button"
				class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[rgba(16,19,26,0.15)] text-[#10131a] transition hover:bg-white/90 md:hidden"
				:aria-expanded="menuOpen"
				aria-label="Toggle navigation menu"
				@click="toggleMenu"
			>
				<svg v-if="!menuOpen" viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
					<path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
				</svg>
				<svg v-else viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
					<path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4l-6.3 6.3-1.42-1.42 6.3-6.29-6.3-6.29 1.42-1.42 6.3 6.3 6.3-6.3z" />
				</svg>
			</button>
		</nav>

		<transition
			enter-active-class="transition duration-200 ease-out"
			enter-from-class="opacity-0 -translate-y-2"
			enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 -translate-y-2"
		>
			<div
				v-if="menuOpen"
				class="mx-auto mt-2.5 w-full max-w-7xl rounded-2xl border border-white/60 bg-white/92 p-3 shadow-[0_12px_35px_rgba(16,19,26,0.1)] backdrop-blur-xl md:hidden"
			>
				<a
					v-for="link in links"
					:key="`mobile-${link.id}`"
					:href="`#${link.id}`"
					class="block rounded-xl px-4 py-3 text-sm font-semibold transition"
					:class="
						activeSection === link.id
							? 'bg-[#f2f5fa] text-[#10131a]'
							: 'text-[#4f5f79] hover:bg-[#f7f9fc] hover:text-[#1e2c44]'
					"
					@click="setActiveSection(link.id)"
				>
					{{ link.label }}
				</a>
			</div>
		</transition>
		</template>
	</header>
</template>

<style scoped>
.nav-link {
	position: relative;
	display: inline-block;
}

.nav-link::after {
	content: '';
	position: absolute;
	left: 12px;
	right: 12px;
	bottom: 4px;
	height: 2px;
	background: linear-gradient(90deg, #ff6a3d, #1ca6a4);
	transform: scaleX(0);
	transform-origin: center;
	transition: transform 180ms ease;
}

.nav-link:hover::after,
.nav-link.is-active::after {
	transform: scaleX(1);
}
</style>
