import { en, id } from "./locales";
import { TLocale, TNodes } from "./type";

export const TRANSLATIONS: Record<
  TLocale,
  Record<TNodes, { [key: string]: string }>
> = {
  id,
  en,
};
