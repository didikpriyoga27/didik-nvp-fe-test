import { Footer } from "@/app/footer";
//@ts-expect-error valid import
import "@/app/globals.css";
import { Navbar } from "@/app/navbar";
import { TanstackQueryProvider, ToastProvider } from "@/providers";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { PropsWithChildren, Suspense } from "react";
import { ThemeButton } from "./theme-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Didik Priyoga",
  description: "Your next e-commerce store",
};

async function AppWrapper({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold">
                Didik Priyoga
              </Link>
              <Navbar />
            </div>
            <Suspense>
              <div className="justify-end flex-row gap-4">
                <ThemeButton />
              </div>
            </Suspense>
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <TanstackQueryProvider>
            <Suspense fallback={null}>
              <ToastProvider>
                <AppWrapper>{children}</AppWrapper>
              </ToastProvider>
            </Suspense>
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
