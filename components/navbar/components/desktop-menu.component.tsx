import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { desktopMenuData } from "./menu.data";
import LanguageSwitcher from "./LanguageSwitcher";

export const DesktopMenu = () => {
  const t = useTranslations("trans.navbar");

  return ( 
    <nav className="d-none d-xl-block min-[1200px]:flex justify-end">
      <ul className="main-menu">
        {desktopMenuData.map((item) => (
          <li key={item.key} className={item.submenu ? "has-children" : ""}>
            <Link href={item.href || "#"}>
              {t(item.key)}
            </Link>
            {item.submenu && (
              <ul className="sub-menu two-col">
                {item.submenu.map((child) => (
                  <li key={child.key}>
                    <Link href={child.href || "#"}>{t(child.key)}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <LanguageSwitcher />
      </ul>
    </nav>
  );
};
