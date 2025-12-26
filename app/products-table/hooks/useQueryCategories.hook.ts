import { formatCategory } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

/**
 * A hook for fetching the list of categories with pagination support.
 *
 * The hook returns an object with the following properties:
 * - categoryOptions: An array of category options formatted for use in select inputs.
 * - limit: The current limit of categories per page.
 *
 * The hook uses the useQuery hook from react-query to fetch the categories
 * from the server. It handles the pagination by utilizing the limit from
 * the URL search parameters.
 *
 * @returns {Object} An object containing categoryOptions and limit.
 */
const useQueryCategoriesHook = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchCategories = useCallback(async () => {
    const response = await axios.get(`${baseUrl}/products/category-list`);
    return response.data;
  }, [baseUrl]);

  const { data: categoriesData, isLoading } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    placeholderData: keepPreviousData,
  });

  const categoryOptions: { label: string; value: string }[] =
    categoriesData?.map((category) => ({
      value: category,
      label: formatCategory(category),
    })) ?? [];

  return {
    categoryOptions,
    isLoading,
  };
};

export default useQueryCategoriesHook;
