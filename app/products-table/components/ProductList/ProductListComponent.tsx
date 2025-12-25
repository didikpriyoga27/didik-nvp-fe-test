"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { JSX, useCallback, useMemo } from "react";
import useQueryProductsHook from "../../hooks/useQueryProducts.hook";
import { DeleteProductModal } from "../../modals/DeleteProductModal";
import { ProductModal } from "../../modals/ProductModal";
import { ProductPagination } from "../ProductPagination";

/**
 * A component that renders a table with a list of products.
 *
 * The component displays products in a table format with columns for ID, Image,
 * Title, Description, Price, Created at, Updated at, and Actions.
 *
 * @returns {JSX.Element} A JSX element representing the table component.
 */
const ProductListComponent = (): JSX.Element => {
  const { productsData, isShowLoading } = useQueryProductsHook();

  const products = useMemo(
    () => productsData?.products || [],
    [productsData?.products]
  );

  const TableBodyComponent = useCallback(() => {
    if (isShowLoading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="text-center py-12">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-muted-foreground">
                  Loading products...
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    if (products.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={8} className="text-center py-12">
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg text-muted-foreground">
                  No products found
                </span>
                <span className="text-sm text-muted-foreground">
                  Try adding a new product to get started
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <TableBody>
        {products.map((product) => (
          <TableRow
            key={product.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="text-center font-medium text-foreground">
              #{product.id}
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  className="object-cover rounded-md"
                  width={400}
                  height={400}
                />
              </div>
            </TableCell>
            <TableCell className="text-center text-foreground">
              {product.title}
            </TableCell>
            <TableCell className="text-foreground">
              <div className="line-clamp-3 text-sm" title={product.description}>
                {product.description}
              </div>
            </TableCell>
            <TableCell className="text-center font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </TableCell>
            <TableCell className="text-center text-sm text-foreground">
              <div>{new Date(product.meta.createdAt).toLocaleDateString()}</div>
              <div className="text-muted-foreground">
                {new Date(product.meta.createdAt).toLocaleTimeString()}
              </div>
            </TableCell>
            <TableCell className="text-center text-sm text-foreground">
              <div>{new Date(product.meta.updatedAt).toLocaleDateString()}</div>
              <div className="text-muted-foreground">
                {new Date(product.meta.updatedAt).toLocaleTimeString()}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <ProductModal mode="edit" selectedProduct={product} />

                <Button
                  variant="default"
                  size="icon"
                  className="h-9 w-9 bg-green-600 hover:bg-green-700"
                  aria-label="Add to cart"
                  onClick={() => {
                    console.log("Add to cart:", product.id);
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>

                <DeleteProductModal
                  productId={product.id}
                  productTitle={product.title}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }, [isShowLoading, products]);

  return (
    <section className="w-full max-w-[95%] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <ProductModal mode="create" />
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-semibold w-[80px]">
                  Product ID
                </TableHead>
                <TableHead className="text-center font-semibold w-[120px]">
                  Image
                </TableHead>
                <TableHead className="text-center font-semibold w-[200px]">
                  Title
                </TableHead>
                <TableHead className="text-center font-semibold w-[350px]">
                  Description
                </TableHead>
                <TableHead className="text-center font-semibold w-[120px]">
                  Price
                </TableHead>
                <TableHead className="text-center font-semibold w-[150px]">
                  Created at
                </TableHead>
                <TableHead className="text-center font-semibold w-[150px]">
                  Updated at
                </TableHead>
                <TableHead className="text-center font-semibold w-[180px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            {TableBodyComponent()}
          </Table>
        </div>
      </Card>

      <div className="mt-6">
        <ProductPagination />
      </div>
    </section>
  );
};

export default ProductListComponent;
