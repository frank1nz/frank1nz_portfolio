<template>
  <header class="absolute shadow-md bg-gray-900 fixed w-full top-0 left-0 shadow-gray-400/10 backdrop-blur-sm">
    <div class="flex justify-between items-center px-6 lg:px-12 py-4 relative z-20">
      <!-- Left: Brand -->
      <div class="text-2xl lg:text-3xl font-bold text-white ">
        My Portfolio
      </div>

      <div class="flex items-center gap-4">
        <!-- Desktop nav -->
        <nav
          id="main-nav"
          :class="[
            'hidden md:flex md:items-center md:gap-8'
          ]"
        >
          <ul class="flex items-center gap-8">
            <li v-for="item in LinkMe" :key="item.name">
              <a
                :href="item.href"
                class="block text-lg font-semibold text-white  hover:text-blue-500  transition"
                @click.prevent="handleNav(item.href)"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>


        <!-- Mobile toggle -->
        <button
          class="md:hidden inline-flex p-2 rounded-lg hover:bg-gray-100 text-3xl text-gray-900 z-30"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen.toString()"
          aria-controls="mobile-nav"
        >
          <Icon :icon="isMenuOpen ? 'material-symbols:close-rounded' : 'material-symbols:menu-rounded'" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        id="mobile-nav"
        class="fixed inset-0 z-20 bg-gray-900/90 backdrop-blur-sm flex flex-col items-center justify-center gap-8"
      >
        <ul class="flex flex-col items-center gap-6">
          <li v-for="item in LinkMe" :key="item.name">
            <a
              :href="item.href"
              class="block text-2xl font-semibold text-white hover:text-blue-300 transition"
              @click.prevent="handleNav(item.href)"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const LinkMe = ref([
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
])

const handleNav = (href) => {
  isMenuOpen.value = false
  const id = href.startsWith('#') ? href.slice(1) : href
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}


</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
