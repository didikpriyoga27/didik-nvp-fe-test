"use client";

import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { JSX } from "react";
import useProductListHook from "../../hooks/useProductList.hook";
import useQueryCategoriesHook from "../../hooks/useQueryCategories.hook";
import { ProductModal } from "../../modals/ProductModal";
import { ProductPagination } from "../ProductPagination";
import { TableBodyComponent } from "./components/TableBody";
import { TableHeaderComponent } from "./components/TableHeader";

/**
 * A component that renders a table with a list of products.
 *
 * The component uses the `useProductListHook` hook to generate the table data.
 * The hook returns an object with the following properties:
 * - data: The list of products.
 * - columns: The columns of the table.
 *
 * The component renders a table with the following structure:
 * - The first row contains table cells with the column headers.
 * - The second row contains table cells with the table data.
 * - The third row contains a pagination component.
 *
 * The component styles the table and pagination component using Tailwind CSS.
 *
 * @returns {JSX.Element} A JSX element representing the table component.
 */
const ProductListComponent = (): JSX.Element => {
  const productList = useProductListHook();
  useQueryCategoriesHook();

  const table = useReactTable({
    data: productList.data,
    columns: productList.columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="w-full max-w-[95%] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <ProductModal mode="create" />
      </div>

      <Card className="overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeaderComponent table={table} />
            <TableBodyComponent
              table={table}
              isShowLoading={productList.isShowLoading}
            />
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
