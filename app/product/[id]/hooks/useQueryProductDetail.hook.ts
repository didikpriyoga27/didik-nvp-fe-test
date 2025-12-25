import { Product } from "@/components/sections/product-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * A hook for fetching a single product's details by ID.
 *
 * The hook returns an object with the following properties:
 * - product: The product data.
 * - isLoading: A boolean indicating whether the data is being fetched.
 * - error: Any error that occurred during fetching.
 * - refetch: A function to refetch the data.
 *
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Object} An object with the properties as described above.
 */
const useQueryProductDetailHook = (productId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchProductDetail = async (): Promise<Product> => {
    const response = await axios.get(`${baseUrl}/products/${productId}`);
    return response.data;
  };

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: fetchProductDetail,
    enabled: !!productId, // Only fetch if productId exists
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return {
    product,
    isLoading,
    error,
    refetch,
  };
};

export default useQueryProductDetailHook;
