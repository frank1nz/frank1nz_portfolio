<template>
  <section id="skills" class="py-20 px-6 lg:px-20 bg-gray-50 dark:bg-gray-800">
    <h2 class="text-3xl font-bold mb-10">Skills</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Frontend -->
      <div class="p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl">
        <h3 class="text-xl font-semibold mb-4">Frontend</h3>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li>Vue.js, React, Next.js</li>
          <li>React Native, Flutter</li>
          <li>Tailwind CSS, HTML5, CSS3, TypeScript</li>
        </ul>
      </div>

      <!-- Backend -->
      <div class="p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl">
        <h3 class="text-xl font-semibold mb-4">Backend</h3>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li>Golang (Fiber), Node.js (Express)</li>
          <li>REST APIs, gRPC, Kafka (basics)</li>
        </ul>
      </div>

      <!-- Database -->
      <div class="p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl">
        <h3 class="text-xl font-semibold mb-4">Database</h3>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li>MongoDB, PostgreSQL, MySQL</li>
        </ul>
      </div>

      <!-- Tools -->
      <div class="p-6 bg-white dark:bg-gray-900 shadow-md rounded-xl">
        <h3 class="text-xl font-semibold mb-4">Tools</h3>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li>Git, Docker, Postman</li>
          <li>VS Code, Google Cloud</li>
        </ul>
      </div>
    </div>
  </section>
</template>
