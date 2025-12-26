import { TCommonsKeys, TProductsKeys } from "../type";

const commons: Record<TCommonsKeys, string> = {
  aboutMe: "Tentang Saya",
  cart: "Keranjang",
  cancel: "Batalkan",
  clearAll: "Bersihkan Semua",
  heroDescription:
    "Sebuah frontend test dengan framework Next.js yang menampilkan pengembangan UI menggunakan shadcn/ui. Aplikasi ini terintegrasi dengan DummyJSON Products API untuk menampilkan produk dalam tampilan grid dan list yang responsif, serta dideploy di Vercel oleh Didik Priyoga.",
  heroTitle: "Tes Frontend Developer",
  next: "Selanjutnya",
  previous: "Sebelumnya",
  products: "Produk",
  search: "Cari",
  sort: "Urutkan",
  toTableView: "Ke Mode Tabel",
};

const products: Record<TProductsKeys, string> = {
  actions: "Aksi",
  activeFilters: "Filter Aktif",
  addProduct: "Tambah Produk",
  addAnotherImage: "Tambah Gambar Lain",
  allCategories: "Semua Kategori",
  category: "Kategori",
  createdAt: "Dibuat",
  createProduct: "Buat Produk",
  description: "Deskripsi",
  descriptionPlaceholder: "Masukkan deskripsi produk",
  discount: "Diskon",
  editProduct: "Edit Produk",
  errorAddedToCart: "Gagal menambahkan ke keranjang",
  errorCreatedProduct: "Gagal membuat produk",
  errorDeletedProduct: "Gagal menghapus produk",
  errorUpdatedProduct: "Gagal memperbarui produk",
  featuredProducts: "Produk Unggulan",
  featuredProductsDescription: "Pilihan favorit dari koleksi kami.",
  image: "Gambar",
  input: "Masukkan",
  loadingProducts: "Memuat Produk...",
  noProductsFound: "Produk tidak ditemukan",
  noProductsFoundDescription: "Silakan tambahkan produk baru untuk memulai",
  price: "Harga",
  productId: "ID",
  productImages: "Gambar Produk",
  products: "Produk",
  sortBy: "Urutkan Berdasarkan",
  sortByNone: "Tidak Ada",
  sortByTitle: "Judul",
  sortByPrice: "Harga",
  searchProducts: "Cari Produk",
  searchProductsPlaceholder: "Cari berdasarkan judul atau deskripsi",
  selectCategory: "Pilih Kategori",
  successAddedToCart: "telah ditambahkan ke keranjang",
  successCreatedProduct: "Produk telah dibuat",
  successDeletedProduct: "Produk telah dihapus",
  successUpdatedProduct: "Produk telah diperbarui",
  title: "Judul",
  titlePlaceholder: "Masukkan judul produk",
  updatedAt: "Diperbarui",
  updateProduct: "Perbarui Produk",
};

const id = {
  commons,
  products,
};

export default id;
