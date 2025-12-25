"use client";

import { Product } from "@/components/sections/product-grid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem, CartStore } from "./type";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [] as CartItem[],

      /**
       * Adds an item to the cart. If the item already exists in the cart,
       * it increases the quantity of the item. Otherwise, it adds the item
       * to the cart.
       *
       * @param {CartItem} p - The item to add to the cart.
       */
      addItem: (p: CartItem) => {
        set((state) => {
          if (state.products.map((p) => p.product.id).includes(p.product.id)) {
            state.increaseQuantity(p.product.id);
          } else {
            state.products.push(p);
          }

          return { products: state.products };
        });
      },

      /**
       * Removes an item from the cart based on its product ID.
       *
       * @param {Product["id"]} id - The ID of the product to remove from the cart.
       */
      removeItem: (id: Product["id"]) => {
        set((state) => {
          const updatedCart = state.products.filter((p) => p.product.id !== id);

          return { products: updatedCart };
        });
      },

      /**
       * Removes all items from the cart.
       */
      removeAll: () =>
        set(() => {
          return { products: [] };
        }),

      /**
       * Increases the quantity of a product in the cart by one.
       * If the product does not exist in the cart, it does nothing.
       *
       * @param {Product["id"]} id - The ID of the product to increase the quantity of.
       */
      increaseQuantity: (id: Product["id"]) => {
        set((state) => {
          const updatedCart = state.products.map((p) => {
            if (p.product.id === id) {
              p.qty++;

              return p;
            }

            return p;
          });

          return { products: updatedCart };
        });
      },

      /**
       * Decreases the quantity of a product in the cart by one.
       * If the product does not exist in the cart or the quantity is zero,
       * the product is removed from the cart.
       *
       * @param {Product["id"]} id - The ID of the product to decrease the quantity of.
       */
      decreaseQuantity: (id: Product["id"]) => {
        set((state) => {
          const updatedCart = state.products.filter((p) => {
            if (p.product.id === id && p.qty > 0) {
              p.qty--;

              if (p.qty <= 0) {
                return false;
              }
            }

            return true;
          });

          return { products: updatedCart };
        });
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
