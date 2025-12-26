import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useToastHook from "@/hooks/useToast.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { formatCategory } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";
import {
  Package,
  RefreshCw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Product } from "../../type";

interface IProductDetailInformationProps {
  product: Product;
}

/**
 * A component that displays detailed information about a product.
 *
 * This component displays the product title, category, rating, price, stock status, and quantity selector.
 * It also displays a button to add the product to the cart.
 * Additionally, it displays quick information cards about the product's shipping, return policy, and warranty.
 */
const ProductDetailInformation = ({
  product,
}: IProductDetailInformationProps) => {
  const { t } = useTranslationHook();
  const [quantity, setQuantity] = useState(1);
  const { successMessage } = useToastHook();

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    // dummy function to show react toastify
    successMessage(product.title + " added to cart successfully");
  };

  return (
    <div className="space-y-6">
      {/* Title and Category */}
      <div>
        <Badge variant="secondary" className="mb-2">
          {formatCategory(product.category)}
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          {product.title}
        </h1>
        {product.brand && (
          <p className="text-muted-foreground mt-2">by {product.brand}</p>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...new Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="font-medium">{product.rating}</span>
        <span className="text-muted-foreground">
          ({product.reviews?.length || 0} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-foreground">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-2xl text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 text-muted-foreground" />
        <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
          {product.availabilityStatus}
        </span>
        {product.stock > 0 && (
          <span className="text-muted-foreground">
            ({product.stock} in stock)
          </span>
        )}
      </div>

      <Separator />

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">Quantity:</div>
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="px-4 py-2 min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
            >
              +
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            Min. order: {product.minimumOrderQuantity}
          </span>
        </div>

        <Button
          size="lg"
          className="w-full"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {t("products:addToCart")}
        </Button>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm">{t("products:shipping")}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {product.shippingInformation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm">{t("products:return")}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {product.returnPolicy}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-medium text-sm">{t("products:warranty")}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {product.warrantyInformation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailInformation;
