import { useLanguageStore } from "@/stores/language";
import { TRANSLATIONS } from ".";
import { TFileAndProperties, TLocale, TNodes } from "./type";

/**
 * A hook to translate strings according to the current language.
 *
 * The hook takes advantage of the TRANSLATIONS object to translate strings.
 * It uses the language from the language store to determine the language of the
 * translation.
 *
 * The hook returns an object with three properties: t, language, and changeLanguage.
 * - t: A function that takes a file and property as a string and returns the
 * translated string. The string should be in the format of "file:property".
 * - language: The current language of the application.
 * - changeLanguage: A function to change the language of the application.
 *
 * @returns {Object} An object with t, language, and changeLanguage properties.
 */
const useTranslationHook = () => {
  const { language, changeLanguage } = useLanguageStore();

  const t = (fileAndProperty: TFileAndProperties) => {
    const splittedString = fileAndProperty.split(":");
    const section = splittedString[0] as TNodes;
    const identifier = splittedString[1];
    const translationValue: string =
      TRANSLATIONS[language as TLocale][section][identifier];

    return translationValue;
  };

  return { t, language, changeLanguage };
};

export default useTranslationHook;
