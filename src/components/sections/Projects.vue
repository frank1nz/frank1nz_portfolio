<script setup>
import { computed } from 'vue'

// ข้อมูลโปรเจกต์ (public + private)
const projects = [
  // --- Pinned / Public on GitHub ---
  {
    name: 'Management Employees (Go)',
    desc: 'Admin-auth (JWT), CRUD, clean structure with GORM & MySQL.',
    img: 'https://via.placeholder.com/800x420?text=Management+Employees',
    stack: ['Go', 'GORM', 'MySQL', 'JWT'],
    url: 'https://github.com/frank1nz/ManagementEmployees',
    isPrivate: false,
  },
  {
    name: 'Yakkaw Dashboard',
    desc: 'Admin dashboard for Yakkaw: notifications, sponsors, news, system admin.',
    img: 'https://via.placeholder.com/800x420?text=Yakkaw+Dashboard',
    stack: ['Next.js', 'TypeScript', 'MUI', 'Tailwind', 'Golang API'],
    url: 'https://github.com/MABiuS1/yakkaw_dashboard',
    isPrivate: false,
  },
  {
    name: 'Sport Complex (Booking)',
    desc: 'Sports facility booking; microservices with Kafka + gRPC; responsive admin UI.',
    img: 'https://via.placeholder.com/800x420?text=Sport+Complex',
    stack: ['TypeScript', 'NextUI', 'Tailwind', 'Kafka', 'gRPC', 'Go'],
    url: 'https://github.com/6531503042/Sport-Complex',
    isPrivate: false,
  },
  {
    name: 'go-gorm-manageBook',
    desc: 'Simple book manager backend using Go + GORM.',
    img: 'https://via.placeholder.com/800x420?text=Go+GORM+ManageBook',
    stack: ['Go', 'GORM', 'MySQL'],
    url: 'https://github.com/frank1nz/go-gorm-manageBook',
    isPrivate: false,
  },
  {
    name: 'ForecastAPI',
    desc: 'Weather Forecast API (Java, Spring-style), academic project.',
    img: 'https://via.placeholder.com/800x420?text=Forecast+API',
    stack: ['Java'],
    url: 'https://github.com/6531503042/ForecastAPI',
    isPrivate: false,
  },
  {
    name: 'Gigantic Mall',
    desc: 'Side project in Java.',
    img: 'https://via.placeholder.com/800x420?text=Gigantic+Mall',
    stack: ['Java'],
    url: 'https://github.com/6531503042/Gigantic-Mall',
    isPrivate: false,
  },

  // --- From Resume (tweak/edit later) ---
  {
    name: 'Yakkaw Mobile Application',
    desc: 'Mobile app for PM2.5 in Chiang Rai & North Thailand; real-time data and health tips.',
    img: 'https://via.placeholder.com/800x420?text=Yakkaw+Mobile+App',
    stack: ['React Native', 'PostgreSQL', 'Golang API'],
    url: '#',          // ยังไม่เปิดเผย repo
    isPrivate: true,   // 🔒
  },
  {
    name: 'Deap Appointment App',
    desc: 'Realtime appointment app with Flutter + Firebase.',
    img: 'https://via.placeholder.com/800x420?text=Deap+Appointment',
    stack: ['Flutter', 'Firebase'],
    url: '#',
    isPrivate: true,   // 🔒
  },
]

// เรียง: เอา public ก่อน แล้วค่อย private
const sortedProjects = computed(() =>
  [...projects].sort((a, b) => Number(a.isPrivate) - Number(b.isPrivate))
)
</script>

<template>
  <section id="projects" class="py-20 px-6 lg:px-20">
    <h2 class="text-3xl font-bold mb-10">Projects</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div
        v-for="p in sortedProjects"
        :key="p.name"
        class="bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden flex flex-col"
      >
        <!-- Image -->
        <img :src="p.img" :alt="p.name" class="w-full h-48 object-cover" />

        <!-- Body -->
        <div class="p-6 flex-1 flex flex-col">
          <h3 class="text-xl font-semibold mb-1">{{ p.name }}</h3>

          <p class="text-gray-700 dark:text-gray-300 mb-4">
            {{ p.desc }}
          </p>

          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in p.stack"
              :key="tech"
              class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Footer (link / lock) -->
          <div class="mt-auto">
            <a
              v-if="!p.isPrivate"
              :href="p.url"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View on GitHub
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 7h6m0 0v6m0-6L10 16"/>
              </svg>
            </a>

            <div v-else class="inline-flex items-center gap-2 text-gray-500">
              <span class="font-semibold">Private Project</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z"
                      clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
