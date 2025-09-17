<template>
  <section id="about" class="relative bg-white">
    <div class="mx-auto max-w-7xl px-6 py-24 lg:px-12">
      <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <!-- Left: Text + Education -->
        <div class="lg:col-span-7">
          <div class="glass rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
            <!-- Soft highlight -->
            <div class="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/60 to-transparent"></div>
            <div class="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rotate-12 rounded-full bg-white/20 blur-3xl"></div>

            <p
              class="reveal fade-up mb-3 text-sm font-medium uppercase tracking-widest text-gray-700"
              data-delay="0"
            >
              About Me
            </p>

            <!-- Headline with typewriter -->
             <div class="h-62">
            <h1
              class="reveal fade-up text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight text-gray-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]"
              data-delay="100"
            >
            <span class="typewriter bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Hello, I’m
            </span>
              <span
                class="typewriter bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              >{{ displayText }}</span>
            </h1>
          </div>

            <!-- Subtitle -->
            <p
              class="reveal fade-up mt-4 text-base sm:text-lg text-gray-700"
              data-delay="180"
            >
              Final-year Software Engineering student • Mae Fah Luang University (School of ADT)
            </p>

            <!-- Lead -->
            <p
              class="reveal fade-up mt-6 text-lg leading-relaxed text-gray-800/90"
              data-delay="260"
            >
              Frontend-focused developer aiming for full-stack. I love crafting clean UI/UX and
              bridging frontend ↔ backend to ship reliable, scalable features. Strong collaboration,
              code reviews, and pragmatic workflows are my defaults.
            </p>

            <!-- CTAs -->
            <div
              class="reveal fade-up mt-8 flex flex-wrap items-center gap-3"
              data-delay="340"
            >
              <a
                href="https://drive.google.com/file/d/1raqKsxpB612pMR49s0N0aH7VnWN5P9bd/view?usp=drive_link"
                class="inline-flex items-center rounded-2xl bg-gray-900 px-5 py-3 text-white shadow-md ring-1 ring-black/10 transition hover:translate-y-[-1px] hover:shadow-lg"
              >
                Download CV
              </a>

            </div>

            <!-- Education -->
            <div class="reveal fade-up mt-10" data-delay="420">
              <h3 class="mb-4 font-semibold text-gray-900 text-lg">Education</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-800/90">
                <li>
                  <span class="font-medium">B.Eng. in Software Engineering</span>, Mae Fah Luang University — GPAX ~ 3.19
                </li>
                <li>Damrongratsongkroh School — Science-Math-English Program</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Right: Photo -->
        <div class="lg:col-span-5">
          <div class="relative mx-auto max-w-md">
            <div
              class="absolute -left-10 -top-8 h-28 w-28 rounded-3xl bg-white/40 blur-xl ring-1 ring-white/30"
            ></div>
            <div
              class="absolute -right-10 -bottom-10 h-32 w-32 rotate-6 rounded-3xl bg-white/30 blur-xl ring-1 ring-white/20"
            ></div>

            <div
              class="frosted rounded-3xl p-3 ring-1 ring-white/30 shadow-xl relative overflow-hidden"
            >
              <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"
              ></div>
              <img
                src="../assets/my_picture.JPG"
                alt="Phumiphat Wongsathit"
                class="aspect-square w-full rounded-2xl object-cover shadow-lg"
              />
            </div>

            <p
              class="mt-3 text-sm text-gray-600 glass-soft inline-block rounded-xl px-3 py-1.5"
            >
              Available for internships — Flexible (Onsite / Remote / Hybrid)
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

/* ==== Typewriter ==== */
const fullText = "Phumiphat\nWongsathit"
const displayText = ref('')

const TYPE_MS = 80
const ERASE_MS = 40
const HOLD_MS = 1200

let running = false
let cancel = false

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function startTypewriter() {
  if (running) return
  running = true
  cancel = false
  while (!cancel) {
    // typing
    for (let i = 1; i <= fullText.length && !cancel; i++) {
      displayText.value = fullText.slice(0, i)
      await sleep(TYPE_MS)
    }
    if (cancel) break
    await sleep(HOLD_MS)

    // erase
    for (let i = fullText.length - 1; i >= 0 && !cancel; i--) {
      displayText.value = fullText.slice(0, i)
      await sleep(ERASE_MS)
    }
    if (cancel) break
    await sleep(HOLD_MS)
  }
  running = false
}

function stopTypewriter() {
  cancel = true
}

/* ==== Reveal animation (ของเดิม) ==== */
let observer
onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const reveals = Array.from(document.querySelectorAll('#about .reveal'))

  if (prefersReduced) {
    reveals.forEach(el => el.classList.add('is-visible', 'no-motion'))
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = Number(el.getAttribute('data-delay') || 0)
            if (delay > 0) {
              el.style.transitionDelay = `${delay}ms`
              el.style.animationDelay = `${delay}ms`
            }
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    reveals.forEach((el) => observer.observe(el))
  }

  startTypewriter()
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  stopTypewriter()
})
</script>

<style scoped>
/* Glass styles */
.glass {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08),
    0 6px 14px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
}
.glass-soft {
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
}
.frosted {
  background: rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(22px) saturate(130%);
  -webkit-backdrop-filter: blur(22px) saturate(130%);
}
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  color: #111827;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
}

/* Reveal */
.reveal {
  opacity: 0;
  transform: translateY(16px);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
  transition: opacity 540ms cubic-bezier(.22, .61, .36, 1),
    transform 540ms cubic-bezier(.22, .61, .36, 1);
}
.fade-up.reveal.is-visible {
  animation: subtle-pop 680ms cubic-bezier(.2, .7, .2, 1) both;
}
@keyframes subtle-pop {
  0% {
    transform: translateY(14px) scale(.98);
    opacity: 0;
  }
  60% {
    transform: translateY(0) scale(1.005);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Typewriter (JS driven) */
.typewriter {
  white-space: pre-line;
  position: relative;
}
.typewriter::after {
  content: '';
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 4px;
  background: currentColor;
  animation: blink 0.85s step-end infinite;
  vertical-align: -0.1em;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
