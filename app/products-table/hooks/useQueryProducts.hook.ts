"use client";

import { Product } from "@/app/products/type";
import useQueryStringHook from "@/hooks/useQueryString.hook";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * A hook for fetching the list of products with search, sort, and filter capabilities.
 *
 * The hook returns an object with the following properties:
 * - productsData: The list of products with total and limit.
 * - refetch: A function to refetch the data.
 * - page: The current page number.
 * - limit: The current limit of items per page.
 * - setPage: A function to set the current page number.
 * - incrementPage: A function to increment the current page number.
 * - decrementPage: A function to decrement the current page number.
 * - isShowLoading: A boolean indicating whether the data is being fetched or not.
 *
 * The hook also handles pagination, search, sorting, and category filtering.
 *
 * @returns {Object} An object with the properties as described above.
 */
const useQueryProductsHook = (isPaginated = true) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const order = searchParams.get("order") || "asc";
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
    let url = `${baseUrl}/products`;

    // Build URL based on filters
    if (search) {
      // Search endpoint
      url = `${baseUrl}/products/search?q=${encodeURIComponent(search)}`;
    } else if (category) {
      // Category filter endpoint
      url = `${baseUrl}/products/category/${encodeURIComponent(category)}`;
    }

    const params = new URLSearchParams();
    if (isPaginated) {
      // Add pagination
      params.set("limit", limit.toString());
      params.set("skip", skip.toString());
    }

    // Add sorting
    if (sortBy) {
      params.set("sortBy", sortBy);
      params.set("order", order);
    }

    // Combine URL with params
    const separator = url.includes("?") ? "&" : "?";
    const finalUrl = `${url}${separator}${params.toString()}`;

    const response = await axios.get(finalUrl);
    return response.data;
  }, [baseUrl, search, category, isPaginated, sortBy, limit, skip, order]);

  const {
    data: productsData,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery<{ products: Product[]; total: number; limit: number }>({
    queryKey: [
      "products",
      isPaginated,
      page,
      limit,
      search,
      category,
      sortBy,
      order,
    ],
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
