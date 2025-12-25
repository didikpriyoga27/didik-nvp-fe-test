import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import mockProducts from "./mock_products.json";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

type ProductGridProps = {
  title?: string;
  description?: string;
  products?: Product[];
  limit?: number;
  isAllProducts?: boolean;
  viewAllHref?: string;
};

export async function ProductGrid({
  title = "Featured Products",
  description = "Handpicked favorites from our collection",
  products,
  limit = 10,
  isAllProducts = false,
  viewAllHref = "/products",
}: Readonly<ProductGridProps>) {
  const displayProducts = products ?? mockProducts;

  return (
    <section
      id="products"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        {!isAllProducts && (
          <Link
            href={viewAllHref}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProducts.slice(0, limit).map((product) => {
          const allImages = [...(product.images ?? [])];
          const primaryImage = allImages[0];

          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden mb-4">
                {primaryImage && (
                  <Image
                    src={primaryImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-120 transition duration-500"
                  />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-medium text-foreground">
                  {product.title}
                </h3>
                <p className="text-base font-semibold text-foreground">
                  {product.price}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {!isAllProducts && (
        <div className="mt-12 text-center sm:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
