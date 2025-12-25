import { Product } from "@/components/sections/product-grid";

export interface Column extends Product {
  actions?: string;
}

export interface CreateProductParams {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
