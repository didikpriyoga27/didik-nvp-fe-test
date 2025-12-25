"use client";

import ButtonComponent from "@/components/atoms/Button";
import { SearchIcon } from "@/components/atoms/Icons";
import InputComponent from "@/components/atoms/Input";
import useQueryStringHook from "@/hooks/useQueryString.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { useCallback, useRef } from "react";

/**
 * A component that renders a search input and a search button.
 *
 * @returns A JSX element representing the search input component.
 */
const SearchInputComponent = () => {
  const keywordRef = useRef<string>("");
  const { t } = useTranslationHook();
  const { setSearchQueryString } = useQueryStringHook();

  const handleSubmit = useCallback(() => {
    setSearchQueryString(keywordRef.current);
  }, [setSearchQueryString]);

  return (
    <div className="flex items-center gap-2">
      <InputComponent
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        onChange={(e) => (keywordRef.current = e.target.value)}
        placeholder={t("commons:search") + "..."}
      />
      <ButtonComponent onClick={handleSubmit}>
        <SearchIcon className="dark:invert" />
      </ButtonComponent>
    </div>
  );
};

export default SearchInputComponent;
