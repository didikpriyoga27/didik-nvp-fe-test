"use client";

import { Button } from "@/components/ui/button";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { useCallback } from "react";

export function LanguageButton() {
  const { language, changeLanguage } = useTranslationHook();

  const handleToggleLanguage = useCallback(() => {
    changeLanguage(language === "en" ? "id" : "en");
  }, [changeLanguage, language]);

  return (
    <Button
      onClick={handleToggleLanguage}
      variant="ghost"
      className="p-2 mr-2 w-10 h-10 hover:bg-secondary rounded-full transition-colors relative"
      aria-label="Language toggle"
    >
      <div>{language === "en" ? "🇬🇧" : "🇮🇩"}</div>
    </Button>
  );
}
