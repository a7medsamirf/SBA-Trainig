import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";


const FooterLogo = () => {

  const t = useTranslations("trans.navbar");
  const locale = useLocale();

  return (
    <div className="footer-bottom-1">
    <div className="container">
        <div className="footer-2-top mb-20">
    <div className="footer-logo">
      <Link href="/">
        <Image
          src={`/images/${locale === "ar" ? "logo_ar.png" : "logo.png"}`}
          alt={t("title")}
          width={500}
          height={500}
          className="w-full"
        />
      </Link>
    </div>
    </div>
                  </div>
              </div>
  );
};
export default FooterLogo