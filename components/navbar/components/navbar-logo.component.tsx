import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export const NavbarLogo = () => {
  const t = useTranslations("trans.navbar");
  const locale = useLocale();

  return (
    <>
     <div className="header-logo d-none d-xl-block">
      <Link href="/">
        <Image
          src={`/images/${locale === "ar" ? "logo_ar.png" : "logo.png"}`}
          alt={t("title")}
          width={150}
          height={50}
          className="w-full"
        />
      </Link>
    </div>

    <div className="header-logo d-block d-xl-none">
      <Link href="/">
        <Image
          src={`/images/mobile-logo.png`}
          alt={t("title")}
          width={40}
          height={40}
          className="w-auto"
        />
      </Link>
    </div>
    </>
  );
};
