# CloudSnap

CloudSnap adalah aplikasi full-stack untuk manajemen produk berbasis web, dibangun menggunakan Laravel (backend) dan SvelteKit (frontend). Aplikasi ini memiliki fitur autentikasi, dashboard admin, serta manajemen produk dengan upload gambar ke AWS S3.

---

## 🚀 Fitur

- Login & autentikasi (Laravel Sanctum)
- CRUD Produk (Create, Read, Update, Delete)
- Upload gambar produk ke AWS S3
- Dashboard admin modern (SvelteKit)
- API RESTful (Laravel)
- Preview gambar sebelum upload
- UI admin responsive & modern

---

## 🧱 Tech Stack

### Frontend
- SvelteKit
- TypeScript
- TailwindCSS

### Backend
- Laravel 13
- PHP 8.3
- Laravel Sanctum
- MySQL / PostgreSQL
- AWS S3 (storage gambar)

---

## 📁 Struktur Project


CloudSnap/
├── backend/ (Laravel API)
└── frontend/ (SvelteKit Admin Panel)


---

## ⚙️ Cara Menjalankan Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

Backend akan berjalan di:

http://localhost:8000
⚙️ Cara Menjalankan Frontend
cd frontend
npm install
npm run dev

Frontend akan berjalan di:

http://localhost:5173
🔗 API Endpoint

Base URL:

http://localhost:8000/api

Contoh endpoint:

GET /products
POST /products
PUT /products/{id}
DELETE /products/{id}
☁️ Storage (Gambar)

Semua gambar produk disimpan di AWS S3 menggunakan Laravel Flysystem.

Konfigurasi:

Disk: s3
Folder: products/
🔐 Authentication

Menggunakan Laravel Sanctum:

Token disimpan di localStorage
Dipakai di header:
Authorization: Bearer {token}
🧪 Cara Login API
Login user
Ambil token
Simpan di frontend
Gunakan untuk akses admin API
📌 Environment Frontend (.env)

Buat file:

frontend/.env

Isi:

VITE_API_URL=http://localhost:8000/api
👨‍💻 Author

Royandi

📌 Status Project

✔ Backend selesai
✔ Frontend selesai
✔ CRUD product jalan
✔ Upload image ke S3 jalan
✔ Auth Sanctum jalan
✔ Siap deploy


---

Kalau kamu mau next step, aku bisa bantu:
- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- atau :contentReference[oaicite:2]{index=2}

Tinggal bilang aja.