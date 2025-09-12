<script setup>
import { defineAsyncComponent } from 'vue'
const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'))
const AboutMe = defineAsyncComponent(() => import('@/views/AboutMe.vue'))
const Skills = defineAsyncComponent(() => import('@/views/Skills.vue'))
const Projects = defineAsyncComponent(() => import('@/views/Projects.vue'))
const ContactMe = defineAsyncComponent(() => import('@/views/ContactMe.vue'))
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
