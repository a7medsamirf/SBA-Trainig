"use client";
import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { locales } from "@/i18n";
import { useTranslations } from "next-intl";

const LanguageSwitcher = () => {
  const t = useTranslations("trans.navbar");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const getLabel = (loc: string) => (loc === "ar" ? "العربية" : "English");
  const getIcon = (loc: string) =>
    loc === "ar" ? "/images/svg/AR.svg" : "/images/svg/EN.svg";

  const handleChange = (newLocale: string) => {
    if (newLocale !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
      });
    }
  };
  return (
    <li className="has-children language">
      <a
        className="languageDropdown btn btn-light d-flex align-items-center gap-2"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ minWidth: 90 }}
      >
        <Image
          src={getIcon(locale)}
          alt={getLabel(locale)}
          width={20}
          height={20}
        />
        <span>{getLabel(locale)}</span>
      </a>
      <ul className="sub-menu two-col">
        <p className="lang-text"> {t("Select-language")} </p>
        {locales.map((loc) => (
          <li key={loc}>
            <a
              type="button"
              onClick={() => handleChange(loc)}
              className={`d-flex align-items-center gap-2${
                loc === locale ? " active" : ""
              }`}
              aria-current={loc === locale ? "true" : undefined}
            >
              <Image
                src={getIcon(loc)}
                alt={getLabel(loc)}
                width={20}
                height={20}
              />
              <span>{getLabel(loc)}</span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default LanguageSwitcher;
