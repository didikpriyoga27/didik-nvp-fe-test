"use client";

import { Suspense } from "react";
import { ProductGridSkeleton } from "../page";
import useQueryProductsHook from "../products-table/hooks/useQueryProducts.hook";
import { ProductGridComponent } from "./components/ProductGridComponent";

export default function Products() {
  const { productsData } = useQueryProductsHook(false);

  return (
    <main>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGridComponent products={productsData?.products} limit={30} />
      </Suspense>
    </main>
  );
}
