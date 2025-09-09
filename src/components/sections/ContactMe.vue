<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

// ฟิลด์จากผู้ใช้
const name = ref('')
const email = ref('')
const message = ref('')

// สถานะการส่ง
const sending = ref(false)
const success = ref('')
const errorMsg = ref('')

// ดึงค่าจาก .env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

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
      {
        name: name.value,       // ตรงกับ {{name}}
        email: email.value,     // ตรงกับ {{email}}
        message: message.value, // ตรงกับ {{message}}
      },
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
</script>

<template>
  <section id="contact" class="py-20 px-6 lg:px-20 bg-gray-50 dark:bg-gray-800">
    <h2 class="text-3xl font-bold mb-10">Contact Me</h2>

    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-xl p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Your name"
            class="mt-2 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="mt-2 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <!-- Message -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            v-model="message"
            rows="5"
            placeholder="Your message..."
            class="mt-2 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          ></textarea>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="sending"
          class="w-full py-3 px-6 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {{ sending ? 'Sending...' : 'Send Message' }}
        </button>

        <p v-if="success" class="text-green-600 mt-2">{{ success }}</p>
        <p v-if="errorMsg" class="text-red-600 mt-2">{{ errorMsg }}</p>
      </form>
    </div>
  </section>
</template>
