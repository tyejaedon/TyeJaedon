<script setup>
import { onMounted, ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import Navbar from '../components/Navbar.vue'
import About from '../components/About.vue'
import Showcase from '../components/Showcase.vue'
import ContactFooter from '../components/ContactFooter.vue'

const isLoading = ref(true)

onMounted(() => {
  window.setTimeout(() => {
    isLoading.value = false
  }, 900)
})
</script>

<template>
    <div class="bg-[#f7f7f3]">
        <Navbar :loading="isLoading" />

        <main>
            <HeroSection :loading="isLoading" />
            <About :loading="isLoading" />
            <Showcase :loading="isLoading" />
        </main>

        <ContactFooter :loading="isLoading" />
    </div>
</template>