# 🐱Tempat Teduh🐶
Aplikasi yang dirancang sebagai sarana pengelolaan suatu tempat **Penitipan Hewan** berbasis digital. Tempat teduh dibangun menggunakan **Vue 3**, **Pinia**, dan **Json Server** sebagai backend.

---

## 🦋 Fitur Utama

- ✅ Dashboard --> sebagai fitur yang berfungsi untuk menampilkan informasi siklus transaksi pada aplikasi secara real time dan akurat.
- ✅ Penitipan Hewan --> sebagai fitur yang berfungsi untuk penginputan data penitipan hewan peliharaan.
- ✅ Pengambilan Hewan --> sebagai fitur yang berfungsi untuk penginputan data pengambilan hewan peliharaan.
- ✅ Daftar Penitipaan --> sebagai fitur yang berfungsi untuk menampilkan daftar hewan yang dititipkan.
- ✅ Daftar Pengambilan --> sebagai fitur yang berfungsi untuk menampilkan daftar hewan yang telah di pick up.
- ✅ Laporan --> Konten Dummy.

---

## 🧭 Routing Halaman

| Path         | Halaman        | Deskripsi                                                  |
|--------------|----------------|-------------------------------------------------------------|
| `/`          | Dashboard     | Halaman utama  |
| `/boarding`   | Penitipan Hewan       | Form penginputan data penitipan |
| `/pickup`   | Pengambilan hewan     | Form penginputan data pengambilan  |
| `/boarding-list`   | Daftar Penitipan       | Daftar hewan yang dititipkan |
| `/pickup-list`   | Daftar Pengambilan      | Daftar hewan yang telah diambil |
| `/laporan`   | Laporan        | Konten Dummy |

---

## 🌐 API Endpoints (JSON Server)

| Method | Endpoint                 | Deskripsi                          | 
|--------|--------------------------|------------------------------------|
| GET    | `/pets`             | Mengambil semua data        |
| POST   | `/pets`             | Menyimpan data         |
| PUT    | `/pets/:id`         | Memperbarui status       | 
| DELETE   | `/pets/:id`         | Menghapus data   | 

