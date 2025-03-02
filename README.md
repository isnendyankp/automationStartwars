# Project Testing dengan Playwright

## Deskripsi
Proyek ini bertujuan untuk melakukan pengujian otomatis menggunakan Playwright pada Star Wars API. Playwright adalah alat yang kuat untuk menguji aplikasi web dengan mendukung berbagai browser.

## Fitur
- Pengujian endpoint Star Wars API
- Validasi respons API
- Pengujian skenario pengguna

## Instalasi
1. Clone repositori ini:
   ```bash
   git clone <url-repositori>
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd <nama-direktori>
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```

## Menjalankan Pengujian
Untuk menjalankan pengujian, gunakan perintah berikut:

npx playwright test

### Perintah Pengujian Spesifik
Anda juga dapat menjalankan pengujian tertentu dengan perintah:

npx playwright test <nama-file>.spec.ts
