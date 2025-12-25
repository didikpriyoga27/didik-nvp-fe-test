import { Product } from "@/components/sections/product-grid";

export interface Column extends Product {
  actions?: string;
}

export interface CreateProductParams {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  images: string[];
}
