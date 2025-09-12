<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import emailjs from '@emailjs/browser'
import { Icon } from '@iconify/vue'

// ====== ฟิลด์จากผู้ใช้ ======
const name = ref('')
const email = ref('')
const message = ref('')

// ====== สถานะการส่ง ======
const sending = ref(false)
const success = ref('')
const errorMsg = ref('')

// ====== EmailJS ENV ======
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const handleSubmit = async () => {
  success.value = ''
  errorMsg.value = ''

  if (!name.value || !email.value || !message.value) {
    errorMsg.value = 'กรุณากรอกข้อมูลให้ครบถ้วน'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errorMsg.value = 'กรุณากรอกอีเมลที่ถูกต้อง'
    return
  }

  sending.value = true
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { name: name.value, email: email.value, message: message.value },
      { publicKey: PUBLIC_KEY }
    )
    success.value = 'ส่งข้อความเรียบร้อยแล้ว ขอบคุณครับ!'
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (err) {
    console.error(err)
    errorMsg.value = 'ส่งไม่สำเร็จ ลองใหม่อีกครั้งครับ'
  } finally {
    sending.value = false
  }
}

// ====== Animate on view (เบา: toggle ที่ section เดียว) ======
const sectionRef = ref(null)
let io = null

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
  <section id="contact" ref="sectionRef" class="relative bg-gray-50">
    <!-- accent shapes -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-10 -left-10 h-40 w-40 rounded-3xl bg-white" data-anim style="--d:0ms"></div>
      <div class="absolute -bottom-16 -right-16 h-48 w-48 rotate-6 rounded-3xl bg-white" data-anim style="--d:120ms"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
      <div class="mb-10 text-center">
        <h2 class="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl" data-anim style="--d:0ms">
          Contact Me
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-gray-600" data-anim style="--d:120ms">
          Any questions about works or projects? Just drop me a message!
        </p>
      </div>

      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <!-- Left: Contact card -->
        <aside
          class="lg:col-span-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          data-anim
          style="--d:200ms"
        >
          <div class="flex items-center gap-3" data-anim style="--d:260ms">
            <div class="h-11 w-11 rounded-2xl bg-gray-900 text-white grid place-items-center">
              <Icon icon="mdi:email-outline" width="22" />
            </div>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <a href="mailto:phumiphat.wongsathit1@gmail.com" class="font-medium text-gray-900 hover:underline">
                phumiphat.wongsathit1@gmail.com
              </a>
            </div>
          </div>

          <div class="mt-6 flex items-center gap-3" data-anim style="--d:300ms">
            <div class="h-11 w-11 rounded-2xl bg-gray-900 text-white grid place-items-center">
              <Icon icon="mdi:phone-outline" width="22" />
            </div>
            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <a href="tel:+66808382826" class="font-medium text-gray-900 hover:underline">
                +66 80-838-2826
              </a>
            </div>
          </div>

          <div class="mt-6 flex items-center gap-3" data-anim style="--d:340ms">
            <div class="h-11 w-11 rounded-2xl bg-gray-900 text-white grid place-items-center">
              <Icon icon="mdi:map-marker-outline" width="22" />
            </div>
            <div>
              <p class="text-sm text-gray-500">Location</p>
              <p class="font-medium text-gray-900">Chiang Rai, Thailand</p>
            </div>
          </div>

          <hr class="my-6 border-gray-200" data-anim style="--d:380ms" />

          <div class="space-y-3" data-anim style="--d:420ms">
            <p class="text-sm font-semibold text-gray-900">Availability</p>
            <p class="text-sm text-gray-600">
              Open to internships — Frontend / Full-stack <br />Flexible (Onsite / Remote / Hybrid)
            </p>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <a href="https://github.com/frank1nz" target="_blank"
               class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:border-gray-300"
               data-anim style="--d:460ms">
              <Icon icon="mdi:github" width="18" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/phumiphat-wongsathit-a303732ab/" target="_blank"
               class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:border-gray-300"
               data-anim style="--d:500ms">
              <Icon icon="mdi:linkedin" width="18" /> LinkedIn
            </a>
            <a href="/Resume_Phumiphat_Wongsathit.pdf"
               class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:border-gray-300"
               data-anim style="--d:540ms">
              <Icon icon="mdi:file-document-outline" width="18" /> Resume
            </a>
            <a href="https://www.facebook.com/phumiphut.won/" target="_blank"
               class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:border-gray-300"
               data-anim style="--d:580ms">
              <Icon icon="ic:baseline-facebook" width="18" /> Facebook
            </a>
            <a href="https://www.instagram.com/plscallfrank/" target="_blank"
               class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:border-gray-300"
               data-anim style="--d:620ms">
              <Icon icon="mdi:instagram" width="18" /> Instagram
            </a>
          </div>
        </aside>

        <!-- Right: Form -->
        <div class="lg:col-span-7" data-anim style="--d:220ms">
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <!-- status banners -->
            <div v-if="success" class="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700 slide-in">
              <div class="flex items-center gap-2">
                <Icon icon="mdi:check-circle-outline" width="20" />
                <span>{{ success }}</span>
              </div>
            </div>
            <div v-if="errorMsg" class="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 slide-in">
              <div class="flex items-center gap-2">
                <Icon icon="mdi:alert-circle-outline" width="20" />
                <span>{{ errorMsg }}</span>
              </div>
            </div>

            <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-5">
              <!-- Name -->
              <div data-anim style="--d:260ms">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <div class="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-gray-900">
                  <Icon icon="mdi:account-outline" width="20" class="text-gray-400" />
                  <input id="name" v-model="name" type="text" placeholder="Your name"
                         class="w-full bg-transparent outline-none placeholder:text-gray-400" autocomplete="name" />
                </div>
              </div>

              <!-- Email -->
              <div data-anim style="--d:300ms">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-2 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-gray-900">
                  <Icon icon="mdi:email-outline" width="20" class="text-gray-400" />
                  <input id="email" v-model="email" type="email" placeholder="you@example.com"
                         class="w-full bg-transparent outline-none placeholder:text-gray-400" autocomplete="email" />
                </div>
              </div>

              <!-- Message -->
              <div data-anim style="--d:340ms">
                <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                <div class="mt-2 flex items-start gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-gray-900">
                  <Icon icon="mdi:text-subject" width="20" class="mt-1 text-gray-400" />
                  <textarea id="message" v-model="message" rows="6"
                            placeholder="Tell me about your project, timeline, and goals…"
                            class="min-h-[132px] w-full resize-y bg-transparent outline-none placeholder:text-gray-400"></textarea>
                </div>
              </div>

              <!-- Submit -->
              <div data-anim style="--d:380ms">
                <button
                  type="submit"
                  :disabled="sending"
                  class="group relative mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:translate-y-[-1px] hover:shadow-lg disabled:opacity-60"
                >
                  <svg v-if="sending" class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <Icon v-else icon="mdi:send-outline" width="20" />
                  <span>{{ sending ? 'Sending…' : 'Send Message' }}</span>
                  <span class="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-gray-900/0 via-gray-900/0 to-gray-900/0 transition group-hover:via-gray-900/10" />
                </button>
                <p class="mt-2 text-xs text-gray-500">
                  The message you send will be delivered via Email. I will get back to you as soon as possible.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- Animate-on-view (ใช้ที่ ancestor เพิ่ม .inview) --- */
[data-anim]{
  opacity:0;
  transform: translateY(14px) scale(.985);
  filter: saturate(90%) brightness(.98);
  will-change: opacity, transform, filter;
  transition:
    opacity 380ms cubic-bezier(.22,.61,.36,1),
    transform 460ms cubic-bezier(.22,.61,.36,1),
    filter 460ms cubic-bezier(.22,.61,.36,1);
  transition-delay: var(--d, 0ms);
}
.inview [data-anim]{
  opacity:1;
  transform:none;
  filter:none;
}

/* แบนเนอร์สถานะเด้งลงเบา ๆ */
.slide-in{
  animation: slideIn .38s cubic-bezier(.22,.61,.36,1);
}
@keyframes slideIn{
  from{ transform: translateY(-8px); opacity:0 }
  to  { transform: none;            opacity:1 }
}

/* ลด motion */
@media (prefers-reduced-motion: reduce){
  [data-anim]{ transition:none !important; transform:none !important; opacity:1 !important; filter:none !important; }
  .slide-in{ animation:none !important; }
}
</style>
