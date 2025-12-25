"use client";

import { Button } from "@/components/ui/button";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductImage } from "../components/ProductImage";
import { DeleteProductModal } from "../modals/DeleteProductModal";
import { ProductModal } from "../modals/ProductModal";
import { Column } from "../type";
import useQueryProductsHook from "./useQueryProducts.hook";

const columnHelper = createColumnHelper<Column>();

/**
 * A hook for getting the list of products.
 *
 * The hook returns an object with the following properties:
 * - data: The list of products.
 * - columns: The columns of the table.
 * - isShowDeleteModal: A boolean indicating whether the delete modal should be shown or not.
 * - selectedProduct: The selected product to be deleted.
 * - setIsShowDeleteModal: A function to set the value of isShowDeleteModal.
 *
 * The hook also provides functions to add a product to the cart, and to delete a product.
 */
const useProductListHook = () => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const { t } = useTranslationHook();

  const queryProducts = useQueryProductsHook();

  const data = useMemo(() => {
    return queryProducts.productsData?.products ?? [];
  }, [queryProducts.productsData?.products]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t("products:productId"),
        size: 40,
        cell: (info) => "#" + info.getValue(),
      }),
      columnHelper.accessor("images", {
        header: t("products:image"),
        size: 100,
        cell: (info) => (
          <div className="flex items-center justify-center w-full">
            <ProductImage info={info} />
          </div>
        ),
      }),
      columnHelper.accessor("title", {
        header: t("products:title"),
        size: 120,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: t("products:description"),
        size: 400,
        cell: (info) => (
          <p title={info.getValue()}>
            {info.getValue().length > 120
              ? info.getValue().slice(0, 120) + "..."
              : info.getValue()}
          </p>
        ),
      }),
      columnHelper.accessor("price", {
        header: t("products:price"),
        size: 60,
        cell: (info) => "$" + info.getValue(),
      }),
      columnHelper.accessor("creationAt", {
        header: t("products:createdAt"),
        size: 80,
        cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
      }),
      columnHelper.accessor("updatedAt", {
        header: t("products:updatedAt"),
        size: 80,
        cell: (info) => dayjs(info.getValue()).format("MMM D, YYYY h:mm a"),
      }),
      columnHelper.display({
        header: t("products:actions"),
        size: 200,
        cell: (info) => (
          <div className="flex items-center justify-center gap-2">
            {/* Edit button is now part of ProductModal */}
            <ProductModal mode="edit" selectedProduct={info.row.original} />

            {/* Add to cart or other actions */}
            <Button variant="default" size="icon" className="h-9 w-9">
              <ShoppingCart className="h-4 w-4" />
            </Button>

            {/* Delete button is now part of DeleteProductModal */}
            <DeleteProductModal
              productId={info.row.original.id}
              productTitle={info.row.original.title}
            />
          </div>
        ),
      }),
    ],
    [t]
  );

  return {
    columns,
    data,
    isShowDeleteModal,
    isShowEditModal,
    isShowLoading: queryProducts.isShowLoading,
    setIsShowDeleteModal,
    setIsShowEditModal,
  };
};

export default useProductListHook;
