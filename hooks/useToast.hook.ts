import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * A hook that provides functions to display success and error messages
 * using react-toastify.
 *
 * @returns {Object} An object containing two functions:
 * - `successMessage(text: string)`: Displays a success message with the given text.
 * - `errorMessage(text: string)`: Displays an error message with the given text.
 */
const useToastHook = () => {
  const successMessage = useCallback(
    (text: string) =>
      toast(text, { type: "success", position: "bottom-right" }),
    []
  );

  const errorMessage = useCallback(
    (text: string) => toast(text, { type: "error", position: "bottom-right" }),
    []
  );

  return { successMessage, errorMessage };
};

export default useToastHook;
