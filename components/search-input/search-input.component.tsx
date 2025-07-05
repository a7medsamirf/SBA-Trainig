"use client";

import "./search-input.scss";
import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  useCallback,
  useState,
} from "react";
import { cn, createQueryString } from "@/utils";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

interface Props {
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchInput: React.FC<Props> = memo(
  ({ placeholder, onChange, onKeyPress, className, defaultValue = "" }) => {
    const t = useTranslations("trans");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Local state for controlled input
    const [searchValue, setSearchValue] = useState(defaultValue);

    const updateSearch = (value: string) => {
      const prevQueries = Object.fromEntries(searchParams.entries());

      const query = createQueryString({
        ...prevQueries,
        search: value,
      });
      router.replace(`${pathname}?${query}`, { scroll: false });
    };

    // Handle input changes
    const handleSearch = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target?.value || "";
        setSearchValue(value);

        value === "" && updateSearch("");

        onChange?.(e);
      },
      [onChange]
    );

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSearch(searchValue);
        }}
        className={cn("search-input__wrapper", className)}
      >
        <label
          htmlFor="search"
          className="search-input__icon"
          onClick={() => updateSearch(searchValue)} // Update search on label click
        >
          <span className="text-gray-500">🔍</span>
        </label>
        <input
          className="search-input"
          id="search"
          type="search"
          placeholder={placeholder || t("common.search")}
          onChange={handleSearch}
          onInput={handleSearch}
          onKeyPress={onKeyPress}
          defaultValue={defaultValue}
        />
      </form>
    );
  }
);
