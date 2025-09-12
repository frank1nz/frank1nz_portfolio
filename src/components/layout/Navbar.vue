<template>
  <header :class="[
    'fixed top-0 left-0 w-full z-100 transition-transform duration-300 will-change-transform',
    isHidden ? '-translate-y-full' : 'translate-y-0',
    !isAtTop ? 'bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-lg' : 'bg-transparent'
  ]">
    <div class="flex justify-between items-center px-6 lg:px-12 py-4">
      <!-- Left: Brand -->
      <div class="text-2xl font-bold text-gray-800 select-none">
        frank1nz

      </div>

      <!-- Center: nav (exclude Contact) -->
      <nav class="hidden md:block">
        <ul class="flex items-center gap-10 bg-[#2c2d30] text-white font-semibold rounded-full px-10 py-4"
          :style="pillShadowDark">
          <li v-for="item in LinkMe.filter(i => i.name !== 'Contact')" :key="item.name">
            <a :href="item.href" class="hover:opacity-90 transition" @click.prevent="handleNav(item.href)">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Right: Contact -->
      <div class="hidden md:block">
        <a :href="contact.href"
          class="inline-flex items-center gap-3 bg-white text-[#4b4f67] font-semibold rounded-full px-6 py-4 ring-1 ring-black/5"
          :style="pillShadowLight" @click.prevent="handleNav(contact.href)">
          <span class="relative flex h-3.5 w-3.5">
            <span class="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75 animate-ping"></span>
            <span class="relative inline-flex h-3.5 w-3.5 rounded-full bg-lime-500"></span>
          </span>
          Contact
        </a>
      </div>

      <!-- Mobile toggle -->
      <button class="md:hidden text-gray-800" @click="toggleMobile">☰</button>
    </div>

    <!-- Mobile nav -->
    <Transition name="menu">
      <nav v-if="showMobile" class="md:hidden bg-gray-800 px-6 py-4 rounded-b-2xl">
        <ul class="flex flex-col gap-4 text-white font-semibold">
          <li v-for="item in LinkMe" :key="item.name">
            <a :href="item.href" @click.prevent="handleNav(item.href); showMobile = false" class="block">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AboutMe from '../sections/AboutMe.vue'

const LinkMe = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const contact = computed(() => LinkMe.find(i => i.name === 'Contact'))

const showMobile = ref(false)
const toggleMobile = () => (showMobile.value = !showMobile.value)

const handleNav = (href) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// ---- Hide-on-scroll logic ----
const isHidden = ref(false) // true = ซ่อน, false = โชว์
const isAtTop = ref(true)   // อยู่บนสุดของหน้าไหม (ใช้เปลี่ยนพื้นหลัง)
let lastY = 0
let ticking = false
const DOWN_THRESHOLD = 5    // กันสั่น: ต้องเลื่อนมากกว่า 5px ถึงจะนับ
const SHOW_AFTER = 80       // เริ่มอนุญาตให้ซ่อนหลังจากเลื่อนลงมา 80px

const onScroll = () => {
  const y = window.scrollY || 0
  if (!ticking) {
    window.requestAnimationFrame(() => {
      isAtTop.value = y <= 8

      const dy = y - lastY
      // ถ้าเมนูมือถือเปิดอยู่ อย่าซ่อน navbar
      if (!showMobile.value) {
        if (dy > DOWN_THRESHOLD && y > SHOW_AFTER) {
          // เลื่อนลง: ซ่อน
          isHidden.value = true
        } else if (dy < -DOWN_THRESHOLD) {
          // เลื่อนขึ้น: โชว์
          isHidden.value = false
        }
      } else {
        isHidden.value = false
      }

      lastY = y
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  lastY = window.scrollY || 0
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
// ------------------------------

const pillShadowDark = {
  boxShadow:
    '0 24px 40px rgba(0,0,0,.35), 0 6px 12px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.04)',
}
const pillShadowLight = {
  boxShadow:
    '0 24px 40px rgba(31,41,55,.18), 0 8px 16px rgba(31,41,55,.08), inset 0 0 0 1px rgba(0,0,0,.05)',
}
</script>

<style scoped>
.menu-enter-from,
.menu-leave-to {
  max-height: 0;
  opacity: 0;
}

.menu-enter-active,
.menu-leave-active {
  transition: max-height 300ms ease, opacity 200ms ease;
}

.menu-enter-to,
.menu-leave-from {
  max-height: 400px;
  opacity: 1;
}
</style>
