import { Badge } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Product } from "../../type";

interface IProductDetailImageProps {
  product: Product;
}

/**
 * A component that renders a product image with a thumbnail grid.
 *
 * It displays the main product image with a badge if there is a discount.
 * Below the main image, it displays a thumbnail grid of all images related to the product.
 * The user can select a thumbnail to view the corresponding image in the main image section.
 *
 * @param {IProductDetailImageProps} props - The props for the component.
 * @returns {JSX.Element} A JSX element representing the product image component.
 */
const ProductDetailImage = ({ product }: IProductDetailImageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images || [];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
        <Image
          src={images[selectedImage] || product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
          loading="eager"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-500">
            -{product.discountPercentage.toFixed(0)}% OFF
          </Badge>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground"
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} - Image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 25vw, 12.5vw"
                className="object-cover"
                loading="eager"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailImage;
