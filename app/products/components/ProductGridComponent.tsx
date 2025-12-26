import useTranslationHook from "@/i18n/useTranslation.hook";
import Image from "next/image";
import Link from "next/link";
import { ProductGridProps } from "../type";

/**
 * A component that renders a grid of products.
 *
 * The component takes a title, description, an array of products, and a limit as props.
 * The title and description are displayed above the grid of products.
 * The products are rendered as a grid with a maximum of 3 columns on large screens and 2 columns on small to medium screens.
 * Each product is rendered as a link to the product detail page, with an image, title, rating, and price.
 * If the product has a discount, the discounted price is displayed, along with the original price struck through.
 * If the product is out of stock, an "Out of Stock" label is displayed on top of the product image.
 *
 * @param {ProductGridProps} props - The props for the component.
 * @returns {JSX.Element} A JSX element representing the component.
 */

export function ProductGridComponent({
  title = "",
  description = "",
  products = [],
  limit = 6,
}: Readonly<ProductGridProps>) {
  const { t } = useTranslationHook();
  return (
    <section
      id="products"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16"
    >
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground">
            {title || t("products:featuredProducts")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {description || t("products:featuredProductsDescription")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0, limit).map((product) => {
          const allImages = [...(product.images ?? [])];
          const primaryImage = allImages[0] || product.thumbnail;
          const discountedPrice =
            product.discountPercentage > 0
              ? product.price * (1 - product.discountPercentage / 100)
              : product.price;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden mb-4">
                {primaryImage && (
                  <Image
                    src={primaryImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                )}
                {product.discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                    -{product.discountPercentage.toFixed(0)}% OFF
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {t("products:outOfStock")}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-medium text-foreground line-clamp-2 flex-1">
                    {product.title}
                  </h3>
                  {!!product.rating && (
                    <div className="flex items-center gap-1 text-sm shrink-0">
                      <span className="text-yellow-500">★</span>
                      <span className="text-foreground font-medium">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-semibold text-foreground">
                    ${discountedPrice.toFixed(2)}
                  </p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
