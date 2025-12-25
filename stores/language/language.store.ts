"use client";

import { TLocale } from "@/i18n/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LanguageStore } from "./type";

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en" as TLocale,

      changeLanguage: (language: TLocale) => {
        set({ language });
      },
    }),
    {
      name: "language",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
