"use client";

import { Button } from "@/components/ui/button";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { ArrowLeft } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * A component that renders a header for a product detail page.
 * It includes a button to go back to the previous page.
 */
const ProductDetailHeader = ({ router }: { router: AppRouterInstance }) => {
  const { t } = useTranslationHook();
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("commons:back")}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailHeader;
