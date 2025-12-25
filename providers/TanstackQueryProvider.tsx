"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSX, PropsWithChildren, useState } from "react";

/**
 * A React Query provider component that wraps the app with a QueryClient.
 *
 * This component sets up a QueryClient with a default stale time of 1 minute.
 * The component is client-side only, so it will not be rendered on the server.
 *
 * @param {PropsWithChildren} props - The props object, which contains a
 * `children` property that is the child component to be rendered.
 *
 * @returns {JSX.Element} A JSX element representing the React Query provider.
 */
const TanstackQueryProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
