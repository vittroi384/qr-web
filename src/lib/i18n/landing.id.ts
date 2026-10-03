import type { QrType } from "@/lib/qr/types";
import type { LandingCopy, UseCaseId } from "./index";

/** Teks panjang Bahasa Indonesia untuk halaman landing per jenis (/id/wifi-qr-code, …). */
export const landingId: Record<QrType, LandingCopy> = {
  url: {
    title: "Buat QR Code Link (URL)",
    subtitle: "Ubah alamat web apa pun menjadi QR code yang membuka halamannya dalam sekali pindai.",
    metaTitle: "Buat QR Code Link (URL) — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code gratis yang membuka halaman web apa pun. Kode statis yang tidak pernah kedaluwarsa, dibuat di browser Anda. Simpan PNG/SVG atau cetak A4. Tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code link",
      how: [
        "Kode ini menyimpan alamat web itu sendiri, huruf demi huruf. Jika Anda mengetik example.com/menu, https:// ditambahkan otomatis sehingga isi kodenya https://example.com/menu. Saat seseorang mengarahkan kamera HP ke kode, HP mengenali link tersebut dan menawarkan untuk membukanya di browser. Tidak ada perantara: tidak ada layanan pengalihan (redirect) dan tidak ada akun yang harus tetap aktif.",
        "Di iPhone, aplikasi Kamera bawaan menampilkan banner berisi alamatnya; ketuk untuk membuka Safari. Sebagian besar HP Android melakukan hal yang sama lewat aplikasi kamera atau Google Lens. Karena orang melihat alamatnya sebelum membuka, domain yang pendek dan mudah dikenali lebih dipercaya daripada link panjang penuh parameter pelacakan.",
        "Semakin panjang alamatnya, semakin banyak kotak kecil yang dibutuhkan kode. Link 30 karakter menghasilkan pola renggang yang mudah dipindai; link 300 karakter dengan banyak parameter menghasilkan pola rapat yang perlu dicetak lebih besar. Link yang diawali javascript: atau data: ditolak, karena pemindai tidak boleh menjalankan kode.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Restoran mencetak kode di kartu meja agar tamu bisa membuka halaman menu tanpa menunggu buku menu.",
        "Etalase toko menampilkan kode yang mengarah ke jam buka dan pemesanan online, berguna bagi orang yang lewat setelah toko tutup.",
        "Label produk mengarah ke panduan pemasangan atau halaman garansi, sehingga buku manual cetak bisa tetap ringkas.",
        "Pembicara seminar menaruh kode di slide terakhir yang membuka materi presentasi, jadi peserta tidak perlu menyalin URL dari layar.",
        "Brosur promo Kedai Kopi Senja mengarah ke halaman pesan-antar, tanpa perlu mengetik alamat panjang.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Kodenya statis: jika alamat berubah, Anda perlu kode baru. Arahkan ke halaman yang Anda kelola sendiri, seperti domainanda.com/menu, supaya isi halamannya bisa diganti tanpa mencetak ulang.",
        "Buang parameter pelacakan yang tidak perlu. Link yang lebih pendek menghasilkan pola lebih bersih yang cepat terbaca dari jauh.",
        "Patokan praktis: lebar kode minimal sepersepuluh jarak pindai, yaitu sekitar 2 cm untuk benda yang dipegang tangan dan 30 cm untuk poster yang dibaca dari jarak 3 m.",
        "Buka link di HP Anda sendiri setelah menyimpan. Salah ketik alamat adalah penyebab paling umum kode cetak tidak berfungsi.",
      ],
    },
    faq: [
      {
        q: "Apakah QR code link bisa kedaluwarsa?",
        a: "Tidak. Alamatnya tersimpan di dalam gambar, jadi kode berfungsi selama halaman web-nya masih online. Situs ini tidak perlu tetap ada agar kode tetap jalan.",
      },
      {
        q: "Bisakah link diganti setelah dicetak?",
        a: "Tidak di dalam kodenya, karena kodenya statis. Namun, Anda bisa mengubah isi halaman yang dituju atau memasang pengalihan (redirect) di situs Anda sendiri.",
      },
      {
        q: "Apakah saya harus mengetik https://?",
        a: "Tidak. Jika tidak ditulis, https:// ditambahkan otomatis. Tulis http:// secara manual hanya jika situs Anda memang tidak mendukung HTTPS.",
      },
      {
        q: "Bisakah saya melihat berapa orang yang memindai?",
        a: "Tidak di sini. Kode langsung membuka halaman Anda, jadi pindaian hanya terhitung jika analitik situs Anda mencatat kunjungannya. Tambahkan parameter kampanye seperti ?utm_source=poster pada link agar kunjungan dari kode mudah dibedakan.",
      },
    ],
  },

  social: {
    title: "Buat QR Code Media Sosial",
    subtitle: "Ketik nama pengguna dan dapatkan kode yang membuka profil Instagram, TikTok, YouTube, dan lainnya.",
    metaTitle: "Buat QR Code Instagram & Media Sosial — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code Instagram, TikTok, YouTube, LinkedIn, Telegram, atau Linktree hanya dari nama pengguna. Statis, tidak pernah kedaluwarsa, gratis, dan tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code media sosial",
      how: [
        "Pilih platform dan ketik nama pengguna Anda; alamat profil standarnya dibuat otomatis. Akun Instagram @kedaikopisenja menjadi https://www.instagram.com/kedaikopisenja/, handle YouTube menjadi https://www.youtube.com/@channel, dan ID profil LinkedIn menjadi https://www.linkedin.com/in/profile-id/. Tanda @ di depan dihapus jika platform tidak memakainya di alamat, begitu juga spasi dan garis miring.",
        "Jika Anda sudah punya link profil, tempel saja, dan platformnya dikenali otomatis. Saat dipindai, HP melihat link https biasa. Jika aplikasinya terpasang, iOS dan Android biasanya membuka profil di aplikasi; jika tidak, profil terbuka di browser.",
        "Beberapa platform memakai kode, bukan nama: Discord butuh kode undangan, Google Review butuh Place ID, dan Spotify memakai ID artis. Teks contoh di setiap kolom menunjukkan apa yang perlu diisi.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Kafe menambahkan kode Instagram di struk agar pelanggan bisa follow tanpa mencari nama yang punya tiga akun mirip.",
        "Online shop menempel kode TikTok di paket kiriman supaya pembeli bisa menonton live jualan berikutnya.",
        "Musisi memasang kode artis Spotify di meja merchandise dan kode Linktree di brosur untuk link lainnya.",
        "Usaha lokal meminta ulasan lewat kode Google Review di kasir, yang langsung membuka formulir ulasan.",
        "Pencari kerja mencetak kode LinkedIn di CV atau name tag saat job fair.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Periksa nama pengguna dengan membuka link di baris hasil sebelum menyimpan. Kurang satu huruf saja bisa membawa orang ke akun lain.",
        "Untuk Discord, buat undangan yang tidak pernah kedaluwarsa; undangan bawaan berhenti berfungsi setelah tujuh hari, dan kode cetak ikut mati.",
        "Jika Anda mungkin mengganti nama akun, kode ke halaman Linktree atau situs Anda sendiri lebih tahan perubahan daripada link profil langsung.",
        "Taruh nama atau logo platform di samping kode agar orang tahu apa yang akan terbuka sebelum memindai.",
      ],
    },
    faq: [
      {
        q: "Apakah kode membuka aplikasi atau situs web?",
        a: "Kode berisi link profil biasa. Di sebagian besar HP, link terbuka di aplikasi jika terpasang dan di browser jika tidak.",
      },
      {
        q: "Bagaimana jika saya mengganti nama pengguna?",
        a: "Kode tetap mengarah ke alamat lama, yang bisa tidak berfungsi atau nanti dipakai orang lain. Buat kode baru setelah ganti nama.",
      },
      {
        q: "Bisakah beberapa profil dimasukkan ke satu kode?",
        a: "Tidak, satu kode membuka satu alamat. Gunakan halaman link-in-bio seperti Linktree dan buat kode untuk halaman itu.",
      },
      {
        q: "Di mana saya menemukan Google Place ID?",
        a: "Google menyediakan Place ID Finder di dokumentasi Maps-nya. Cari nama usaha Anda di sana dan salin ID yang diawali ChIJ.",
      },
      {
        q: "Apakah profil saya tetap privat jika saya membuat kode?",
        a: "Kode hanya berisi alamat profil publik. Apa yang terlihat setelah dipindai bergantung pada pengaturan privasi akun Anda.",
      },
    ],
  },

  whatsapp: {
    title: "Buat QR Code WhatsApp",
    subtitle: "Pelanggan cukup memindai untuk langsung chat WhatsApp dengan Anda, lengkap dengan pesan yang sudah terketik.",
    metaTitle: "Buat QR Code WhatsApp — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code WhatsApp gratis yang membuka chat ke nomor Anda dengan pesan otomatis. Cocok untuk toko, warung, dan online shop. Tidak kedaluwarsa, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code WhatsApp",
      how: [
        "Kode ini memakai link click-to-chat resmi WhatsApp. Nomor Anda diubah menjadi angka saja, tanpa tanda plus, spasi, atau angka 0 di depan, lalu pesan ditambahkan sebagai teks yang di-encode untuk URL: https://wa.me/6281234567890?text=Halo%2C%20saya%20mau%20pesan%20meja.",
        "Saat dipindai, HP membuka link tersebut, WhatsApp terbuka, dan chat ke nomor Anda muncul dengan pesan yang sudah menunggu di kolom ketik. Tidak ada yang terkirim sebelum orang itu menekan kirim, jadi pesannya bisa diubah dulu. Jika WhatsApp belum terpasang, link membuka halaman web yang menawarkan unduhan aplikasi atau WhatsApp Web.",
        "Nomor wajib diawali kode negara, karena wa.me tidak bisa menebak negara Anda. Untuk Indonesia, tulis +62 812-3456-7890, bukan 0812-3456-7890. Generator menerima 7 sampai 15 digit, cukup untuk nomor internasional. Akun WhatsApp Business bekerja sama persis dengan akun pribadi.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Warung Makan Bu Sri menempel kode di meja dan etalase dengan pesan “Halo, saya mau pesan untuk dibungkus”, sehingga pesanan masuk dengan format yang rapi.",
        "Online shop menyelipkan kode di paket atau resi untuk pertanyaan seputar pesanan dan komplain, lebih mudah daripada mencari nomor admin.",
        "Salon atau barbershop mencetak kode di kartu nama dengan pesan “Saya mau booking jadwal”, jadi tidak perlu bolak-balik menanyakan maksud chat.",
        "Kos-kosan atau kontrakan menaruh kode di papan “Disewakan” agar calon penyewa bisa langsung tanya ke pemilik.",
        "Pemandu wisata menunjukkan kode di titik kumpul supaya rombongan bisa menghubunginya selama tur.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Tulis nomor dalam format internasional, misalnya +62 812-3456-7890, bukan 0812-3456-7890. Angka 0 di depan memang dihapus, tetapi kode negara 62 tidak bisa ditambahkan otomatis.",
        "Buat pesan otomatis singkat dan spesifik, seperti permintaan booking atau “Nomor pesanan saya:”. Pesan panjang membuat kode lebih rapat.",
        "Pindai sendiri kode yang sudah jadi dan pastikan chat terbuka ke nama yang benar. Salah satu digit saja bisa membawa pelanggan ke orang asing.",
        "Pakai nomor yang memang dipegang admin atau kasir dan aktif di jam buka. Kode yang mengarah ke nomor yang jarang dibalas justru membuat pelanggan kecewa.",
        "Jika Anda ganti nomor, kode cetak tetap membuka nomor lama, jadi siapkan cetak ulang.",
      ],
    },
    faq: [
      {
        q: "Apakah bisa dipakai kalau orangnya belum menyimpan nomor saya?",
        a: "Bisa. Itulah gunanya link wa.me: chat langsung terbuka tanpa harus menyimpan kontak Anda dulu.",
      },
      {
        q: "Apakah pesannya terkirim otomatis?",
        a: "Tidak. Pesan muncul di kolom ketik, dan orang itu yang memutuskan untuk mengirim apa adanya, mengubah, atau menghapusnya.",
      },
      {
        q: "Apakah bisa untuk WhatsApp Business?",
        a: "Bisa. Gunakan nomor yang terdaftar di akun WhatsApp Business Anda.",
      },
      {
        q: "Kenapa kode saya tidak membuka chat?",
        a: "Penyebab paling umum adalah kode negara yang hilang atau salah. Pastikan nomor di baris hasil diawali 62 dan tidak ada angka 0 tambahan setelahnya.",
      },
      {
        q: "Bisakah kode membuka grup atau saluran WhatsApp?",
        a: "Jenis ini selalu membuka chat ke satu nomor. Untuk grup, salin link undangan grup (chat.whatsapp.com/…) dan gunakan jenis URL. Untuk Saluran WhatsApp, pilih WhatsApp Channel di jenis Media sosial.",
      },
    ],
  },

  text: {
    title: "Buat QR Code Teks",
    subtitle: "Masukkan catatan, kode, atau pesan singkat ke QR code yang menampilkan teksnya saat dipindai.",
    metaTitle: "Buat QR Code Teks — Gratis, Tanpa Daftar",
    metaDescription:
      "Simpan teks biasa di QR code: catatan, nomor seri, petunjuk, atau pesan singkat. Tidak perlu link atau internet untuk membacanya. Gratis, statis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code teks",
      how: [
        "Kode teks berisi persis karakter yang Anda ketik, tanpa awalan dan tanpa link. Membacanya tidak butuh internet: teks dibaca langsung dari polanya. Cocok untuk tempat tanpa sinyal, atau untuk informasi yang tidak boleh bergantung pada situs web yang harus tetap online.",
        "Cara HP menampilkan teks biasa berbeda-beda. Banyak pemindai Android dan Google Lens menampilkan teks dengan tombol salin. Aplikasi Kamera iPhone bisa menampilkannya di banner atau menawarkan pencarian, tergantung versi iOS. Jika tujuannya membuka halaman, gunakan kode URL; jika orang perlu membaca kalimat, teks adalah pilihan yang tepat.",
        "Batas utamanya adalah kapasitas. Huruf Bahasa Indonesia memakai huruf Latin biasa sehingga hemat tempat, tetapi emoji dan aksara non-Latin memakan dua sampai empat byte per karakter. Dalam praktiknya, beberapa ratus karakter masih nyaman dipindai; jika konten terlalu panjang, pratinjau akan memberi tahu.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Bengkel menandai peralatan dengan kode berisi nomor seri dan tanggal servis terakhir, tetap terbaca meski di gudang tanpa sinyal.",
        "Guru menyembunyikan jawaban teka-teki di kode pada lembar kerja, jadi siswa baru mengecek saat sudah siap.",
        "Gudang mencetak lokasi rak atau nomor barang sebagai kode teks yang bisa dibaca HP mana pun tanpa aplikasi khusus.",
        "Kartu ucapan hadiah berisi pesan pribadi singkat yang muncul saat penerima memindainya.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Buat sesingkat mungkin. Setiap kalimat tambahan membuat kotak-kotaknya lebih kecil, dan kotak kecil butuh cetakan lebih besar serta cahaya lebih baik.",
        "Jika pratinjau menyebut konten terlalu panjang, atur Koreksi kesalahan ke Standar di bagian Gaya, atau pindahkan teks ke halaman web dan gunakan kode URL.",
        "Jangan pakai kode teks untuk rahasia. Siapa pun yang memindainya bisa membaca setiap karakternya.",
        "Uji dengan iPhone dan HP Android, karena teks biasa ditampilkan berbeda di masing-masing.",
      ],
    },
    faq: [
      {
        q: "Berapa banyak teks yang muat di QR code?",
        a: "Formatnya memungkinkan sekitar 2.300 karakter huruf Latin biasa pada koreksi kesalahan bawaan, tetapi lebih dari beberapa ratus karakter mulai sulit dipindai dengan HP. Emoji dan aksara non-Latin memakan lebih banyak tempat.",
      },
      {
        q: "Apakah membaca teks butuh internet?",
        a: "Tidak. Teks tersimpan di gambar itu sendiri, jadi pemindai mana pun bisa membacanya secara offline.",
      },
      {
        q: "Bisakah memakai baris baru?",
        a: "Bisa. Baris baru tetap tersimpan sebagai bagian teks, meski beberapa aplikasi pemindai menampilkannya sebagai spasi.",
      },
      {
        q: "Kenapa iPhone saya tidak menampilkan teksnya dengan jelas?",
        a: "Aplikasi Kamera iPhone dirancang terutama untuk link dan aksi. Untuk teks biasa, coba Pemindai Kode di Pusat Kontrol atau aplikasi pemindai, yang menampilkan teks lengkap.",
      },
    ],
  },

  wifi: {
    title: "Buat QR Code WiFi",
    subtitle: "Tamu cukup memindai untuk tersambung ke WiFi, tanpa perlu menyebutkan atau mengetik kata sandi.",
    metaTitle: "Buat QR Code WiFi — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code WiFi yang menyambungkan iPhone dan Android ke jaringan Anda dalam sekali pindai. Mendukung WPA/WPA2/WPA3, WEP, dan jaringan tersembunyi. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code WiFi",
      how: [
        "Kode ini menyimpan detail jaringan Anda dalam format singkat yang didukung luas: WIFI:T:WPA;S:WarungKopi;P:kopi-susu-42;;. T adalah jenis keamanan (WPA, WEP, atau nopass untuk jaringan terbuka), S adalah nama jaringan, dan P kata sandinya. Untuk jaringan tersembunyi, ditambahkan H:true;. Karakter yang punya arti khusus dalam format ini, seperti titik koma, titik dua, koma, tanda kutip, atau garis miring terbalik, di-escape dengan garis miring terbalik, sehingga kata sandi yang memuatnya tetap berfungsi.",
        "Di iPhone (iOS 11 ke atas), mengarahkan aplikasi Kamera ke kode memunculkan pertanyaan “Gabung ke jaringan”. Sebagian besar HP Android sejak Android 10 menawarkan hal yang sama lewat kamera, Google Lens, atau layar pengaturan WiFi yang punya tombol pindai QR sendiri. HP langsung tersambung; tidak perlu aplikasi atau internet untuk membaca kodenya.",
        "Opsi WPA mencakup jaringan WPA, WPA2, dan WPA3. Pilih WEP hanya untuk router yang sangat lama.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Papan meja di kafe membuat tamu bisa tersambung sambil menunggu pesanan, dan kasir tidak perlu lagi mengeja kata sandi berulang kali.",
        "Villa atau homestay memasang kode dalam bingkai di dekat pintu, jadi tamu baru bisa online meski pemilik sulit dihubungi.",
        "Ruang rapat menampilkan kode jaringan tamu di dinding untuk pengunjung yang membawa laptop dan HP sendiri.",
        "Di rumah, kode yang ditempel di kulkas menghemat waktu mencari stiker router setiap kali saudara atau teman datang.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Saat Anda mengganti kata sandi WiFi, kode yang sudah dicetak tidak berfungsi lagi. Buat kode baru dan ganti cetakan lama sekaligus.",
        "Gunakan jaringan tamu terpisah jika router Anda mendukungnya. Siapa pun yang memotret kode bisa membaca kata sandinya.",
        "Ketik nama jaringan persis seperti yang tampil, termasuk huruf besar dan akhiran seperti _5G. Nama jaringan membedakan huruf besar dan kecil.",
        "Lembar cetak menambahkan judul “Sambungkan ke WiFi” dan nama jaringan, jadi orang yang tidak bisa memindai tetap bisa mengetiknya.",
      ],
    },
    faq: [
      {
        q: "Apakah QR code WiFi bisa di iPhone?",
        a: "Bisa. Sejak iOS 11, aplikasi Kamera bawaan mengenali kode WiFi dan menampilkan ajakan untuk bergabung ke jaringan.",
      },
      {
        q: "Bisakah kata sandi diganti tanpa mencetak ulang?",
        a: "Tidak. Kata sandi tersimpan di dalam kode yang statis. Setelah kata sandi diganti, Anda perlu membuat dan mencetak kode baru.",
      },
      {
        q: "Apakah kata sandi WiFi saya disimpan di server Anda?",
        a: "Kode dibuat di browser Anda. Saat Anda menyimpan, menyalin, atau mencetak, data yang dimasukkan dapat dicatat sesuai Kebijakan Privasi, tetapi kata sandi WiFi selalu disamarkan sebelum disimpan.",
      },
      {
        q: "Apakah bisa untuk jaringan tersembunyi?",
        a: "Bisa. Centang Jaringan tersembunyi, dan kode memberi tahu HP untuk mencari jaringan yang tidak menyiarkan namanya. Dukungan di HP lama kurang konsisten, jadi uji terlebih dahulu.",
      },
      {
        q: "Apakah bisa untuk WiFi hotel yang punya halaman login?",
        a: "Kode menyambungkan HP ke jaringan, tetapi halaman masuk yang muncul setelahnya tetap harus diisi manual.",
      },
    ],
  },

  vcard: {
    title: "Buat QR Code Kartu Nama (vCard)",
    subtitle: "Simpan detail kontak Anda di QR code yang langsung masuk ke buku telepon HP.",
    metaTitle: "Buat QR Code Kartu Nama (vCard) — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code kartu nama vCard berisi nama, nomor HP, email, perusahaan, dan situs web. Sekali pindai, kontak tersimpan di iPhone atau Android. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code vCard",
      how: [
        "Kode ini berisi kartu kontak dalam format vCard 3.0, format yang sudah puluhan tahun dipakai buku alamat. Contoh singkatnya: BEGIN:VCARD, VERSION:3.0, N:Santoso;Budi;;;, ORG:PT Maju Jaya, TITLE:Manajer, TEL;TYPE=CELL:+6281234567890, EMAIL:budi@example.com, END:VCARD, masing-masing di barisnya sendiri. Telepon kantor, situs web, alamat, dan catatan hanya ditambahkan jika Anda mengisinya.",
        "Memindainya dengan aplikasi Kamera iPhone atau sebagian besar kamera Android menampilkan pratinjau kontak dengan tombol untuk menyimpan. Orang itu bisa memeriksa dan mengubah detailnya sebelum menyimpan. Tidak perlu internet, karena seluruh kartu ada di dalam kode.",
        "Setiap kolom menambah karakter, dan karakter menambah kotak. Kartu berisi nama, HP, dan email tetap ringkas; menambahkan alamat panjang dan catatan bisa membuat kode dua kali lebih rapat.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Kartu nama memuat kode di bagian belakang, sehingga kontak baru masuk ke HP dengan ejaan nama yang benar dan nomor yang sudah rapi.",
        "Name tag seminar atau pameran memuat kode vCard, lebih cepat daripada bertukar kartu lalu mengetik ulang setelah acara.",
        "Agen properti menaruh kode di papan “Dijual” dan brosur agar calon pembeli bisa menyimpan nomornya sambil berdiri di depan rumah.",
        "Meja resepsionis menyediakan kode untuk nomor layanan di luar jam kerja, supaya tamu menyimpannya sebelum pulang.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Semakin sedikit kolom, semakin renggang kodenya. Di kartu nama kecil, nama, HP, email, dan situs web biasanya sudah cukup.",
        "Tulis nomor dengan kode negara, seperti +62 812-3456-7890, agar bisa langsung ditelepon oleh kontak dari luar negeri.",
        "Biarkan catatan singkat atau kosong. Kolom inilah yang paling sering membuat kode terlalu rapat untuk dipindai di kartu nama.",
        "Simpan kontak dari kode Anda sendiri di iPhone dan HP Android, lalu pastikan nama dan nomor masuk ke kolom yang tepat.",
      ],
    },
    faq: [
      {
        q: "Apakah kontak tersimpan otomatis?",
        a: "Tidak. HP menampilkan pratinjau dan orang itu mengetuk untuk menyimpan. Tidak ada yang tersimpan tanpa persetujuannya.",
      },
      {
        q: "Bagaimana jika nomor atau jabatan saya berubah?",
        a: "Detailnya terkunci di dalam kode. Buat kode baru dan perbarui kartu cetak Anda.",
      },
      {
        q: "Bisakah saya menambahkan foto ke vCard?",
        a: "Tidak di sini. Foto terlalu besar untuk QR code. Gunakan kolom teks saja.",
      },
      {
        q: "Apakah bisa di iPhone dan Android?",
        a: "Bisa. vCard 3.0 didukung aplikasi Kamera iPhone dan sebagian besar aplikasi kamera serta pemindai Android, termasuk Google Lens.",
      },
    ],
  },

  email: {
    title: "Buat QR Code Email",
    subtitle: "Buka email baru dengan alamat, subjek, dan pesan yang sudah terisi.",
    metaTitle: "Buat QR Code Email — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code email yang membuka pesan baru dengan penerima, subjek, dan isi yang sudah terisi. Cocok untuk masukan, layanan pelanggan, dan pendaftaran. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code email",
      how: [
        "Kode ini berisi link mailto: standar. Penerima ditulis lebih dulu, lalu subjek dan pesan sebagai teks yang di-encode: mailto:support@example.com?subject=Pertanyaan%20pesanan&body=Halo%2C%20nomor%20pesanan%20saya. Spasi menjadi %20 supaya semua aplikasi email membacanya dengan cara yang sama.",
        "Saat dipindai, HP membuka aplikasi email bawaannya, seperti Mail di iPhone atau Gmail di Android, dengan draf baru yang siap. Orang itu bisa mengubah bagian mana pun dan memutuskan kapan mengirim. Jika di HP belum ada aplikasi email yang diatur, sistem mungkin menanyakan aplikasi mana yang dipakai atau tidak menampilkan apa-apa, jadi pertimbangkan ini jika audiens Anda lebih sering memakai email lewat browser.",
        "Hanya kolom Kepada yang wajib. Subjek dan pesan bersifat opsional, tetapi menghemat waktu pengirim dan membuat email masuk lebih mudah dipilah.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Kartu di kamar hotel membuka email ke resepsionis dengan subjek “Permintaan kamar”, jadi staf bisa cepat meneruskannya.",
        "Buku panduan produk memuat kode layanan pelanggan yang mengisi nama model di subjek.",
        "Meja pameran mengajak pengunjung memindai dan mengirim email satu baris untuk bergabung dengan milis, sekaligus menyimpan salinan permintaannya.",
        "Sekolah memakai kode di surat edaran agar orang tua bisa membalas soal kehadiran, dengan nama kelas di subjek.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Gunakan subjek yang mudah dikenali kembali di folder terkirim, seperti nama acara atau tipe produk.",
        "Tulis isi pesan sebagai pancingan yang dilengkapi pengirim, misalnya “Nomor pesanan saya:”, bukan pesan panjang yang sudah jadi.",
        "Pakai alamat email yang akan Anda pertahankan. Alamat pribadi yang mungkin berganti kurang cocok untuk materi cetak.",
        "Pindai kode di HP yang memakai aplikasi email berbeda dari milik Anda untuk memastikan subjek dan isi tetap utuh.",
      ],
    },
    faq: [
      {
        q: "Apakah memindai langsung mengirim email?",
        a: "Tidak. Kode hanya membuka draf. Orang itu memeriksanya dan menekan kirim sendiri.",
      },
      {
        q: "Bisakah saya menambahkan lampiran?",
        a: "Tidak. Format mailto: tidak mendukung lampiran. Anda bisa menyertakan link ke file di isi pesan.",
      },
      {
        q: "Aplikasi email mana yang terbuka?",
        a: "Aplikasi email bawaan di HP tersebut, biasanya Mail di iPhone dan Gmail di sebagian besar HP Android.",
      },
      {
        q: "Bisakah memakai karakter khusus di subjek?",
        a: "Bisa. Huruf beraksen, tanda baca, dan aksara lain di-encode agar tampil benar di aplikasi email.",
      },
    ],
  },

  sms: {
    title: "Buat QR Code SMS",
    subtitle: "Buka SMS ke nomor Anda dengan pesan yang sudah terketik.",
    metaTitle: "Buat QR Code SMS — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code SMS yang membuka pesan baru dengan nomor dan isi yang sudah terisi. Berguna untuk pendaftaran, reservasi, dan balasan kata kunci. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code SMS",
      how: [
        "Kode ini memakai format SMSTO yang dikenali luas oleh pemindai HP: SMSTO:+6281234567890:DAFTAR. Nomor dibersihkan menjadi angka dan tanda plus di depan, lalu pesan ditulis setelah titik dua kedua persis seperti yang Anda ketik.",
        "Saat dipindai, aplikasi Kamera iPhone dan sebagian besar kamera Android membuka aplikasi Pesan dengan nomor di kolom penerima dan teks di kolom pesan. Mengirim selalu menjadi pilihan orang itu. Tarif SMS biasa dari operatornya berlaku, yang perlu diperhatikan jika audiens Anda sedang di luar negeri.",
        "Karena pesan terkirim sebagai SMS biasa, cara ini bekerja di HP mana pun yang punya pulsa, tanpa aplikasi atau kuota data. Cocok untuk balasan kata kunci singkat, seperti DAFTAR, STOP, atau kode booking, yang bisa dibaca sistem otomatis.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Papan di kasir toko mengajak pelanggan mengirim kata kunci untuk bergabung dengan daftar promo, lebih cepat daripada mengisi formulir.",
        "Area parkir memasang kode yang mengirim nomor slot ke pengelola, jadi pengemudi tidak perlu mengingatnya.",
        "Acara amal menampilkan kode yang memulai SMS donasi dengan kata kunci kampanye yang sudah tertulis.",
        "Jasa servis AC memasang kode di mobilnya agar orang bisa SMS minta ditelepon balik dengan kata “Survei”.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Sertakan kode negara di nomor jika ada kemungkinan orang dari luar negeri memindai kodenya.",
        "Batasi pesan pada satu kata kunci atau satu kalimat pendek. Pesan panjang membuat kode lebih rapat dan lebih mudah teredit tanpa sengaja.",
        "Jika Anda menjalankan layanan berlangganan lewat SMS, pastikan penyedia layanan SMS Anda sudah memproses kata kunci yang dicetak sebelum materi disebar.",
        "Uji di iPhone dan Android. Beberapa aplikasi pemindai lama membuka Pesan dengan nomornya saja tanpa isi.",
      ],
    },
    faq: [
      {
        q: "Apakah SMS terkirim otomatis saat dipindai?",
        a: "Tidak. HP hanya menyiapkan pesannya. Orang itu harus menekan kirim.",
      },
      {
        q: "Apakah bisa di iPhone?",
        a: "Bisa. Aplikasi Kamera iPhone mengenali kode SMSTO dan membuka Pesan dengan nomor dan teks yang sudah terisi.",
      },
      {
        q: "Bisakah dikirim ke lebih dari satu nomor?",
        a: "Tidak. Kode SMS ditujukan ke satu nomor. Untuk pesan grup, pertimbangkan kode WhatsApp atau email.",
      },
      {
        q: "Apakah bisa tanpa kuota data?",
        a: "Membaca kode tidak butuh koneksi, dan SMS dikirim lewat jaringan seluler biasa, jadi kuota data tidak diperlukan.",
      },
    ],
  },

  phone: {
    title: "Buat QR Code Nomor Telepon",
    subtitle: "Orang cukup memindai untuk menelepon Anda, tanpa mengetik nomor.",
    metaTitle: "Buat QR Code Nomor Telepon — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code nomor telepon yang membuka layar panggilan dengan nomor Anda siap ditelepon. Cocok untuk papan nama, kendaraan, dan brosur. Statis, gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code nomor telepon",
      how: [
        "Kode ini berisi link tel:, sama seperti tombol “Hubungi kami” di situs web: tel:+6281234567890. Spasi, tanda hubung, dan kurung dihapus; hanya angka dan tanda plus di depan yang dipertahankan.",
        "Saat dipindai, HP menampilkan nomornya dan menawarkan untuk menelepon. Di iPhone, aplikasi Kamera menampilkan banner; di Android, kamera atau Google Lens menampilkan tombol panggil. HP tidak pernah menelepon sendiri; orang itu selalu mengonfirmasi. Kode ini termasuk yang paling kecil, jadi tetap mudah dipindai meski dicetak kecil.",
        "Karena hanya angka dan tanda plus yang disimpan, nomor ekstensi dan jeda yang ditulis dengan koma atau “ext.” ikut terbuang. Jika penelepon perlu ekstensi, cetak di samping kode.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Mobil jasa sedot WC atau servis AC memasang kode besar di sisi kendaraan, sehingga orang yang terjebak macet di belakangnya bisa menyimpan nomor tanpa mencatat.",
        "Tulisan “Dijual” di kaca mobil atau motor membuka panggilan ke penjual, lebih aman daripada memicingkan mata membaca nomor sambil lewat.",
        "Kartu janji temu di klinik mengarah ke nomor pendaftaran, mengurangi salah sambung.",
        "Gedung apartemen memasang nomor darurat pengelola sebagai kode di lobi.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Tulis nomor dalam format internasional, diawali + dan kode negara (+62), agar berfungsi juga untuk wisatawan dan HP yang sedang roaming.",
        "Cetak juga nomornya sebagai teks di samping kode. Sebagian orang lebih suka menekan nomor sendiri, dan ini membantu yang tidak bisa memindai.",
        "Untuk kendaraan dan papan luar ruangan, sesuaikan ukuran kode dengan jarak pandang: kira-kira sepersepuluh jaraknya, jadi 30 cm untuk orang yang berjarak 3 m.",
        "Gunakan file SVG untuk stiker cutting dan papan besar agar tepinya tetap tajam.",
      ],
    },
    faq: [
      {
        q: "Apakah HP langsung menelepon saat dipindai?",
        a: "Tidak. HP menampilkan nomornya dan orang itu mengetuk untuk menelepon.",
      },
      {
        q: "Bisakah saya menyertakan nomor ekstensi?",
        a: "Tidak di dalam kode. Ekstensi dihapus saat nomor dibersihkan, jadi cetak ekstensinya sebagai teks di samping kode.",
      },
      {
        q: "Apakah bisa untuk telepon rumah dan nomor bebas pulsa?",
        a: "Bisa. Nomor apa pun yang bisa ditelepon dari HP bisa dipakai, termasuk nomor bebas pulsa 0800, selama operator penelepon mengizinkannya.",
      },
      {
        q: "Bagaimana jika nomor saya berubah?",
        a: "Nomor tersimpan di dalam kode, jadi Anda perlu kode baru dan cetakan baru.",
      },
    ],
  },

  geo: {
    title: "Buat QR Code Lokasi",
    subtitle: "Arahkan orang ke titik yang tepat di peta dengan kode berisi koordinat.",
    metaTitle: "Buat QR Code Lokasi — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code lokasi dari lintang dan bujur yang membuka aplikasi peta tepat di titiknya. Cocok untuk pintu masuk, tempat acara, dan lokasi tanpa alamat. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code lokasi",
      how: [
        "Kode ini berisi link geo: dengan dua angka, lintang dan bujur, dipisahkan koma: geo:-6.175392,106.827153 (Monas, Jakarta). Lintang harus antara -90 dan 90, bujur antara -180 dan 180. Anda bisa mengetiknya atau menekan tombol Pakai lokasi saya saat berada di titik tersebut.",
        "Di Android, memindai biasanya membuka Google Maps atau aplikasi peta lain dengan penanda di koordinat itu, siap untuk petunjuk arah. Dukungan iPhone untuk link geo: kurang konsisten; tergantung versi iOS dan aplikasi pemindai, bisa membuka Apple Maps atau hanya menampilkan koordinatnya. Jika sebagian besar pengunjung Anda memakai iPhone, kode URL berisi link berbagi Google Maps atau Apple Maps bisa jadi pilihan yang lebih andal.",
        "Koordinat menunjuk posisi, bukan profil usaha. Justru itu kelebihannya: bisa dipakai untuk tempat tanpa alamat, seperti gerbang samping, area parkir, atau titik kumpul di taman.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Undangan pernikahan memuat kode untuk pintu masuk gedung yang tepat, padahal peta sering menunjuk sisi yang salah dari kompleks yang luas.",
        "Papan di jalur pendakian mengarah ke koordinat area parkir, berguna saat tidak ada alamat jalan.",
        "Surat jalan ke gudang mengarahkan sopir ke dok bongkar muat yang benar, bukan pintu utama.",
        "Peta festival menandai posko kesehatan atau pusat informasi dengan kode untuk orang yang kebingungan arah.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Untuk mendapatkan koordinat, tekan lama atau klik kanan titiknya di Google Maps lalu salin dua angka yang muncul.",
        "Lima angka desimal sudah akurat sampai sekitar satu meter, lebih dari cukup. Angka tambahan hanya membuat kode lebih rapat.",
        "Perhatikan tanda minus. Sebagian besar wilayah Indonesia berada di selatan khatulistiwa sehingga lintangnya negatif, misalnya -6,2 untuk Jakarta; Medan dan Aceh di utara khatulistiwa bernilai positif.",
        "Pindai kode di iPhone dan HP Android sebelum mencetak, karena aplikasi peta menanganinya secara berbeda.",
      ],
    },
    faq: [
      {
        q: "Apakah QR code lokasi bisa di iPhone?",
        a: "Kadang-kadang. Android menangani link geo: dengan baik, sementara perilaku iPhone bergantung pada versi iOS dan pemindainya. Uji terlebih dahulu, dan pertimbangkan link berbagi peta dalam kode URL jika pengguna iPhone adalah audiens utama Anda.",
      },
      {
        q: "Bisakah memakai alamat, bukan koordinat?",
        a: "Jenis ini hanya memakai koordinat. Untuk alamat, buka di aplikasi peta, salin link berbaginya, lalu gunakan jenis URL.",
      },
      {
        q: "Apakah memindai butuh internet?",
        a: "Membaca koordinat tidak. Menampilkan peta dan petunjuk arah butuh, kecuali aplikasi peta sudah mengunduh peta offline.",
      },
      {
        q: "Apakah lokasi saya dibagikan ke orang lain?",
        a: "Tidak. Kode hanya berisi koordinat yang Anda masukkan. Pakai lokasi saya hanya membaca posisi Anda di browser untuk mengisi kolom.",
      },
    ],
  },

  event: {
    title: "Buat QR Code Acara Kalender",
    subtitle: "Tambahkan acara Anda ke kalender orang lain dengan sekali pindai, lengkap dengan waktu, tempat, dan detailnya.",
    metaTitle: "Buat QR Code Acara Kalender — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code acara berisi nama, tanggal, jam, lokasi, dan catatan. Sekali pindai, acara masuk ke kalender HP dengan zona waktu yang tepat. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code acara kalender",
      how: [
        "Kode ini berisi acara iCalendar, format yang sama dengan undangan kalender: BEGIN:VEVENT, SUMMARY:Peluncuran produk, DTSTART:20261015T100000Z, DTEND:20261015T113000Z, LOCATION:Ruang 3, END:VEVENT. Waktu dikonversi dari zona waktu perangkat Anda ke UTC, ditandai dengan Z, sehingga setiap HP menampilkan acara dalam waktu setempat. Pada contoh ini, 17.00 WIB menjadi 10.00 UTC.",
        "Untuk acara seharian, tanggal ditulis tanpa jam, seperti DTSTART;VALUE=DATE:20261015. Tanggal selesai dalam format ini bersifat eksklusif, jadi acara satu hari pada 15 Oktober berakhir 16 Oktober di dalam kode; memang begitu yang diharapkan kalender, dan tetap tampil sebagai satu hari.",
        "Di iPhone, aplikasi Kamera mengenali acara dan menawarkan untuk menambahkannya ke Kalender. Di Android, dukungannya bergantung pada pemindai: Google Lens dan banyak aplikasi kamera menampilkan opsi tambah ke kalender, sementara beberapa yang lama hanya menampilkan teks mentahnya.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Poster konser memuat kode yang menyimpan tanggal dan tempat, jadi orang yang lewat tidak perlu mengingatnya.",
        "Surat edaran sekolah menambahkan kode untuk rapat orang tua, langsung memasukkan jam dan ruangannya ke kalender.",
        "Name tag seminar mencantumkan kode untuk setiap sesi workshop, masing-masing dengan ruangannya di kolom lokasi.",
        "Klinik mencetak jadwal kontrol berikutnya sebagai kode di kartu pengingat.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Periksa zona waktu perangkat Anda sebelum membuat kode. Jam yang Anda masukkan dibaca sebagai waktu setempat di tempat Anda, lalu disimpan dalam UTC.",
        "Isi Lokasi dengan nama ruangan atau alamat lengkap; banyak kalender mengubahnya menjadi link peta.",
        "Buat deskripsi singkat. Catatan praktis seperti “Harap bawa laptop” cocok; susunan acara lengkap membuat kode terlalu rapat.",
        "Tambahkan acara dari kode Anda sendiri dan pastikan tanggal, jam, dan durasinya benar sebelum mencetak.",
      ],
    },
    faq: [
      {
        q: "Apakah jamnya tepat untuk orang di zona waktu lain?",
        a: "Ya. Waktu disimpan dalam UTC, jadi setiap kalender menampilkannya dalam waktu setempat. Acara pukul 19.00 WIB di Jakarta tampil pukul 20.00 WITA di Makassar.",
      },
      {
        q: "Bisakah acara diubah setelah dicetak?",
        a: "Tidak. Detailnya ada di dalam kode. Jika waktu atau tempat berubah, buat dan cetak kode baru.",
      },
      {
        q: "Bisakah membuat acara berulang?",
        a: "Tidak dengan generator ini. Setiap kode menggambarkan satu acara.",
      },
      {
        q: "Apakah acara ditambahkan otomatis?",
        a: "Tidak. HP menampilkan acaranya dan orang itu memilih untuk menambahkannya ke kalender.",
      },
    ],
  },

  payment: {
    title: "Buat QR Code Link Pembayaran (PayPal)",
    subtitle: "Terima pembayaran lewat pindai dengan kode yang membuka halaman PayPal.Me, Ko-fi, atau halaman tip Anda.",
    metaTitle: "Buat QR Code Link Pembayaran PayPal — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code untuk PayPal.Me, Ko-fi, Buy Me a Coffee, Patreon, Wise, dan lainnya. Ini link pembayaran, bukan QRIS. Gratis dan tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code link pembayaran",
      how: [
        "Penting untuk diketahui dulu: kode ini bukan QRIS. Kode ini tidak bisa dipindai sebagai pembayaran oleh aplikasi m-banking atau e-wallet seperti GoPay, OVO, DANA, atau ShopeePay. Untuk menerima pembayaran QRIS, gunakan QRIS resmi dari bank atau penyedia pembayaran Anda. Jenis ini hanya membuat kode berisi link ke halaman pembayaran layanan internasional.",
        "Kode berisi link pembayaran publik akun Anda. Pilih layanan dan ketik nama pengguna, lalu link-nya dibuat otomatis. Dengan nominal, PayPal menjadi https://paypal.me/namaanda/25.00, Venmo menjadi https://venmo.com/u/namaanda?txn=pay&amount=25.00, dan Cash App menjadi https://cash.app/$tagAnda/25.00. Link Buy Me a Coffee, Ko-fi, Patreon, Revolut.Me, dan Wise membuka halaman Anda tanpa nominal.",
        "Memindai kode membuka link di aplikasi pembayaran jika terpasang, atau di browser jika tidak. Pembayar masuk ke akunnya sendiri, memeriksa penerima dan nominal, lalu mengonfirmasi. Kode tidak berisi data kartu atau rekening bank, hanya alamat halaman publik Anda. Situs ini tidak memproses pembayaran, tidak memotong biaya, dan tidak melihat transaksi.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Kreator konten atau ilustrator menaruh kode Ko-fi atau Buy Me a Coffee di akhir video atau di zine cetak untuk dukungan dari penggemar luar negeri.",
        "Freelancer yang punya klien internasional menambahkan kode PayPal.Me di bagian bawah invoice cetak.",
        "Pemandu wisata yang sering melayani turis asing menunjukkan kode PayPal atau Wise untuk pembayaran atau tip.",
        "Penulis atau musisi independen mencetak kode Patreon di merchandise agar pendukung bisa berlangganan.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Untuk pelanggan lokal yang membayar dengan Rupiah lewat e-wallet atau m-banking, gunakan QRIS dari bank atau penyedia pembayaran Anda, bukan kode ini.",
        "Nominal bersifat opsional. Kosongkan untuk tip dan donasi agar pembayar memilih sendiri; isi untuk harga tetap.",
        "Nominal ditulis dengan angka dan maksimal dua desimal, seperti 12.50. Mata uangnya mengikuti pengaturan akun Anda, bukan kode.",
        "Buka sendiri link di baris hasil dan pastikan nama serta foto Anda yang muncul. Salah ketik nama pengguna bisa mengirim uang ke orang asing.",
        "Venmo dan Cash App hanya untuk akun Amerika Serikat, dan layanan lain punya batasan negaranya sendiri. Pastikan layanan yang Anda pilih tersedia untuk Anda dan pembayar.",
      ],
    },
    faq: [
      {
        q: "Apakah ini bisa dipakai sebagai QRIS?",
        a: "Tidak. Kode ini hanya berisi link ke halaman PayPal, Ko-fi, dan layanan sejenis. Aplikasi m-banking dan e-wallet tidak akan mengenalinya sebagai tagihan QRIS. Untuk QRIS, daftarkan usaha Anda ke bank atau penyedia pembayaran resmi.",
      },
      {
        q: "Apakah aman menampilkan QR code pembayaran di tempat umum?",
        a: "Kode hanya berisi halaman pembayaran publik Anda, sama seperti link yang Anda bagikan lewat chat. Kode ini tidak bisa dipakai untuk mengambil uang dari Anda.",
      },
      {
        q: "Bisakah nominal diubah nanti?",
        a: "Nominal adalah bagian dari kode. Untuk mengubahnya, buat kode baru. Jika harga sering berubah, kosongkan nominalnya.",
      },
      {
        q: "Kenapa saya tidak bisa mengisi nominal untuk Ko-fi atau Patreon?",
        a: "Link publik mereka tidak menerima nominal yang diisi otomatis, jadi pembayar memilihnya di halaman tersebut.",
      },
      {
        q: "Apakah situs ini memotong pembayaran?",
        a: "Tidak. Kode hanya membuka halaman pembayaran Anda. Biaya, jika ada, berasal dari PayPal atau layanan lain yang Anda pakai.",
      },
    ],
  },

  crypto: {
    title: "Buat QR Code Bitcoin & Kripto",
    subtitle: "Bagikan alamat dompet sebagai QR code yang mengisi alamat dan nominal di aplikasi dompet.",
    metaTitle: "Buat QR Code Bitcoin & Kripto — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code Bitcoin, Ethereum, Litecoin, Dogecoin, Bitcoin Cash, atau Solana berisi alamat dompet dan nominal opsional. Statis, gratis, dan tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code kripto",
      how: [
        "Kode ini berisi URI pembayaran yang dipahami aplikasi dompet. Untuk Bitcoin, formatnya mengikuti BIP-21: bitcoin:bc1qexampleaddress?amount=0.0015&label=Donasi%20komunitas. Skema menyebut nama koin, diikuti alamat Anda dan, opsional, nominal dalam satuan koin serta label singkat maksimal 60 karakter. Litecoin, Dogecoin, Bitcoin Cash, dan Solana memakai pola yang sama dengan skemanya masing-masing.",
        "Untuk Ethereum, kode hanya berisi ethereum: dan alamatnya. Dompet menangani nominal Ethereum dengan cara berbeda-beda, jadi nominal dibiarkan untuk diketik pengirim.",
        "Kode ini dimaksudkan untuk dipindai dari dalam aplikasi dompet, lewat tombol pindai atau kirim. Kamera HP juga bisa mengenalinya dan menawarkan membuka dompet yang terpasang. Dompet lalu menampilkan alamat dan nominal untuk diperiksa; tidak ada yang terkirim sebelum pengirim mengonfirmasi.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Kreator menambahkan kode donasi untuk dompet Solana atau Litecoin di akhir video atau di zine cetak.",
        "Komunitas atau acara meetup kripto menampilkan kode untuk menerima donasi dari peserta.",
        "Seseorang yang menerima transfer kripto dari teman menunjukkan kode di layar, alih-alih mengirim alamat panjang lewat chat.",
        "Pengembang open source mencantumkan kode alamat Bitcoin di halaman proyek atau slide presentasinya.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Di Indonesia, kripto diakui sebagai aset yang bisa diperdagangkan, bukan alat pembayaran yang sah. Untuk jual beli barang dan jasa, gunakan Rupiah; kode ini lebih cocok untuk donasi atau transfer antarpribadi.",
        "Periksa alamat karakter demi karakter dengan yang ada di dompet Anda. Transfer kripto tidak bisa dibatalkan, dan alamat yang salah berarti dana hilang.",
        "Pastikan koin sesuai dengan dompetnya. Mengirim satu koin ke alamat jaringan lain bisa membuat dana hilang.",
        "Nominal ditulis dalam satuan koin, bukan Rupiah, maksimal delapan desimal. Karena harga terus bergerak, kosongkan nominal untuk materi cetak yang dipakai lama.",
        "Pertimbangkan alamat penerima khusus. Siapa pun yang memindai kode publik bisa melihat riwayat alamat itu di blockchain.",
      ],
    },
    faq: [
      {
        q: "Apakah aman membagikan QR code dompet saya?",
        a: "Membagikan alamat penerima itu hal biasa dan tidak memungkinkan orang lain mengambil dana dari dompet. Jangan pernah memasukkan private key atau frasa pemulihan (seed phrase) ke QR code.",
      },
      {
        q: "Kenapa tidak ada opsi nominal untuk Ethereum?",
        a: "Dompet Ethereum menafsirkan nominal di link pembayaran secara berbeda-beda, jadi untuk menghindari salah kirim, kode hanya berisi alamat.",
      },
      {
        q: "Bisakah menerima token seperti USDT?",
        a: "Token di jaringan lain butuh pengaturan dompet dan jaringannya sendiri. Generator ini mencakup enam koin asli yang tercantum.",
      },
      {
        q: "Dompet apa saja yang bisa membaca kodenya?",
        a: "Sebagian besar dompet populer membaca format pembayaran ala bitcoin:. Jika dompet mengabaikan nominal atau label, alamatnya tetap berfungsi.",
      },
    ],
  },

  file: {
    title: "Buat QR Code PDF & File",
    subtitle: "Hubungkan QR code ke PDF atau file lain yang Anda bagikan dari Google Drive, Dropbox, atau situs Anda.",
    metaTitle: "Buat QR Code PDF — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code yang membuka PDF, menu, brosur, atau buku panduan di Google Drive, Dropbox, atau situs Anda. Statis, tidak kedaluwarsa, gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code PDF",
      how: [
        "QR code tidak bisa memuat seluruh PDF; dokumen pendek pun jauh lebih besar dari beberapa kilobyte yang bisa disimpan kode. Sebagai gantinya, kode berisi link ke tempat file disimpan, seperti https://drive.google.com/file/d/1AbC…/view. Situs ini tidak mengunggah atau menyimpan file, jadi langkah pertama adalah menaruh PDF Anda di internet.",
        "Unggah ke Google Drive, Dropbox, OneDrive, atau situs Anda sendiri, lalu salin link berbaginya dan atur aksesnya ke “siapa saja yang memiliki link”. Tempel link itu di sini. Saat seseorang memindai, HP-nya membuka link di browser, tempat PDF bisa dilihat atau diunduh.",
        "Kode tetap berfungsi selama link-nya aktif. Jika file dihapus, dipindah ke link baru, atau dijadikan privat, orang akan melihat pesan galat atau halaman login.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Restoran menghubungkan kode ke PDF menu, lalu memperbarui file setiap ganti harga tanpa mengganti kartu meja.",
        "Kemasan produk memuat kode ke buku panduan lengkap, jadi lembar cetak cukup berisi petunjuk keselamatan.",
        "Papan “Dijual” rumah membuka denah dan brosur bagi siapa saja yang lewat.",
        "Seminar membagikan satu kode untuk materi presentasi dan handout setelah sesi.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Uji link di jendela browser privat (incognito) yang tidak login. Jika di sana diminta login, pengaturan berbaginya salah.",
        "Untuk memperbarui file tanpa mengganti link, timpa file yang ada, jangan unggah salinan baru. Opsi Kelola versi di Google Drive mempertahankan link yang sama.",
        "Hindari link yang bisa kedaluwarsa, seperti link unduhan sementara dari beberapa layanan kirim file.",
        "Jaga ukuran PDF tetap wajar dan mudah dibaca di layar HP. Hasil scan 50 MB lambat dibuka dengan kuota data.",
      ],
    },
    faq: [
      {
        q: "Bisakah saya mengunggah PDF di sini?",
        a: "Tidak. Situs ini hanya membuat kodenya. Simpan file di Google Drive, Dropbox, atau situs Anda, lalu tempel link berbaginya.",
      },
      {
        q: "Kenapa orang melihat “Minta akses” saat memindai?",
        a: "File belum dibagikan secara publik. Ubah pengaturan berbaginya menjadi “siapa saja yang memiliki link dapat melihat”.",
      },
      {
        q: "Bisakah PDF diganti setelah kode dicetak?",
        a: "Bisa, selama link-nya tetap sama. Ganti isi file di alamat yang sama; mengunggah salinan baru akan membuat link baru.",
      },
      {
        q: "Apakah bisa untuk file selain PDF?",
        a: "Bisa. File apa pun yang punya link berbagi bisa dipakai, termasuk gambar, presentasi, dan audio. Apakah bisa dipratinjau di HP tergantung jenis filenya.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  pix: {
    title: "Pix QR Code Generator",
    subtitle: "Make a static Pix code with your Pix key, name and an optional amount that any Brazilian bank app can pay in one scan.",
    metaTitle: "Pix QR Code Generator — Static BR Code, Free, No Sign-up",
    metaDescription:
      "Create a static Pix QR code (BR Code) from your Pix key, name, city and an optional amount. Follows the Banco Central standard, made in your browser. Free, no sign-up.",
    sections: {
      howTitle: "How a Pix QR code works",
      how: [
        "The code holds a BR Code: the text format defined by the Banco Central do Brasil for Pix, built on the EMV standard for merchant-presented QR codes. Every item is written as an id, a two-digit length and the value. The merchant account block carries the identifier br.gov.bcb.pix and your Pix key; then come the merchant category 0000, the currency 986 for the real, the optional amount, the country BR, your name (up to 25 letters), your city (up to 15) and the transaction id. A CRC-16 checksum closes the string, so a damaged or edited code is rejected by the bank app rather than paid to the wrong person.",
        "This is a static code, the same kind a bank gives you to print at the till. It does not call an API or a payment service, so the transaction id is set to *** when you leave it empty, exactly as the Banco Central manual shows for static codes. If you type one (letters and digits, up to 25), it travels with the payment and appears in your statement, which helps with reconciliation.",
        "The payer opens their bank or wallet app (Nubank, Itaú, Bradesco, Caixa, PicPay, Mercado Pago and every other Pix participant), chooses Pix and scans. The app looks up the key in the central directory and shows the account holder's registered name, not the name in the code, so the payer can confirm who receives the money. With an amount in the code it is filled in; without one, the payer types it. The same string is also the Pix copia e cola text shown under the form, which you can paste into a message.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A street vendor or market stall prints a code with no amount, so each customer scans and types what they owe.",
        "A small shop puts a code with a fixed price next to a product, for example a R$ 25.00 lunch plate.",
        "A condominium or club sends a code with the monthly fee and a transaction id such as COTA2026MAR, so payments are easy to match.",
        "A church, school fair or charity shows a donation code on a poster or on the screen of a live stream.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Phone keys must start with +55, for example +5511912345678. Eleven plain digits are read as a CPF, which is a different key.",
        "Keep the name and city short and without accents. The standard allows 25 and 15 characters, and accents are removed for you; bank apps show the name registered with the key anyway.",
        "Test the code with your own bank app before printing. The app shows the registered name of the key holder; if it is not yours, the key has a typo.",
        "For prices that change, leave the amount empty and write the price next to the code. A code with an amount has to be regenerated every time the price changes.",
      ],
    },
    faq: [
      {
        q: "Is this an official Pix code?",
        a: "It follows the Banco Central do Brasil's BR Code standard for static Pix codes, the same format your bank uses. Any Pix-enabled app reads it. The site is not a payment institution and does not take part in the transfer.",
      },
      {
        q: "Does the code expire?",
        a: "No. A static Pix code works for as long as the key stays registered to your account. If you delete the key or move it to another bank, make a new code.",
      },
      {
        q: "Can I see who paid?",
        a: "Payments arrive in your bank account like any Pix transfer, with the payer's name. Adding a transaction id (txid) to the code helps you tell payments from one code apart from others in your statement.",
      },
      {
        q: "Why does the app show a different name from the one I typed?",
        a: "Bank apps display the name registered with the Pix key in the central directory (DICT) and ignore the name inside the code. The name in the code is still required by the standard, so type yours; the payer will see your registered name.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  upi: {
    title: "UPI QR Code Generator",
    subtitle: "Turn your UPI ID into a payment QR code that PhonePe, Google Pay, Paytm and every other UPI app can scan.",
    metaTitle: "UPI QR Code Generator — Free, No Sign-up",
    metaDescription:
      "Create a UPI payment QR code from your UPI ID and name, with an optional amount and note. Uses the NPCI upi://pay format, made in your browser. Free, no sign-up.",
    sections: {
      howTitle: "How a UPI QR code works",
      how: [
        "The code holds a UPI deep link in the format published by NPCI: upi://pay?pa=yourid@bank&pn=Your%20Name&am=250.00&cu=INR&tn=Table%204. The pa parameter is your UPI ID (also called a VPA), pn is the payee name shown to the payer, am is the optional amount, cu is always INR and tn is an optional note. Spaces and special characters in the name and note are percent-encoded, so the link is one unbroken string.",
        "Every UPI app in India is required to understand this link, so the same code works in PhonePe, Google Pay, Paytm, BHIM, Amazon Pay and bank apps. The payer opens the app, taps Scan, and the app fills in your UPI ID, the name and the amount if one was set. The payer confirms with their UPI PIN and the money moves between bank accounts in seconds.",
        "This is the static, merchant-presented form of the link. Fields used by payment gateways for dynamic codes, such as a transaction reference, merchant code or signature, are left out on purpose. That keeps the code simple and valid for a personal UPI ID; a registered merchant account works too, since the app only needs the ID.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A kirana store or tea stall prints a code with no amount, so customers type what they owe after each sale.",
        "A home baker or tailor shares a code with a fixed price in a WhatsApp message or on a flyer.",
        "A housing society or school collects a fee with a code that has the amount and a note such as Maintenance March.",
        "A temple, NGO or college festival displays a donation code on a banner or on screen at an event.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "Check the UPI ID character by character. Common handles include @okaxis, @oksbi, @ybl, @paytm, @ibl and @upi; a wrong letter sends money to someone else or fails.",
        "Type the payee name as it appears in your bank, so the payer sees a name they recognize. The app shows both this name and the verified account holder name.",
        "Leave the amount empty for shops with varying bills. For fixed charges, fill it in so the payer cannot mistype it.",
        "Scan the finished code with two different UPI apps before printing. If one shows the wrong name or amount, fix it now rather than after a hundred copies.",
      ],
    },
    faq: [
      {
        q: "Will this work with PhonePe, Google Pay and Paytm?",
        a: "Yes. The code uses the standard upi://pay link that NPCI requires every UPI app to support, so it works regardless of which app the payer uses or which bank your UPI ID belongs to.",
      },
      {
        q: "Do I need a merchant account?",
        a: "No. A personal UPI ID works. Merchant codes generated by a payment provider can carry extra fields like a merchant category or a signature; this code is the plain form that needs only your UPI ID and name.",
      },
      {
        q: "Does the site process or see the payments?",
        a: "No. The code only contains the link above. The payment happens entirely inside the payer's UPI app and your bank; nothing passes through this site.",
      },
      {
        q: "Can I set the currency or an amount in paise?",
        a: "The currency is always INR, the only one UPI supports. Amounts use up to two decimal places, for example 99.50, so paise are covered.",
      },
    ],
  },

  // TODO(i18n): localize — temporary English copy
  epc: {
    title: "EPC QR Code (GiroCode) Generator",
    subtitle: "Make a SEPA transfer QR code with your IBAN, name and an optional amount that European banking apps fill in automatically.",
    metaTitle: "EPC QR Code / GiroCode Generator — SEPA Transfer, Free, No Sign-up",
    metaDescription:
      "Create an EPC QR code (GiroCode) for a SEPA credit transfer from your IBAN, name, amount and payment reference. Follows the European Payments Council guideline. Free, no sign-up.",
    sections: {
      howTitle: "How an EPC QR code works",
      how: [
        "The code holds a short text defined by the European Payments Council in its guideline EPC069-12 for SEPA credit transfers. It has up to twelve lines separated by line feeds: BCD, the version 002, the character set 1 for UTF-8, the service SCT, the optional BIC, the recipient's name (up to 70 characters), the IBAN, the amount as EUR12.50, a purpose code that is left empty, either a structured creditor reference or a free-text reference (up to 140 characters), and a note to the payer (up to 70). Empty lines at the end are dropped and the whole payload is kept within 331 bytes, as the guideline requires.",
        "Banking apps in Germany and Austria know this format as GiroCode, in the Netherlands and Belgium as EPC QR, in Finland as the payment QR code; it is also supported in Luxembourg, Italy, Estonia, Latvia and Lithuania. The payer opens the app, chooses to scan or photograph a transfer, and the recipient, IBAN, amount and reference appear in the transfer form. The payer checks the details and approves the transfer as usual.",
        "The IBAN is cleaned and verified before the code is built: spaces are removed, letters are capitalized, the length is checked against the country and the check digits are validated with the mod-97 algorithm. A reference that is a valid ISO 11649 creditor reference (RF followed by check digits) is placed in the structured field automatically; any other text goes into the unstructured field.",
      ],
      usesTitle: "Where it helps",
      uses: [
        "A freelancer or small business prints the code on an invoice next to the bank details, so the customer pays without typing the IBAN.",
        "A club or association puts a code with the yearly fee and a reference like Membership 2026 on its letter to members.",
        "A landlord shares a rent code with tenants, with the amount and the reference the bank statement should show.",
        "A charity or parish displays a donation code with no amount on a poster or in a newsletter.",
      ],
      tipsTitle: "Tips before you print",
      tips: [
        "The BIC is optional for SEPA transfers within the EU since version 002, so leave it empty unless your bank asks for it.",
        "Keep the reference meaningful but short: an invoice number or customer id is what you will search for in your statement later.",
        "Use a dot or a comma for the amount; both are accepted and written as EUR49.90 in the code. Only euro amounts are possible in this format.",
        "Scan the code with your own banking app before printing. If the IBAN or name does not match your account, fix the typo now.",
      ],
    },
    faq: [
      {
        q: "Which banking apps can read this code?",
        a: "Most banking apps in Germany, Austria, the Netherlands, Belgium, Finland and several other SEPA countries, including Sparkasse, Volksbank, Deutsche Bank, Commerzbank, ING, Rabobank, ABN AMRO, Erste Bank and many fintech apps. Support in France and Spain is still limited, so test with the apps your payers use.",
      },
      {
        q: "Is this the same as GiroCode?",
        a: "Yes. GiroCode is the German name for the EPC QR code described in the European Payments Council guideline. Other countries use other names for the same format.",
      },
      {
        q: "Can the payer change the amount or the reference?",
        a: "Yes. The code only pre-fills the transfer form in the payer's app; every field can still be edited before the transfer is approved.",
      },
      {
        q: "Does the code work for instant payments?",
        a: "The code describes a SEPA credit transfer. Whether it is executed as an instant payment depends on the payer's bank and the option they pick in the app, not on the code.",
      },
    ],
  },
};

/** Teks Bahasa Indonesia untuk halaman contoh penggunaan (/id/restaurant-menu-qr-code, …). */
export const useCasesId: Record<UseCaseId, LandingCopy> = {
  restaurant_menu: {
    title: "Buat QR Code Menu Restoran",
    subtitle: "Cetak satu kode untuk setiap meja yang membuka menu terbaru Anda di HP tamu.",
    metaTitle: "Buat QR Code Menu Restoran — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code menu restoran, kafe, atau warung yang membuka halaman menu atau PDF Anda. Statis, tidak kedaluwarsa, siap untuk papan meja dan stiker. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code menu",
      how: [
        "QR code menu tidak berisi menunya. Kode berisi link, seperti `https://restoananda.com/menu`, dan HP membuka apa pun yang ditampilkan alamat itu. Jadi langkah pertama adalah menentukan di mana menu disimpan: halaman di situs Anda sendiri, PDF yang dibagikan dari Google Drive atau Dropbox, atau halaman dari layanan menu atau pemesanan yang Anda pakai. Situs ini hanya membuat kodenya; tidak menyimpan menu atau file.",
        "Karena kodenya statis, link di dalamnya terkunci begitu Anda mencetak. Yang bisa diubah adalah isi di balik link. Jika menu berada di satu alamat tetap dan Anda memperbarui halaman itu atau menimpa PDF-nya, setiap kartu meja tetap berfungsi meski harga naik atau menu berganti. Jika alamatnya sendiri berubah, misalnya setelah pindah layanan menu, kode cetak harus diganti.",
        "Tamu memindai dengan kamera HP, melihat alamatnya, lalu mengetuk untuk membuka, tanpa perlu memasang aplikasi. Link pendek di domain Anda sendiri juga terlihat lebih tepercaya daripada link pihak ketiga yang panjang.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Papan meja atau stiker di setiap meja, supaya tamu bisa melihat menu sambil menunggu tanpa berebut satu buku menu.",
        "Stiker di kaca depan agar orang yang lewat bisa mengecek menu dan harga sebelum masuk, bahkan setelah tutup.",
        "Kartu di kantong take away atau di struk yang mengarah ke menu untuk pesanan berikutnya dari rumah.",
        "Kode terpisah di kasir untuk halaman alergen dan bahan, jadi staf tinggal menunjuknya saat tamu bertanya.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Gunakan alamat yang Anda kelola sendiri, seperti domainanda.com/menu, lalu arahkan ke tempat menu berada saat ini. Dengan begitu, ganti layanan menu tidak berarti mencetak ulang semua kartu meja.",
        "Buka menu di HP lewat kuota data, bukan WiFi restoran. PDF besar hasil scan lambat dimuat dan sulit dibaca di layar kecil; halaman web sederhana lebih nyaman.",
        "Tetap sediakan menu cetak. Sebagian tamu tidak punya smartphone, baterainya habis, atau penglihatannya kurang baik; QR code seharusnya memudahkan, bukan satu-satunya cara memesan.",
        "Tampilkan informasi alergen dan bahan (misalnya mengandung kacang atau seafood) sejelas di menu kertas, dan perbarui setiap kali hidangan berubah.",
        "Cetak kode minimal 2 sampai 3 cm di kartu meja. Untuk kaca depan, Lembar cetak / PDF membuat poster A4 dengan judul yang bisa diubah, seperti “Pindai untuk lihat menu”.",
      ],
    },
    faq: [
      {
        q: "Bisakah saya mengunggah menu di sini?",
        a: "Tidak. Situs ini hanya membuat kodenya. Taruh menu di situs Anda, bagikan PDF dari Google Drive atau Dropbox dengan akses “siapa saja yang memiliki link”, atau pakai link dari layanan menu Anda, lalu tempel alamatnya di sini.",
      },
      {
        q: "Apakah saya perlu kode baru saat menu berubah?",
        a: "Tidak, selama alamatnya tetap sama. Perbarui halamannya atau timpa PDF di link yang sama, dan kode cetak tetap menampilkan versi terbaru.",
      },
      {
        q: "Apakah kode akan berhenti berfungsi setelah beberapa waktu?",
        a: "Tidak. Ini kode statis dengan link tersimpan di gambar, jadi tidak ada langganan yang bisa habis. Kode berfungsi selama halaman menunya masih online.",
      },
      {
        q: "Satu kode untuk semua meja atau satu kode per meja?",
        a: "Satu kode cukup jika semua meja melihat menu yang sama. Kode terpisah hanya berguna jika sistem pemesanan Anda memberi link berbeda untuk tiap meja; daftar itu bisa diubah menjadi kode di halaman Massal, maksimal 200 sekaligus dalam satu ZIP.",
      },
    ],
  },

  wedding: {
    title: "Buat QR Code Undangan Pernikahan",
    subtitle: "Hubungkan undangan ke website pernikahan atau formulir RSVP, dan kumpulkan foto resepsi dalam satu album bersama.",
    metaTitle: "Buat QR Code Undangan Pernikahan — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code untuk undangan pernikahan: RSVP, lokasi gedung, dan album foto bersama. Kode statis yang tidak kedaluwarsa, siap cetak. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code pernikahan",
      how: [
        "QR code pernikahan berisi link, dan link itulah yang menentukan apa yang dilihat tamu. Di undangan, biasanya berupa website pernikahan atau undangan digital Anda, atau langsung formulir RSVP, baik dibuat dengan layanan undangan online, Google Forms, maupun yang lain. Tamu memindai, halaman terbuka, dan mereka membalas tanpa mengetik alamat panjang dari kartu.",
        "Cara yang sama berlaku untuk hari H. Kode berisi link berbagi Google Maps atau Apple Maps mengantar tamu ke gedung, dan kode di resepsi yang membuka album bersama Google Photos atau iCloud memungkinkan semua orang menambahkan foto yang mereka ambil. Setiap tujuan butuh kodenya sendiri, karena satu kode membuka satu alamat.",
        "Kode yang dibuat di sini statis: link tersimpan di gambar dan tidak pernah kedaluwarsa, jadi bertahun-tahun lagi pun masih terbuka selama halamannya online. Konsekuensinya, link tidak bisa diganti setelah dicetak. Pastikan alamat website, formulir, dan album sudah final sebelum undangan masuk percetakan.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Bagian belakang undangan atau kartu sisipan mengarah ke formulir RSVP, sehingga konfirmasi kehadiran terkumpul di satu tempat, bukan tersebar di chat, email, dan telepon.",
        "Kartu save-the-date atau kartu informasi membuka website pernikahan berisi info akomodasi, dress code, dan susunan acara.",
        "Kartu denah atau papan selamat datang membuka link peta untuk gedung yang sulit ditemukan, misalnya di dalam kompleks atau gang kecil.",
        "Kartu meja di resepsi membuka album foto bersama, jadi tamu mengunggah fotonya sebelum lupa.",
        "Kartu ucapan terima kasih atau souvenir berisi kode ke album foto dan video pernikahan untuk dikenang tamu.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Di undangan, ukuran sekitar 2 sampai 2,5 cm sudah nyaman untuk HP yang dipegang tangan. Link yang lebih pendek menghasilkan pola lebih renggang yang lebih andal dicetak di ukuran itu.",
        "Tinta gelap di kertas krem, gading, atau kraft biasanya mudah dipindai; foil emas, tinta pastel, dan abu-abu muda sering tidak. Pilih warna gelap di bagian Gaya dan uji hasil proof di kertas aslinya.",
        "Jaga quiet zone, yaitu margin kosong di sekeliling kode, bebas dari ornamen, bingkai, dan ilustrasi. Pemindai membutuhkannya untuk menemukan kode.",
        "Periksa pengaturan berbagi: link album harus mengizinkan tamu menambahkan foto, dan formulir harus terbuka untuk siapa saja yang punya link, bukan hanya akun Anda.",
        "Sebelum mencetak semua undangan, pindai satu proof dengan iPhone dan HP Android, kirim RSVP percobaan, dan minta teman mengunggah satu foto ke album.",
      ],
    },
    faq: [
      {
        q: "Bisakah tujuan kode diubah setelah undangan dicetak?",
        a: "Kodenya sendiri tidak, karena statis. Namun isi halamannya tetap bisa diedit, jadi perbarui website atau formulirnya, bukan link-nya.",
      },
      {
        q: "Apakah kode masih berfungsi setelah pernikahan?",
        a: "Kode tidak punya tanggal kedaluwarsa. Kode tetap berfungsi selama website, formulir, atau album di link itu masih online, jadi tamu bisa melihat foto lagi nanti jika album tetap dibagikan.",
      },
      {
        q: "Bisakah setiap tamu mendapat kode RSVP pribadi?",
        a: "Jika layanan RSVP Anda memberi link berbeda untuk tiap tamu, daftar itu bisa diubah menjadi kode di halaman Massal, maksimal 200 sekaligus, sebagai ZIP berisi file PNG.",
      },
      {
        q: "Sebaiknya kirim PNG atau SVG ke percetakan?",
        a: "Kirim file SVG ke percetakan atau desainer. Ini file vektor, jadi tetap tajam di ukuran berapa pun. PNG cukup untuk website pernikahan atau pesan ke tamu.",
      },
    ],
  },

  business_card: {
    title: "Buat QR Code Kartu Nama",
    subtitle: "Tambahkan kartu kontak di kartu nama Anda yang menyimpan detail Anda ke HP dalam sekali pindai.",
    metaTitle: "Buat QR Code Kartu Nama — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code kartu nama yang menyimpan nama, nomor HP, email, dan situs web ke kontak HP. vCard 3.0, statis, dan tidak kedaluwarsa. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code kartu nama",
      how: [
        "Kode kartu nama yang dibuat di sini berisi kartu kontak vCard 3.0, format yang dibaca buku telepon HP. Saat dipindai, HP menampilkan nama, perusahaan, nomor, dan email Anda dalam pratinjau kontak, dan satu ketukan menyimpannya. Tidak ada yang perlu dimuat, jadi tetap bekerja di gedung pameran yang sinyalnya lemah, dan nama Anda tersimpan persis sesuai ejaan Anda.",
        "Alternatifnya adalah kode yang mengarah ke profil, seperti situs web atau LinkedIn Anda. Link bisa menampilkan lebih banyak dan halamannya bisa diperbarui tanpa cetak ulang, tetapi orang itu tetap harus menyimpan nomor Anda sendiri. Kode kontak melakukannya untuk mereka. Sebagian orang memakai keduanya: kode kontak di belakang, dan alamat situs pendek dicetak sebagai teks.",
        "Setiap kolom yang Anda isi tersimpan di gambar, jadi kode membesar seiring informasinya. Kartu berisi nama, perusahaan, HP, email, dan situs web tetap ringkas; menambahkan alamat lengkap dan catatan membuat pola lebih rapat dan sulit dibaca di ukuran kartu nama.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Acara networking dan pameran dagang, tempat Anda membagikan puluhan kartu dan ingin setiap kartu berakhir di HP, bukan di laci.",
        "Freelancer dan konsultan yang bertemu klien langsung dan ingin email serta nomor yang benar tersimpan, bukan ditebak dari foto kartu.",
        "Kartu nama tim sales, dengan kode berisi nomor langsung masing-masing.",
        "Kartu di meja resepsionis yang menyimpan kontak kantor untuk tamu.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Di kartu nama standar 90 × 55 mm, cetak kode minimal 2 cm, dengan margin kosong di sekelilingnya. Jika bagian belakang khusus untuk kode, 2,5 sampai 3 cm lebih nyaman.",
        "Isi kolom yang benar-benar dibutuhkan: nama, perusahaan, HP, email, dan situs web. Kosongkan alamat dan catatan kecuali memang penting.",
        "Tulis nomor dengan kode negara, seperti +62 812-3456-7890, agar berfungsi juga untuk kontak di luar negeri. Nomor WhatsApp Anda biasanya sama dengan nomor HP ini.",
        "Halaman Massal membuat kode link dan teks, bukan kartu kontak. Untuk satu tim, buat kode tiap orang di halaman ini dan simpan file SVG untuk tiap desain kartu.",
        "Pindai proof cetak dengan iPhone dan HP Android, lalu pastikan nama, nomor, dan email masuk ke kolom yang tepat.",
      ],
    },
    faq: [
      {
        q: "Apa yang terjadi jika nomor atau jabatan saya berubah?",
        a: "Detailnya terkunci di dalam kode. Buat kode baru dan cetak ulang kartunya, sama seperti untuk teks yang tercetak.",
      },
      {
        q: "Lebih baik kode kontak atau link ke situs web?",
        a: "Kode kontak menyimpan detail Anda langsung dan bekerja offline. Link bisa mengarah ke halaman yang nanti Anda perbarui. Jika detail Anda jarang berubah, kode kontak lebih berguna di kartu nama.",
      },
      {
        q: "Bisakah saya menambahkan logo?",
        a: "Tidak ke dalam kontaknya, tetapi Anda bisa menaruh logo kecil di tengah kode lewat bagian Gaya. Koreksi kesalahan otomatis dinaikkan ke maksimal, jadi kode tetap bisa dipindai.",
      },
      {
        q: "Bisakah orang mengedit kontak sebelum menyimpannya?",
        a: "Bisa. HP menampilkan pratinjau, dan orang itu bisa memeriksa serta mengubah detailnya sebelum menyimpan.",
      },
    ],
  },

  google_review: {
    title: "Buat QR Code Ulasan Google",
    subtitle: "Buat kode yang membuka formulir ulasan Google untuk usaha Anda, siap untuk meja kasir dan struk.",
    metaTitle: "Buat QR Code Ulasan Google — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code yang membuka formulir ulasan Google usaha Anda dari Place ID atau link ulasan. Untuk kartu di kasir, struk, dan kartu terima kasih. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code ulasan Google",
      how: [
        "Kode ini langsung membuka formulir ulasan Google untuk usaha Anda, jadi pelanggan tidak perlu mencari nama Anda, memilih profil yang benar, lalu mencari tombol ulasan. Dengan platform Google Review terpilih, masukkan Place ID Anda, dan kode berisi `https://search.google.com/local/writereview?placeid=ChIJ…` dengan ID Anda menggantikan titik-titiknya.",
        "Ada dua cara mengisi kolomnya. Pertama, Place ID: cari usaha Anda di Place ID Finder milik Google, bagian dari dokumentasi Google Maps Platform, lalu salin ID-nya, yang biasanya diawali ChIJ. Kedua, link ulasan dari Profil Bisnis Google Anda: buka profil, pilih opsi untuk meminta ulasan, dan salin link pendek yang muncul. Link lengkap yang diawali https:// diterima apa adanya.",
        "Saat dipindai, HP membuka formulir di Google Maps atau browser. Pelanggan harus login ke akun Google untuk memposting, dan mereka sendiri yang memilih bintang serta menulis ulasannya. Kodenya statis dan hanya berisi link publik, jadi tetap berfungsi selama profil usaha Anda ada.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Kartu kecil di dekat kasir, saat pelanggan punya waktu sebentar sambil membayar.",
        "Bagian bawah struk, yang dibawa pulang pelanggan.",
        "Kartu terima kasih yang diselipkan di pesanan antar, kamar penginapan, atau setelah kunjungan servis selesai.",
        "Poster A4 di dekat pintu keluar yang dibuat dengan Lembar cetak / PDF, dengan judul singkat yang bisa diubah.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Pindai sendiri kodenya dan pastikan formulir menampilkan nama usaha Anda. Usaha dengan nama mirip di kota yang sama mudah tertukar di Place ID Finder.",
        "Minta dengan bahasa sederhana, seperti “Bagaimana pelayanan kami? Ceritakan di Google”, dan taruh kode di tempat orang sedang santai, bukan saat terburu-buru keluar.",
        "Kebijakan Google tidak mengizinkan diskon, hadiah, atau imbalan lain sebagai ganti ulasan, jadi cukup tulis permintaan sederhana di kartu.",
        "Minta ke semua pelanggan dengan cara yang sama. Google juga melarang review gating: hanya mengundang pelanggan yang puas, atau mengarahkan yang kecewa ke tempat lain terlebih dahulu.",
      ],
    },
    faq: [
      {
        q: "Di mana saya menemukan Place ID?",
        a: "Gunakan Place ID Finder di dokumentasi Maps Google: cari usaha Anda dan salin ID yang muncul. Atau, tempel link ulasan dari Profil Bisnis Google Anda ke kolomnya.",
      },
      {
        q: "Apakah pelanggan perlu akun Google?",
        a: "Ya. Memposting ulasan Google harus login ke akun Google. Orang tanpa akun tetap bisa membaca profil usaha Anda.",
      },
      {
        q: "Bolehkah saya memberi diskon untuk ulasan?",
        a: "Tidak. Kebijakan Google melarang imbalan untuk ulasan, termasuk diskon dan barang gratis. Permintaan sopan di kartu sudah cukup.",
      },
      {
        q: "Apakah kode rusak jika saya mengganti nama usaha?",
        a: "Biasanya tidak, karena Place ID merujuk ke profil usaha, bukan namanya. Google menyebut Place ID bisa berubah dalam kasus tertentu, misalnya saat profil digabung, jadi pindai ulang kode setelah perubahan besar pada profil Anda.",
      },
    ],
  },

  wifi_cafe: {
    title: "QR Code WiFi untuk Kafe, Hotel & Penginapan",
    subtitle: "Tamu tersambung ke jaringan tamu dengan sekali pindai, dari papan meja, kartu kamar, atau pintu penginapan.",
    metaTitle: "QR Code WiFi untuk Kafe, Hotel & Penginapan — Gratis, Tanpa Daftar",
    metaDescription:
      "Buat QR code WiFi untuk kafe, hotel, homestay, atau villa. Tamu tersambung dengan sekali pindai di iPhone atau Android. Cetak papan meja atau kartu kamar. Gratis, tanpa daftar.",
    sections: {
      howTitle: "Cara kerja QR code WiFi tamu",
      how: [
        "Di banyak kafe, pertanyaan yang paling sering diulang di kasir adalah “Password WiFi-nya apa?”. Kode WiFi menjawabnya di atas kertas: berisi nama jaringan, kata sandi, dan jenis keamanan dalam format singkat, seperti `WIFI:T:WPA;S:KedaiKopi-Tamu;P:kopi-susu-2026;;`, dan kamera HP mengubahnya menjadi ajakan “Gabung ke jaringan”. Tamu tidak mengetik apa pun, jadi tidak ada salah huruf besar atau angka nol yang mirip huruf O.",
        "Buat jaringan tamu terpisah sebelum membuat kode, jika router atau access point Anda mendukungnya. Kata sandi tersimpan di kode dalam bentuk yang bisa dibaca, dan siapa pun yang memotret papan meja bisa membacanya. Jaringan tamu menjaga mesin EDC, komputer kasir, dan CCTV tetap berada di jaringan yang tidak bisa dijangkau tamu.",
        "Kodenya statis, jadi kata sandi terkunci di dalamnya. Jika Anda mengganti kata sandi tamu setiap bulan atau setiap pergantian tamu, cetak kode baru pada saat yang sama. Jaringan hotel yang punya halaman login atau persetujuan, disebut captive portal, tetap menampilkan halaman itu setelah HP tersambung; kode menyambungkan ke jaringan tetapi tidak menyelesaikan login.",
      ],
      usesTitle: "Contoh penggunaan",
      uses: [
        "Papan meja di kafe, kedai kopi, atau restoran, supaya tamu tersambung sambil menunggu pesanan.",
        "Kartu di setiap kamar hotel atau di sampul kartu kunci, di samping jam check-out dan jam sarapan.",
        "Kode berbingkai di balik pintu villa, homestay, atau kos-kosan, atau di map selamat datang, untuk tamu yang datang larut saat pemilik tidak ada.",
        "Meja coworking, ruang tunggu klinik, atau kursi salon, tempat pengunjung berada cukup lama sehingga butuh koneksi.",
      ],
      tipsTitle: "Tips sebelum mencetak",
      tips: [
        "Lembar cetak / PDF membuat papan A4 dengan judul “Sambungkan ke WiFi” dan nama jaringan, jadi orang yang tidak bisa memindai tetap tahu jaringan mana yang dipilih. Anda bisa menambahkan subjudul seperti “Tanyakan ke kasir jika perlu bantuan”.",
        "Ketik nama jaringan persis seperti yang disiarkan, termasuk huruf besar dan akhiran seperti _5G.",
        "Saat mengganti kata sandi, ganti semua kode cetak di hari yang sama. Kode lama tetap memunculkan ajakan bergabung tetapi gagal tersambung, sehingga tamu mengira jaringannya rusak.",
        "Uji kode cetak dengan iPhone dan HP Android dari tempat duduk tamu, di bawah pencahayaan yang sebenarnya.",
      ],
    },
    faq: [
      {
        q: "Apakah aman menaruh password WiFi di meja?",
        a: "Siapa pun yang memindai atau memotret kode bisa membaca kata sandinya, jadi gunakan jaringan tamu yang terpisah dari jaringan untuk sistem usaha Anda.",
      },
      {
        q: "Apakah saya harus mencetak ulang saat mengganti kata sandi?",
        a: "Ya. Kata sandi tersimpan di dalam kode, jadi setiap penggantian kata sandi butuh kode dan cetakan baru.",
      },
      {
        q: "Apakah bisa untuk WiFi hotel yang punya halaman login?",
        a: "Kode menyambungkan HP ke jaringan. Jika jaringan lalu menampilkan halaman login atau persetujuan, tamu tetap mengisinya manual.",
      },
      {
        q: "Bisakah membuat kode untuk setiap kamar dengan kata sandi berbeda?",
        a: "Bisa, satu per satu di halaman ini. Halaman Massal dibuat untuk daftar link dan teks, dan tidak punya kolom WiFi.",
      },
    ],
  },
};
