# 🛍️ E-Commerce Lite

Proyek ini merupakan aplikasi **E-Commerce sederhana** yang dibangun menggunakan **React**, dengan tujuan untuk menampilkan daftar produk, detail produk, fitur pencarian, serta autentikasi pengguna.  
Aplikasi ini dikembangkan sebagai bagian dari evaluasi bulan ke-3.

---

## 🌐 Demo

Kamu dapat mencoba aplikasi langsung melalui tautan berikut:  
👉 **[E-Commerce Lite - Live Demo](https://evaluasi-month-3.vercel.app/)**

---

## ⚙️ Teknologi yang Digunakan

- **React + Vite** – Frontend framework modern untuk performa cepat  
- **TypeScript** – Menambah kejelasan tipe dan mengurangi bug  
- **React Router** – Mengatur navigasi halaman  
- **React Hook Form** – Mengelola form dengan efisien  
- **Zod** – Validasi input form  
- **Context API** – Menangani state global (theme, auth, search)  
- **Vercel** – Platform untuk deployment

---

## 📁 Struktur Proyek

```
e-commerce-lite/
├── src/
│   ├── components/      # Komponen UI
│   ├── contexts/        # Contexts global (Theme, Auth, Search)
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Halaman utama (Home, ProductList, Search, Login, Profile)
│   ├── assets/          # Gambar dan ikon
│   ├── app/             # Setup store atau konfigurasi tambahan
│   └── main.tsx         # Entry point aplikasi
├── public/
│   └── favicon.ico
├── package.json
└── vite.config.ts
```

---

## 🔑 Fitur Utama

- 🔍 **Pencarian Produk** berdasarkan nama  
- 🛒 **Daftar Produk** dengan gambar, nama, dan harga  
- 👤 **Autentikasi Login** (nama & password sederhana)  
- 🧭 **Private Route** – Hanya pengguna yang login dapat mengakses halaman tertentu  
- 🌙 **Tema Gelap & Terang** (Theme Context)  
- 🧾 **Halaman Profil** menampilkan nama dan foto pengguna

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repository**
   ```bash
   git clone https://github.com/DsuRhan/evaluasi-month-3.git
   cd e-commerce-lite
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Jalankan server lokal**
   ```bash
   npm run dev
   ```

4. Akses aplikasi di browser melalui:
   ```
   http://localhost:5173
   ```

---

## 🧠 Catatan Pengembangan

- Proyek ini dibuat dengan fokus pada **pemahaman dasar React Hooks**, **Context API**, dan **Form Handling**.  
- Sistem login bersifat *dummy* (tanpa backend).  
- Penggunaan `PrivateRoute` memastikan keamanan dasar halaman pengguna.

---

## 👨‍💻 Pengembang

Dibuat oleh **DsuRhan** sebagai bagian dari evaluasi pembelajaran React bulan ke-3.  
Deployment melalui [Vercel](https://vercel.com).

---
✨ *"Build small, learn fast, grow steady."*
