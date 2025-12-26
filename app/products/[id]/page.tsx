"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  ProductDetailHeader,
  ProductDetailImage,
  ProductDetailInformation,
} from "./components";
import ProductDetailTabs from "./components/ProductDetailTabs";
import useQueryProductDetailHook from "./hooks/useQueryProductDetail.hook";

/**
 * Product Detail Page Component
 *
 * Displays comprehensive product information including:
 * - Image gallery
 * - Product details (price, rating, stock)
 * - Description and specifications
 * - Reviews
 * - Shipping and warranty information
 */
const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { t } = useTranslationHook();
  const { product, isLoading, error } = useQueryProductDetailHook(productId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {t("products:loadingProductDetails")}
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">
                {t("products:productNotFound")}
              </h2>
              <p className="text-muted-foreground">
                {t("products:productNotFoundDescription")}
              </p>
              <Button onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("products:backToProducts")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetailHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductDetailImage product={product} />
          <ProductDetailInformation product={product} />
        </div>

        <ProductDetailTabs product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
