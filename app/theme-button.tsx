"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

export function ThemeButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, systemTheme, setTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [setTheme, systemTheme, theme]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <Button
      onClick={handleToggleTheme}
      variant="ghost"
      className="p-2 w-10 h-10 hover:bg-secondary rounded-full transition-colors relative"
      aria-label="Theme toggle"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
