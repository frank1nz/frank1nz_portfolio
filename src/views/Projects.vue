<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, A11y, Keyboard } from 'swiper/modules'
import type { Project } from '../models/projects'
import { lazy } from 'react'

const projects: Project[] = [
    { name: 'Sport Complex (Booking)', desc: 'Sports facility booking; microservices with gRPC; responsive admin UI.', img: 'https://github.com/6531503042/Sport-Complex/raw/main/assets/admin_homepage.png', url: 'https://github.com/6531503042/Sport-Complex', repo: '6531503042/Sport-Complex', stack: ['TypeScript', 'NextUI', 'Tailwind', 'gRPC', 'Go'], isPrivate: false },
    { name: 'Yakkaw Dashboard', desc: 'Admin dashboard for Yakkaw: notifications, sponsors, news, system admin.', stack: ['Next.js', 'TypeScript', 'MUI', 'Tailwind', 'Golang API'],img:'/yakkaw_dashboard.png', url: 'https://github.com/MABiuS1/yakkaw_dashboard', repo: 'MABiuS1/yakkaw_dashboard', isPrivate: false },
    { name: 'Gigantic Mall', desc: 'Gigantic-Mall-App is a comprehensive e-commerce application developed using Spring Boot for the backend and React for the frontend. This project employs a built using microservices architecture, deployed on Kubernetes. It includes various services, a gateway, load balancing, caching, messaging, logging, monitoring, and persistent data storage', url: 'https://github.com/6531503042/Gigantic-Mall', img: 'https://github.com/6531503042/Gigantic-Mall/raw/main/assets/Gigantic_icon.png', repo: '6531503042/Gigantic-Mall', stack: ['Java', 'React'], isPrivate: false },
    { name: 'Deap Appointment App', desc: 'Realtime appointment app with Flutter + Firebase.', img: 'https://github.com/6531503042/Deap-Mobile-Application/raw/main/assets/DeapV2.png', stack: ['Flutter', 'Firebase'], url: 'https://github.com/6531503042/Deap-Mobile-Application', isPrivate: false },
    { name: 'ForecastAPI', desc: 'Weather Forecast API (Java, Spring-style), academic project.', img: 'https://github.com/6531503042/ForecastAPI/raw/main/Assets/cover.png', url: 'https://github.com/6531503042/ForecastAPI', repo: '6531503042/ForecastAPI', stack: ['Java'], isPrivate: false },
    { name: 'Management Employees (Go)', desc: 'Admin-auth (JWT), CRUD, clean structure with GORM & MySQL.', stack: ['Go', 'GORM', 'MySQL', 'JWT'], img: '/manageEmployee.png', url: 'https://github.com/frank1nz/ManagementEmployees', repo: 'frank1nz/ManagementEmployees', isPrivate: false },
    { name: 'go-gorm-manageBook', desc: 'Simple book manager backend using Go + GORM.', img: 'https://repository-images.githubusercontent.com/234231371/00fd8700-5430-11ea-820b-15fd85b2472c', url: 'https://github.com/frank1nz/go-gorm-manageBook', repo: 'frank1nz/go-gorm-manageBook', stack: ['Go', 'GORM', 'MySQL'], isPrivate: false },
    { name: 'Yakkaw Mobile Application', desc: 'Mobile app for PM2.5 in Chiang Rai & North Thailand; real-time data and health tips.', img: 'https://yakkaw.mfu.ac.th/img/gallery/1.jpg', stack: ['React Native', 'PostgreSQL', 'Golang API'], url: '#', isPrivate: true },
]

// private ไปท้าย
const sortedProjects = computed(() =>
    [...projects].sort((a, b) => Number(a.isPrivate) - Number(b.isPrivate))
)

const coverOf = (p: Project) => {
    if (p.img) return p.img
    if (!p.isPrivate && p.repo) return `https://opengraph.githubassets.com/1/${p.repo}`
    const text = encodeURIComponent(p.name)
    return `https://ui-avatars.com/api/?name=${text}&background=111827&color=fff&size=800&length=2`
}

/* === Animate-on-view (เบามาก: toggle คลาสที่ section เดียว) === */
const sectionRef = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

