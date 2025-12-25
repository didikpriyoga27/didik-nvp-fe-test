import type en from "./locales/en";

enum NODES {
  COMMONS = "commons",
  CART = "cart",
  PRODUCTS = "products",
}

export type TLocale = "id" | "en";
export type TNodes = NODES[number];

export type TCartKeys = keyof (typeof en)["cart"];
export type TCommonsKeys = keyof (typeof en)["commons"];
export type TProductsKeys = keyof (typeof en)["products"];

export type TCartFileAndProperties = `cart:${TCartKeys}`;
export type TCommonsFileAndProperties = `commons:${TCommonsKeys}`;
export type TProductsFileAndProperties = `products:${TProductsKeys}`;

export type TFileAndProperties =
  | TProductsFileAndProperties
  | TCartFileAndProperties
  | TCommonsFileAndProperties;
