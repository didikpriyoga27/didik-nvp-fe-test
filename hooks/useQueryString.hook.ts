import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * A hook that provides functions to manipulate the query string in the URL.
 *
 * It returns an object with two functions:
 * - `createQueryString(name: string, value: string)`: Creates a query string
 *   with a given name and value.
 * - `setSearchQueryString(keyword: string)`: Sets the query string to contain
 *   the given keyword. If the keyword is empty, it removes the query string.
 */

const useQueryStringHook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQueryString = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams]
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setSearchQueryString = useCallback(
    (keyword: string) => {
      if (!keyword) {
        createQueryString("search", "");
        router.push(pathname);
        return;
      }
      router.push(pathname + "?" + createQueryString("search", keyword));
    },
    [createQueryString, pathname, router]
  );

  return {
    createQueryString,
    getQueryString,
    setSearchQueryString,
  };
};

export default useQueryStringHook;
