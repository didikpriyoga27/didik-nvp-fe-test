import { cva } from "class-variance-authority";

const ButtonVariants = cva(
  "transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none rounded-full py-2 px-4 line-clamp-1",
  {
    variants: {
      intent: {
        info: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 text-white",
        warning:
          "bg-yellow-400 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800 text-white",
        danger:
          "bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white",
        success:
          "bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 text-white",
        default:
          "bg-gray-200 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-400 text-black dark:text-white",
      },
    },

    defaultVariants: {
      intent: "default",
    },
  }
);

export { ButtonVariants };
