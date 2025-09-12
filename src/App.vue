<script setup>
import { defineAsyncComponent } from 'vue'
const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'))
const AboutMe = defineAsyncComponent(() => import('@/components/sections/AboutMe.vue'))
const Skills = defineAsyncComponent(() => import('@/components/sections/Skills.vue'))
const Projects = defineAsyncComponent(() => import('@/components/sections/Projects.vue'))
const ContactMe = defineAsyncComponent(() => import('@/components/sections/ContactMe.vue'))
</script>

<template>
  <div class="min-h-screen ">
    <Navbar />
    <AboutMe />
    <Skills />
    <Projects />
    <ContactMe/>
  </div>
</template>
