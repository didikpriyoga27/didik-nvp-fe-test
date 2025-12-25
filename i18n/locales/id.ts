import { TCommonsKeys, TProductsKeys } from "../type";

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
  commons,
  products,
};

export default id;
