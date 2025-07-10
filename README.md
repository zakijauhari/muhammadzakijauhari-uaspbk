# 🐱Tempat Teduh🐶
Aplikasi yang dirancang sebagai sarana pengelolaan suatu tempat **Penitipan Hewan** berbasis digital. Tempat teduh dibanngun menggunakan **Vue 3**, **Pinia**, dan **Json Server** sebagai backend.

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
| `/laporan`   | Laporan        | (Opsional) Halaman rekap transaksi, total pendapatan, dsb  |
| `/laporan`   | Laporan        | (Opsional) Halaman rekap transaksi, total pendapatan, dsb  |

---

## 🛠️ Store Management (Pinia)

### `menuStore`

- Menyimpan daftar menu dan kategori
- Getter: `menuByKategori`, `kategoriList`

### `mejaStore`

- Menyimpan daftar meja dan status ketersediaannya
- Getter: `filterMeja`
- Aksi: `tandaiTidakTersedia(id)`, `tandaiTersedia(id)`
- Menggunakan `localStorage` untuk persistensi

### `transaksiStore`

- Menyimpan daftar pesanan dan transaksi
- Getter: `totalPesanan`
- Aksi: `tambahPesanan`, `kurangiPesanan`, `hapusPesanan`, `simpanTransaksi`, `fetchTransaksi`, `tandaiSelesai`

---

## 🌐 API Endpoints (JSON Server)

| Method | Endpoint                 | Deskripsi                          | Body / Params                                             |
|--------|--------------------------|------------------------------------|-----------------------------------------------------------|
| GET    | `/transaksi`             | Mengambil semua transaksi          | -                                                         |
| POST   | `/transaksi`             | Menyimpan transaksi baru           | `{ id, tanggal, pesanan[], mejaId, selesai }`             |
| PUT    | `/transaksi/:id`         | Memperbarui status transaksi       | `{ ...transaksi, selesai: true }`                         |

