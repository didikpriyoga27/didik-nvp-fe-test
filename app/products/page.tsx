import { ProductGrid } from "@/components/sections/product-grid";
import { Suspense } from "react";
import { ProductGridSkeleton } from "../page";

export default function Products() {
  return (
    <main>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid title="Featured Products" limit={30} isAllProducts />
      </Suspense>
    </main>
  );
}
