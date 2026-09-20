<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
})

const formData = reactive({
	name: '',
	email: '',
	message: '',
})

const errors = reactive({
	name: '',
	email: '',
	message: '',
})

const formStatus = ref({
	type: '',
	message: '',
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateForm = () => {
	errors.name = formData.name.trim() ? '' : 'Please enter your name.'

	if (!formData.email.trim()) {
		errors.email = 'Please enter your email address.'
	} else if (!emailPattern.test(formData.email.trim())) {
		errors.email = 'Please enter a valid email address.'
	} else {
		errors.email = ''
	}

	if (!formData.message.trim()) {
		errors.message = 'Please enter a message.'
	} else if (formData.message.trim().length < 10) {
		errors.message = 'Message should be at least 10 characters long.'
	} else {
		errors.message = ''
	}

	return !errors.name && !errors.email && !errors.message
}

const clearStatus = () => {
	if (formStatus.value.message) {
		formStatus.value = { type: '', message: '' }
	}
}

const handleSubmit = () => {
	const isValid = validateForm()

	if (!isValid) {
		formStatus.value = {
			type: 'error',
			message: 'Please fix the highlighted fields and try again.',
		}
		return
	}

	formStatus.value = {
		type: 'success',
		message: 'Thanks for reaching out. Your message is ready to be sent.',
	}

	formData.name = ''
	formData.email = ''
	formData.message = ''
}

const contactMethods = [
	{
		title: 'Email',
		value: 'tyejaedon@gmail.com',
		href: 'mailto:tyejaedon@gmail.com',
	},
	{
		title: 'Phone',
		value: '+254 795198008',
		href: 'tel:+254795198008',
	},
	{
		title: 'Location',
		value: 'Nairobi, Kenya',
		href: 'https://maps.google.com/?q=Nairobi,Kenya',
	},
]

const socialLinks = [
	{
		label: 'GitHub',
		href: 'https://github.com/tyejaedon',
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/tyejaedon',
	},
	{
		label: 'X / Twitter',
		href: 'https://x.com/tyejaedon',
	},
]

const footerNav = [
	{ label: 'Home', href: '#home' },
	{ label: 'About', href: '#about' },
	{ label: 'Projects', href: '#projects' },
]
</script>

<template>
	<footer
		v-if="loading"
		id="contact"
		aria-label="Contact footer loading"
		class="relative overflow-hidden bg-[#0f1522] text-white"
	>
		<div class="relative mx-auto w-full max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-10 lg:pt-24 2xl:px-14">
			<div class="grid gap-9 border-b border-white/15 pb-12 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
				<div class="space-y-4">
					<div class="h-4 w-20 animate-pulse rounded bg-slate-500/40"></div>
					<div class="h-11 w-full max-w-lg animate-pulse rounded bg-slate-500/40"></div>
					<div class="h-11 w-5/6 animate-pulse rounded bg-slate-500/40"></div>
					<div class="h-5 w-full max-w-2xl animate-pulse rounded bg-slate-500/40"></div>
					<div class="h-5 w-11/12 animate-pulse rounded bg-slate-500/40"></div>
					<div class="flex gap-3 pt-2">
						<div class="h-11 w-52 animate-pulse rounded-full bg-slate-500/40"></div>
						<div class="h-11 w-36 animate-pulse rounded-full bg-slate-500/40"></div>
					</div>
				</div>

				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
					<div class="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
						<div class="mb-4 h-4 w-24 animate-pulse rounded bg-slate-500/40"></div>
						<div class="space-y-3">
							<div class="h-12 animate-pulse rounded-xl bg-slate-500/40"></div>
							<div class="h-12 animate-pulse rounded-xl bg-slate-500/40"></div>
							<div class="h-12 animate-pulse rounded-xl bg-slate-500/40"></div>
						</div>
					</div>
					<div class="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
						<div class="mb-4 h-4 w-20 animate-pulse rounded bg-slate-500/40"></div>
						<div class="mb-6 flex gap-2">
							<div class="h-7 w-16 animate-pulse rounded-full bg-slate-500/40"></div>
							<div class="h-7 w-16 animate-pulse rounded-full bg-slate-500/40"></div>
							<div class="h-7 w-20 animate-pulse rounded-full bg-slate-500/40"></div>
						</div>
						<div class="mb-3 h-4 w-16 animate-pulse rounded bg-slate-500/40"></div>
						<div class="space-y-2">
							<div class="h-4 w-20 animate-pulse rounded bg-slate-500/40"></div>
							<div class="h-4 w-24 animate-pulse rounded bg-slate-500/40"></div>
							<div class="h-4 w-28 animate-pulse rounded bg-slate-500/40"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>

	<footer
		v-else
		id="contact"
		aria-label="Contact footer"
		class="relative overflow-hidden bg-[#0f1522] text-white"
	>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,106,61,0.22),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(28,166,164,0.2),transparent_32%)]"
		></div>

		<div class="relative mx-auto w-full max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-10 lg:pt-24 2xl:px-14">
			<div class="grid gap-9 border-b border-white/15 pb-12 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
				<div>
					<p class="text-xs font-bold uppercase tracking-[0.14em] text-[#f7b9a6]">Contact</p>
					<h2
						class="mt-4 max-w-[16ch] text-[clamp(2rem,4.2vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] [font-family:'Avenir_Next','Gill_Sans','Segoe_UI',sans-serif]"
					>
						Let’s design something
						<span class="bg-gradient-to-r from-[#ff926f] to-[#6dd7d5] bg-clip-text text-transparent">
							meaningful together.
						</span>
					</h2>
					<p class="mt-5 max-w-[58ch] text-base leading-7 text-[#cdd6e8]">
						Available for full-time software engineering roles, internships, and high-impact freelance projects.
						If you have an idea with real users in mind, I would love to hear about it.
					</p>

					<div class="mt-8 flex flex-wrap gap-3">
						<a
							href="mailto:tyejaedon@gmail.com"
							class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6a3d] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_28px_rgba(255,106,61,0.3)] transition hover:-translate-y-0.5 hover:bg-[#e85a31] min-[430px]:w-auto"
						>
							Start a Conversation
							<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
						<a
							href="#projects"
							class="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-[#dde4f3] transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/10 min-[430px]:w-auto"
						>
							View My Work
						</a>
					</div>
				</div>

				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
					<form
						novalidate
						class="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm"
						@submit.prevent="handleSubmit"
					>
						<p class="text-xs font-bold uppercase tracking-[0.12em] text-[#9fb0cd]">Quick Message</p>
						<div class="mt-4 grid gap-3">
							<div>
								<label for="contact-name" class="mb-1 block text-xs font-semibold text-[#d8deea]">Name</label>
								<input
									id="contact-name"
									v-model="formData.name"
									type="text"
									autocomplete="name"
									class="w-full rounded-xl border bg-[#121a2a] px-3 py-2 text-sm text-white outline-none transition placeholder:text-[#7f8fab] focus:ring-2 focus:ring-[#ff6a3d]/60"
									:class="errors.name ? 'border-[#f78282]' : 'border-white/15'"
									placeholder="Your name"
									@input="clearStatus"
								/>
								<p v-if="errors.name" class="mt-1 text-xs text-[#fda4a4]">{{ errors.name }}</p>
							</div>

							<div>
								<label for="contact-email" class="mb-1 block text-xs font-semibold text-[#d8deea]">Email</label>
								<input
									id="contact-email"
									v-model="formData.email"
									type="email"
									autocomplete="email"
									class="w-full rounded-xl border bg-[#121a2a] px-3 py-2 text-sm text-white outline-none transition placeholder:text-[#7f8fab] focus:ring-2 focus:ring-[#ff6a3d]/60"
									:class="errors.email ? 'border-[#f78282]' : 'border-white/15'"
									placeholder="you@example.com"
									@input="clearStatus"
								/>
								<p v-if="errors.email" class="mt-1 text-xs text-[#fda4a4]">{{ errors.email }}</p>
							</div>

							<div>
								<label for="contact-message" class="mb-1 block text-xs font-semibold text-[#d8deea]">Message</label>
								<textarea
									id="contact-message"
									v-model="formData.message"
									rows="4"
									class="w-full rounded-xl border bg-[#121a2a] px-3 py-2 text-sm text-white outline-none transition placeholder:text-[#7f8fab] focus:ring-2 focus:ring-[#ff6a3d]/60"
									:class="errors.message ? 'border-[#f78282]' : 'border-white/15'"
									placeholder="Tell me a little about your project"
									@input="clearStatus"
								></textarea>
								<p v-if="errors.message" class="mt-1 text-xs text-[#fda4a4]">{{ errors.message }}</p>
							</div>

							<button
								type="submit"
								class="inline-flex items-center justify-center rounded-full bg-[#ff6a3d] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#e85a31]"
							>
								Validate Message
							</button>

							<p
								v-if="formStatus.message"
								class="text-xs"
								:class="formStatus.type === 'success' ? 'text-[#8ee6ba]' : 'text-[#fda4a4]'"
							>
								{{ formStatus.message }}
							</p>
						</div>
					</form>

					<div class="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm">
						<p class="text-xs font-bold uppercase tracking-[0.12em] text-[#9fb0cd]">Direct Contact</p>
						<ul class="mt-4 space-y-3">
							<li v-for="item in contactMethods" :key="item.title">
								<a
									:href="item.href"
									target="_blank"
									rel="noopener noreferrer"
									class="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2 transition hover:border-white/10 hover:bg-white/[0.06]"
								>
									<span>
										<span class="block text-xs font-semibold uppercase tracking-[0.08em] text-[#90a0bd]">
											{{ item.title }}
										</span>
										<span class="block text-sm font-semibold text-[#f7f9ff]">{{ item.value }}</span>
									</span>
									<svg
										class="h-4 w-4 text-[#9fb0cd] transition group-hover:translate-x-0.5 group-hover:text-white"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							</li>
						</ul>
					</div>

					<div class="grid gap-5 rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm">
						<div>
							<p class="text-xs font-bold uppercase tracking-[0.12em] text-[#9fb0cd]">Explore</p>
							<div class="mt-3 flex flex-wrap gap-2">
								<a
									v-for="link in footerNav"
									:key="link.label"
									:href="link.href"
									class="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-[#d8deea] transition hover:border-white/35 hover:bg-white/[0.09]"
								>
									{{ link.label }}
								</a>
							</div>
						</div>

						<div>
							<p class="text-xs font-bold uppercase tracking-[0.12em] text-[#9fb0cd]">Social</p>
							<ul class="mt-3 space-y-2">
								<li v-for="social in socialLinks" :key="social.label">
									<a
										:href="social.href"
										target="_blank"
										rel="noopener noreferrer"
										class="text-sm font-semibold text-[#d8deea] transition hover:text-white"
									>
										{{ social.label }}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex flex-col gap-2 text-xs text-[#9aa9c5] sm:flex-row sm:items-center sm:justify-between">
				<p>© 2026 Tyeja Kibui. Crafted in Vue + Tailwind CSS.</p>
				<p>Designed for performance, accessibility, and clarity.</p>
			</div>
		</div>
	</footer>
</template>
