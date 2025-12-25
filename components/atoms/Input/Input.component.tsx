import { ReactElement } from "react";

/**
 * A basic input component.
 *
 * @example
 * <InputComponent />
 *
 * @returns {ReactElement} A JSX element representing the input component.
 */
const InputComponent = (
  props: React.InputHTMLAttributes<HTMLInputElement>
): ReactElement => {
  return (
    <input
      className="bg-gray-200 dark:bg-gray-800 rounded-full p-2 px-4 text-black dark:text-white"
      {...props}
    />
  );
};

export default InputComponent;
