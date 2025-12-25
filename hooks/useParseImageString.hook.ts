import { useCallback } from "react";

/**
 * A hook for parsing an image string from a given string.
 *
 * The hook takes no props and returns an object with a single property,
 * `parseImageString`, which is a function that takes a string and returns the
 * parsed image string.
 *
 * The `parseImageString` function uses a regular expression to match the URL
 * in the given string. If the string does not contain a URL, the function
 * returns an empty string.
 *
 * @returns {Object} An object with a single property, `parseImageString`,
 * which is a function that takes a string and returns the parsed image string.
 */
const useParseImageStringHook = () => {
  const parseImageString = useCallback((str: string) => {
    return str.match(/https?:\/\/[^\\"\]]+/)?.[0];
  }, []);

  return { parseImageString };
};

export default useParseImageStringHook;
