# 🌐 Personal Portfolio

My Portfolio Website built with **Vue 3, Vite, TailwindCSS, Swiper, and EmailJS**.
This website showcases my **About Me **, ** Skills **, ** Projects **, and ** Contact** information in a clean and minimal style.  

![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38b2ac?logo=tailwind-css&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-12-6332f6?logo=swiper&logoColor=white)
![EmailJS](https://img.shields.io/badge/EmailJS-4-0A7EC2?logo=gmail&logoColor=white)

---

## ✨ Features

- 👤 **About Me** – A short introduction with clean UI  
- 🛠️ **Skills** – Tech stack and tools I use  
- 📂 **Projects** – Swiper slider with project details and links  
- 📬 **Contact Me** – EmailJS integration with validation & success/error states  
- 📱 **Responsive Design** – Optimized for all devices  

---

## 🛠️ Tech Stack

- **Framework:** Vue 3 + Vite  
- **Styling:** TailwindCSS  
- **UI Components:** Swiper, Iconify  
- **Email Service:** EmailJS  
- **Build Tool:** Vite  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/frank1nz/frank1nz_portfolio.git
cd frank1nz_portfolio
```
### 2. Install dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```
### 3. Set up environment variables
- Create a .env file in the project root:
```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CONTACT_EMAIL=example@gmail.com
```
### 4. Run the project
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

## Project Structure
frank1nz_portfolio

├── public/              # Static assets
├── src/
│   ├── components/      # Reusable Vue components
│   ├── assets/          # Images, icons, etc.
│   ├── views/           # Main sections (About, Skills, Projects, Contact)
│   └── App.vue          # Root component
├── package.json
├── vite.config.ts
└── README.md

