"use client";

import ButtonComponent from "@/components/atoms/Button";
import TypographyComponent from "@/components/atoms/Typography";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { ReactElement, useCallback } from "react";

/**
 * A component to toggle the language of the application between English and
 * Indonesian.
 *
 * It uses the useTranslationHook to get the current language and the
 * changeLanguage function to update the language when the button is clicked.
 *
 * @returns {ReactElement} A JSX element representing the component.
 */
const LanguageToggleComponent = (): ReactElement => {
  const { language, changeLanguage } = useTranslationHook();

  const handleToggleLanguage = useCallback(() => {
    changeLanguage(language === "en" ? "id" : "en");
  }, [changeLanguage, language]);

  return (
    <ButtonComponent onClick={handleToggleLanguage}>
      <TypographyComponent className="uppercase">
        {language}
      </TypographyComponent>
    </ButtonComponent>
  );
};

export default LanguageToggleComponent;
