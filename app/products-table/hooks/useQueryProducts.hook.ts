import useQueryStringHook from "@/hooks/useQueryString.hook";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Product } from "../type";

/**
 * A hook for fetching the list of products based on search query and pagination.
 *
 * The hook returns an object with the following properties:
 * - productsData: The list of products.
 * - refetch: A function to refetch the data.
 * - page: The current page number.
 * - limit: The current limit of items per page.
 * - setPage: A function to set the current page number.
 * - incrementPage: A function to increment the current page number.
 * - decrementPage: A function to decrement the current page number.
 * - isShowLoading: A boolean indicating whether the data is being fetched or not.
 *
 * The hook also handles the pagination by updating the URL query string.
 *
 * @returns {Object} An object with the properties as described above.
 */
const useQueryProductsHook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page") ?? 1) || 1;
  const limit = Number(searchParams.get("limit") ?? 10);
  const skip = (page - 1) * limit;

  const { createQueryString } = useQueryStringHook();

  const setPage = useCallback(
    (newPage: number) => {
      router.push(
        pathname + "?" + createQueryString("page", newPage.toString())
      );
    },
    [createQueryString, pathname, router]
  );

  const incrementPage = useCallback(() => setPage(page + 1), [page, setPage]);
  const decrementPage = useCallback(() => setPage(page - 1), [page, setPage]);

  const fetchProducts = useCallback(async () => {
    const response = await axios.get(
      `${baseUrl}/products?skip=${skip}&limit=${limit}${
        search ? `/search=q${encodeURIComponent(search)}` : ""
      }`
    );
    return response.data;
  }, [baseUrl, limit, skip, search]);

  const {
    data: productsData,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery<{ products: Product[]; total: number; limit: number }>({
    queryKey: ["products", page, limit, search],
    queryFn: fetchProducts,
    placeholderData: keepPreviousData,
  });

  return {
    productsData,
    refetch,
    page,
    limit,
    setPage,
    incrementPage,
    decrementPage,
    isShowLoading: isLoading || isRefetching,
  };
};

export default useQueryProductsHook;
