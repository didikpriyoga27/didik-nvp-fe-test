"use client";

import ButtonComponent from "@/components/atoms/Button";
import { DarkModeIcon } from "@/components/atoms/Icons";
import { useTheme } from "next-themes";
import { ReactElement, useCallback } from "react";

/**
 * A component for toggling between dark and light theme.
 *
 * @returns {ReactElement} A JSX element representing the component.
 */
const DarkModeToggleComponent = (): ReactElement => {
  const { theme, systemTheme, setTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    if (theme === "dark" || (theme === "system" && systemTheme === "dark")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [setTheme, systemTheme, theme]);

  return (
    <ButtonComponent onClick={handleToggleTheme}>
      <DarkModeIcon className="dark:invert" />
    </ButtonComponent>
  );
};

export default DarkModeToggleComponent;
