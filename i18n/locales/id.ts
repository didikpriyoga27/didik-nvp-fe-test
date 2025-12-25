import { TCartKeys, TCommonsKeys, TProductsKeys } from "../type";

const cart: Record<TCartKeys, string> = {
  empty: "Keranjang anda kosong",
  goToProducts: "Pergi ke Produk",
  successPurchase:
    "Pembelian Anda telah selesai. Kami akan mengirimkan detail pembelian melalui email.",
};

const commons: Record<TCommonsKeys, string> = {
  cart: "Keranjang",
  products: "Produk",
  search: "Cari",
};

const products: Record<TProductsKeys, string> = {
  actions: "Aksi",
  addProduct: "Tambah Produk",
  category: "Kategori",
  createdAt: "Ditambahkan pada",
  description: "Deskripsi",
  editProduct: "Edit Produk",
  errorAddedToCart: "Gagal menambahkan ke keranjang",
  errorCreatedProduct: "Gagal membuat produk",
  errorDeletedProduct: "Gagal menghapus produk",
  errorUpdatedProduct: "Gagal memperbarui produk",
  image: "Gambar",
  input: "Masukkan",
  price: "Harga",
  productId: "ID Produk",
  successAddedToCart: "telah ditambahkan ke keranjang",
  successCreatedProduct: "Produk telah dibuat",
  successDeletedProduct: "Produk telah dihapus",
  successUpdatedProduct: "Produk telah diperbarui",
  title: "Judul",
  updatedAt: "Diperbarui pada",
};

const id = {
  cart,
  commons,
  products,
};

export default id;
