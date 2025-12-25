import { Product } from "@/app/products/type";

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Cart {
  products: CartItem[];
}

export interface CartStore extends Cart {
  addItem: (p: CartItem) => void;
  removeItem: (id: Product["id"]) => void;
  removeAll: () => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
}