onMounted(() => {
    const root = sectionRef.value
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
        root.classList.add('inview')
        return
    }

    io = new IntersectionObserver(
        ([entry]) => {
            if (entry?.isIntersecting) {
                root.classList.add('inview')
                io?.disconnect() // เล่นครั้งเดียว
            }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(root)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
    <section id="projects" ref="sectionRef" class="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div class="mx-auto max-w-7xl w-[100%]">
            <div class="mb-8">
                <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900" data-anim style="--d:0">Projects</h2>
                <p class="text-gray-600 mt-2" data-anim style="--d:120">Slide for watch my Projects</p>
            </div>

            <Swiper :modules="[Navigation, Pagination, A11y, Keyboard]" :centered-slides="true"
                :lazy="{ loadPrevNext: 10 }" :loop="true" :keyboard="{ enabled: true }" :navigation="true"
                :pagination="{ clickable: true }" :space-between="24" :breakpoints="{
                    0: { slidesPerView: 1.05, centeredSlides: true },
                    640: { slidesPerView: 1.4, centeredSlides: true },
                    768: { slidesPerView: 2.2, centeredSlides: true },
                    1024: { slidesPerView: 3.2, centeredSlides: true }
                }" class="!pb-12 select-none" aria-roledescription="carousel" data-anim style="--d:200">
                <SwiperSlide v-for="(p, idx) in sortedProjects" :key="p.name" :style="{ '--d': 260 + idx * 90 + 'ms' }"
                    data-anim>
                    <article
                        class="project-card group h-[500px] rounded-2xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col"
                        style="content-visibility:auto; contain-intrinsic-size: 500px 320px;">
                        <div class="relative">
                            <img :src="coverOf(p)" :alt="p.name" class="w-full h-56 object-cover" loading="lazy"
                                decoding="async" />
                            <span v-if="p.isPrivate"
                                class="absolute left-3 top-3 rounded-full bg-gray-900/80 px-3 py-1 text-xs text-white">
                                Private
                            </span>
                        </div>

                        <div class="p-6 flex-1 flex flex-col">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-900" data-anim style="--d: 40ms">
                                {{ p.name }}
                            </h3>
                            <p class="text-gray-700 mt-2 line-clamp-3" data-anim style="--d: 80ms">
                                {{ p.desc }}
                            </p>

                            <div class="mt-4 flex flex-wrap gap-2">
                                <span v-for="(tech, i) in p.stack" :key="tech"
                                    class="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700"
                                    data-anim :style="{ '--d': 120 + i * 40 + 'ms' }">
                                    {{ tech }}
                                </span>
                            </div>

                            <div class="mt-auto pt-5">
                                <a v-if="!p.isPrivate" :href="p.url" target="_blank" rel="noopener"
                                    class="inline-flex items-center gap-2 font-semibold text-gray-900 hover:text-gray-700"
                                    data-anim style="--d: 200ms">
                                    View on GitHub
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7h6m0 0v6m0-6L10 16" />
                                    </svg>
                                </a>
                                <span v-else class="inline-flex items-center gap-2 text-gray-500" data-anim
                                    style="--d: 200ms">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z" />
                                    </svg>
                                    Private Project
                                </span>
                            </div>
                        </div>
                    </article>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>

<style scoped>
/* --- Animate on view: base → show โดยอาศัยคลาสที่ ancestor --- */
[data-anim] {
    opacity: 0;
    transform: translateY(14px) scale(.985);
    filter: saturate(90%) brightness(.98);
    will-change: opacity, transform, filter;
    transition:
        opacity 380ms cubic-bezier(.22, .61, .36, 1),
        transform 460ms cubic-bezier(.22, .61, .36, 1),
        filter 460ms cubic-bezier(.22, .61, .36, 1);
    transition-delay: var(--d, 0);
}

/* แสดงผลเมื่อ section ได้ .inview (จาก IO) */
.inview [data-anim] {
    opacity: 1;
    transform: none;
    filter: none;
}

/* Swiper visual tweaks (เดิม) */
:deep(.swiper-slide) {
    transition: transform .55s ease, opacity .55s ease, filter .55s ease;
    transform: scale(.90);
    opacity: .55;
    filter: saturate(.9);
}

:deep(.swiper-slide-prev),
:deep(.swiper-slide-next) {
    transform: scale(.95);
    opacity: .85;
}

:deep(.swiper-slide-active) {
    transform: scale(1.06);
    opacity: 1;
    z-index: 2;
}

:deep(.swiper-slide-active .project-card) {
    box-shadow: 0 20px 50px rgba(0, 0, 0, .12);
    border-color: #e5e7eb;
}

:deep(.swiper-pagination-bullet) {
    background: #9ca3af;
    opacity: .6;
}

:deep(.swiper-pagination-bullet-active) {
    background: #111827;
    opacity: 1;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    color: #111827;
}

/* ลด motion */
@media (prefers-reduced-motion: reduce) {
    [data-anim] {
        transition: none !important;
        transform: none !important;
        opacity: 1 !important;
        filter: none !important;
    }
}
</style>
