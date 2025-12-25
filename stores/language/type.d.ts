export interface Language {
  language: TLocale;
}

export interface LanguageStore extends Language {
  changeLanguage: (language: TLocale) => void;
}
