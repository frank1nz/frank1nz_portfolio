<script setup>
import { Icon } from '@iconify/vue'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const sectionRef = ref(null)
let io // IntersectionObserver

onMounted(() => {
  const root = sectionRef.value
  if (!root) return

  // เคารพผู้ใช้ที่ลด motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const items = Array.from(root.querySelectorAll('[data-animate]'))

  if (reduced) {
    items.forEach(el => el.classList.add('show'))
    return
  }

  // เตรียมสถานะเริ่มต้น
  items.forEach(el => el.classList.add('will-animate'))

  // สังเกตทั้ง section: เมื่อถึง viewport ให้ค่อยๆ โผล่ทีละชิ้น
  io = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (!entry || !entry.isIntersecting) return

    // เล่น stagger
    const base = 80 // หน่วงพื้นฐานต่อชิ้น (ms)
    items.forEach((el, idx) => {
      const extra = Number(el.getAttribute('data-delay') || 0)
      const delay = base * idx + extra
      el.style.transitionDelay = `${delay}ms`
      // ใช้ rAF 2 ชั้นเพื่อให้ browser จับ transition ได้ชัวร์
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('show'))
      })
    })

    // เล่นครั้งเดียวพอ
    io.disconnect()
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px', // โผล่ก่อนถึงล่างจอนิดหน่อย
  })

  io.observe(root)
})

onBeforeUnmount(() => {
  if (io) io.disconnect()
})
</script>

<template>
  <section id="skills" ref="sectionRef" class="mx-auto max-w-7xl px-6 pb-10 lg:px-12">
    <p
      class="mb-3 text-lg font-medium uppercase tracking-widest text-gray-600"
      data-animate
      data-delay="0"
    >
      Skills
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Frontend & Mobile -->
      <div class="p-6 bg-white shadow-md rounded-xl skill-card" data-animate>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Frontend & Mobile</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="devicon:nextjs" width="24" /> React / Next.js</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:vue" width="24" /> Vue.js</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:react" width="24" /> React Native</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:flutter" width="24" /> Flutter</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:tailwindcss-icon" width="24" /> Tailwind CSS / MUI</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:typescript-icon" width="24" /> TypeScript</li>
        </ul>
      </div>

      <!-- Backend -->
      <div class="p-6 bg-white shadow-md rounded-xl skill-card" data-animate>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Backend</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:go" width="24" /> Golang (Fiber, GORM)</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:nodejs-icon" width="24" /> Node.js (Express)</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="mdi:api" width="24" /> REST APIs</li>
        </ul>
      </div>

      <!-- Database -->
      <div class="p-6 bg-white shadow-md rounded-xl skill-card" data-animate>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Database</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:mongodb" width="24" /> MongoDB</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:postgresql" width="24" /> PostgreSQL</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:mysql" width="24" /> MySQL</li>
        </ul>
      </div>

      <!-- Tools -->
      <div class="p-6 bg-white shadow-md rounded-xl skill-card" data-animate>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Tools & Platforms</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:git-icon" width="24" /> Git</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:docker-icon" width="24" /> Docker</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:postman-icon" width="24" /> Postman</li>
          <li class="flex items-center gap-2 skill-item" data-animate><Icon icon="logos:visual-studio-code" width="24" /> VS Code</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* สถานะเริ่มต้น */
.will-animate {
  opacity: 0;
  transform: translateY(14px) scale(.985);
  filter: saturate(90%) brightness(.98);
}

/* สถานะแสดงผล */
.show {
  opacity: 1;
  transform: none;
  filter: none;
  transition:
    opacity 420ms cubic-bezier(.22,.61,.36,1),
    transform 520ms cubic-bezier(.22,.61,.36,1),
    filter 520ms cubic-bezier(.22,.61,.36,1);
}

/* การ์ด pop นุ่ม ๆ */
.skill-card.will-animate { transform: translateY(18px) scale(.975); }
.skill-card.show { transition-duration: 580ms, 640ms, 640ms; }

/* ไอเท็มภายในการ์ด */
.skill-item.will-animate { transform: translateY(10px); }
.skill-item.show { transition-duration: 340ms, 420ms, 420ms; }

/* ลด motion */
@media (prefers-reduced-motion: reduce) {
  .will-animate, .show {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
    filter: none !important;
  }
}
</style>
