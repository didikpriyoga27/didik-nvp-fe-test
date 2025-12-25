"use client";

import { DarkModeIcon } from "@/components/atoms/Icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useCallback } from "react";

export function ThemeButton() {
  const { theme, systemTheme, setTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [setTheme, systemTheme, theme]);

  return (
    <Button
      onClick={handleToggleTheme}
      variant="ghost"
      className="p-2 hover:bg-secondary rounded-full transition-colors relative"
      aria-label="Shopping cart"
    >
      <DarkModeIcon className="w-6 h-6" />
    </Button>
  );
}
