"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCategory } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useCallback, useMemo } from "react";
import useQueryProductsHook from "../../hooks/useQueryProducts.hook";
import { DeleteProductModal } from "../../modals/DeleteProductModal";
import { ProductModal } from "../../modals/ProductModal";
import { ProductPagination } from "../ProductPagination";
import ProductFilters from "./components/ProductFilters";

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
            <TableCell colSpan={12} className="text-center py-12">
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
            <TableCell colSpan={12} className="text-center py-12">
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
              <Link
                href={`/product/${product.id}`}
                className="w-40 justify-center"
              >
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  className="object-cover rounded-md"
                  width={80}
                  height={80}
                />
              </Link>
            </TableCell>
            <TableCell className="text-foreground">
              <div
                className="text-sm overflow-hidden text-ellipsis max-w-40"
                title={product.title}
              >
                {product.title}
              </div>
            </TableCell>
            <TableCell className="text-foreground">
              <div
                className="text-sm overflow-hidden text-ellipsis max-w-60"
                title={product.description}
              >
                {product.description}
              </div>
            </TableCell>
            <TableCell className="text-center text-foreground">
              {formatCategory(product.category)}
            </TableCell>
            <TableCell className="text-center font-semibold text-foreground">
              <div>
                $
                {product.discountPercentage > 0
                  ? (
                      product.price *
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)
                  : product.price.toFixed(2)}
              </div>
              {product.discountPercentage > 0 && (
                <div className="text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </div>
              )}
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
              <div className="flex items-center justify-center gap-2 px-4">
                <ProductModal mode="edit" selectedProduct={product} />

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <ProductModal mode="create" />
      </div>

      {/* Search, Sort, and Filter Controls */}
      <ProductFilters />

      <Card className="overflow-hidden shadow-lg py-0 rounded-sm">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center font-semibold w-20">
                  Product ID
                </TableHead>
                <TableHead className="text-center font-semibold w-40">
                  Image
                </TableHead>
                <TableHead className="text-center font-semibold w-40">
                  Title
                </TableHead>
                <TableHead className="text-center font-semibold w-60">
                  Description
                </TableHead>
                <TableHead className="text-center font-semibold w-40">
                  Category
                </TableHead>
                <TableHead className="text-center font-semibold w-32">
                  Price
                </TableHead>
                <TableHead className="text-center font-semibold w-40">
                  Created at
                </TableHead>
                <TableHead className="text-center font-semibold w-40">
                  Updated at
                </TableHead>
                <TableHead className="text-center font-semibold w-60">
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
