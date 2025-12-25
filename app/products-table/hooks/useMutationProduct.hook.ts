import { Product } from "@/components/sections/product-grid";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";
import { CreateProductParams } from "../type";

/**
 * A hook for creating and deleting products.
 *
 * The hook uses the useMutation hook from react-query to create and delete products
 * on the server. The hook returns an object with two properties: mutateCreateProduct
 * and mutateDeleteProduct. These properties are functions that can be used to create
 * and delete products respectively.
 *
 * The functions returned by the hook take care of handling the mutation of the data
 * on the server. The functions also handle refetching the data after the mutation
 * has been completed.
 *
 * @returns {Object} An object containing two properties: mutateCreateProduct and
 * mutateDeleteProduct. These properties are functions that can be used to create
 * and delete products respectively.
 */
const useMutationProductHook = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const createProduct = useCallback(
    async (data: CreateProductParams) =>
      axios.post<CreateProductParams>(`${baseUrl}/products/add`, data),
    [baseUrl]
  );

  const updateProduct = useCallback(
    async ({ data, id }: { data: CreateProductParams; id: Product["id"] }) =>
      axios.put(`${baseUrl}/products/${id}`, data),
    [baseUrl]
  );

  const deleteProduct = useCallback(
    async (id: Product["id"]) => axios.delete(`${baseUrl}/products/${id}`),
    [baseUrl]
  );

  const { mutateAsync: mutateCreateProduct } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
  });

  const { mutateAsync: mutateUpdateProduct } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: updateProduct,
  });

  const { mutateAsync: mutateDeleteProduct } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
  });

  return { mutateCreateProduct, mutateUpdateProduct, mutateDeleteProduct };
};

export default useMutationProductHook;
