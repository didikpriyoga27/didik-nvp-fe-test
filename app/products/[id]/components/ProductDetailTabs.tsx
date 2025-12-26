import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Star } from "lucide-react";
import { Product } from "../../type";

interface IProductDetailTabsProps {
  product: Product;
}
/**
 * A tabs component for displaying product information.
 * It has three tabs: description, specifications, and reviews.
 * The description tab displays the product description and tags.
 * The specifications tab displays the product specifications such as SKU, weight, dimensions, and barcode.
 * The reviews tab displays the product reviews.
 *
 * @param {IProductDetailTabsProps} props - The props for the component.
 * @returns {JSX.Element} A JSX element representing the product detail tabs.
 */
const ProductDetailTabs = ({ product }: IProductDetailTabsProps) => {
  const { t } = useTranslationHook();

  return (
    <div className="mt-16">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">
            {t("products:description")}
          </TabsTrigger>
          <TabsTrigger value="specifications">
            {t("products:specification")}
          </TabsTrigger>
          <TabsTrigger value="reviews">
            {t("products:reviews")} ({product.reviews?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    {t("products:sku")}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {product.sku}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    {t("products:weight")}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {product.weight} kg
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    {t("products:dimensions")}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {product.dimensions.width} × {product.dimensions.height} ×{" "}
                    {product.dimensions.depth} cm
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    {t("products:barcode")}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {product.meta.barcode}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{review.reviewerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    {t("products:emptyReview")}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailTabs;
