# HRIS Frontend (Human Resource Information System)

Aplikasi web modern untuk manajemen Sumber Daya Manusia (SDM) yang dibangun menggunakan **React**, **Vite**, dan **Tailwind CSS**. Sistem ini dirancang untuk memfasilitasi pengelolaan karyawan, absensi, pengajuan cuti, penggajian, dan penilaian kinerja dengan antarmuka yang responsif dan mudah digunakan.

## 🌟 Fitur Utama

Aplikasi ini menggunakan sistem *Role-Based Access Control* (RBAC) yang membagi akses menjadi **Admin HR**, **Manager**, dan **Employee**.

### 1. Dashboard Interaktif
- **Admin:** Ringkasan total karyawan, pertumbuhan karyawan, dan tren kehadiran.
- **Manager:** Tinjauan kinerja tim, absensi tim, dan total jam kerja.
- **Employee:** Statistik pribadi, sisa cuti, dan ringkasan kehadiran bulanan.
- Visualisasi data menggunakan grafik (Area Chart & Bar Chart).

### 2. Manajemen Karyawan (Admin & Manager)
- CRUD (Create, Read, Update, Delete) data karyawan.
- Pencarian dan filter berdasarkan departemen, status, atau manajer.
- Profil detail karyawan termasuk informasi kontrak dan kontak.

### 3. Sistem Absensi (Attendance)
- **Check-In / Check-Out** harian dengan pencatatan waktu *real-time*.
- Riwayat kehadiran dengan filter bulan dan tanggal.
- Kalkulasi jam kerja otomatis.

### 4. Manajemen Cuti (Leave Requests)
- Pengajuan cuti oleh karyawan dengan rentang tanggal dan alasan.
- Persetujuan atau penolakan cuti oleh Manajer/Admin.
- Status cuti (Pending, Approved, Rejected).

### 5. Penggajian (Salary Slips)
- Pembuatan slip gaji digital oleh Admin.
- Karyawan dapat melihat dan memfilter riwayat slip gaji berdasarkan bulan/tahun.
- Rincian gaji pokok, tunjangan, potongan, dan gaji bersih.

### 6. Penilaian Kinerja (Performance Reviews)
- Pemberian rating (bintang) dan ulasan kinerja berkala.
- Manajemen ulasan oleh Admin/Manager.
- Karyawan dapat melihat riwayat penilaian kinerja mereka.

### 7. Fitur Lainnya
- **Autentikasi Aman:** Login menggunakan JWT.
- **Mode Gelap/Terang:** Dukungan tema sistem atau manual.
- **Desain Responsif:** Tampilan optimal di desktop dan perangkat seluler (sidebar responsif).

## 🛠️ Teknologi yang Digunakan

Project ini dibangun menggunakan *stack* teknologi modern:

- **Core:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Bahasa:** JavaScript / TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (berbasis Radix UI)
- **State Management & Data Fetching:** React Context API, [Axios](https://axios-http.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Date Handling:** [Date-fns](https://date-fns.org/)
- **Form Handling:** React Hook Form
- **Icons:** [Lucide React](https://lucide.dev/)

## 📋 Prasyarat Instalasi

Sebelum memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru direkomendasikan)
- [npm](https://www.npmjs.com/) atau yarn/pnpm

## 🚀 Instalasi dan Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/hris-frontend.git](https://github.com/username/hris-frontend.git)
    cd hris-frontend
    ```

2.  **Instal Dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment**
    Pastikan backend API sudah berjalan. Secara default, aplikasi ini mengarah ke `http://127.0.0.1:8000/api`. Jika URL backend Anda berbeda, sesuaikan file `src/lib/https.js` atau buat file `.env` (jika sudah dikonfigurasi untuk membacanya).

4.  **Jalankan Aplikasi (Mode Development)**
    ```bash
    npm run dev
    ```
    Aplikasi biasanya akan berjalan di `http://localhost:5173`.

5.  **Build untuk Produksi**
    ```bash
    npm run build
    ```

## ww Susunan Project

Proyek ini menggunakan struktur *Feature-based* untuk memudahkan skalabilitas:

### Terima kasih telah menggunakan HRIS Frontend kami! 🙏

Proyek ini dikembangkan dengan sepenuh hati oleh tim kami untuk membantu  
mempermudah pengelolaan SDM di perusahaan Anda.

**Tim Pengembang:**  
| 👤 Nama | 💼 Role |
|---------|---------|
| **Eko Muchamad Haryono** | Lead Backend Developer |
| **Raka Muhammad Rabbani** | Backend Developer |
| **Ryandra Athaya Saleh** | Lead Frontend Developer |
| **Octaviani Nursalsabila** | UI/UX Developer |
| **Yossy Indra Kusuma** | Frontend Developer |

**FWD Batch 3 - Kelompok HRIS** 🚀
