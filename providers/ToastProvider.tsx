"use client";

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

/**
 * A provider component that wraps the app with a toast container.
 *
 * This component is client-side only and uses the react-toastify library to
 * provide a toast container that can be used by the useToast hook.
 *
 * @example
 * <ToastProvider>
 *  <App />
 * </ToastProvider>
 *
 * @param {PropsWithChildren} props - The props for the component.
 * @param {ReactNode} props.children - The child components to be rendered within the toast container.
 *
 * @returns {ReactElement} A JSX element representing the toast provider component.
 */
export default function ToastProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
