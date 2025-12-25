import { Suspense } from "react";
import { ProductListComponent } from "./components/ProductList";

export default function ProductsTable() {
  return (
    <main>
      <Suspense>
        <ProductListComponent />
      </Suspense>
    </main>
  );
}
