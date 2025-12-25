export interface Category {
  slug: number;
  name: string;
  url: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  meta: {
    createdAt: string;
    updatedAt: string;
  };
}

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
