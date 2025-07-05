import Image from "next/image";
import { Drawer } from "@/components";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useMobileMenu } from "../hooks/use-mobile-menu.hook";
import { useEffect } from "react";
import { NAVBAR_MENU } from "./menu.data";

interface MobileSidebarProps {
  isVisible: boolean;
  handleToggleMenu: () => void;
}

export const MobileSidebar = ({
  isVisible,
  handleToggleMenu,
}: MobileSidebarProps) => {
  const t = useTranslations("trans.navbar");
  const { toggleSubmenu, isExpanded, closeAllMenus } = useMobileMenu();

  // Close all sub-menus when sidebar closes
  useEffect(() => {
    if (!isVisible) {
      closeAllMenus();
    }
  }, [isVisible]);

  return (
    <Drawer isOpen={isVisible} onClose={handleToggleMenu}>
      <div className={`mobile-header-active mobile-header-wrapper-style`}>
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="mobile-logo">
              <Link className="flex" href="/">
                <Image
                  src="/images/logo.png"
                  alt={t("title")}
                  width={120}
                  height={40}
                  className="w-full"
                />
              </Link>
            </div>
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav className="mt-4">
                  <ul className="mobile-menu font-heading">
                    {NAVBAR_MENU.map((item) => {
                      if (item.submenu) {
                        return (
                          <li className="has-children" key={item.key}>
                            <div
                              className="flex items-center justify-between cursor-pointer"
                              onClick={() => toggleSubmenu(item.key)}
                            >
                              <span className="text-color-primary">
                                {t(item.key)}
                              </span>
                              <svg
                                className={`w-4 h-4 transform transition-transform ${
                                  isExpanded(item.key) ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                            <ul
                              className={`sub-menu overflow-hidden transition-all duration-300 ${
                                isExpanded(item.key)
                                  ? "max-h-48 opacity-100"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              {item.submenu.map((sub) => (
                                <li className="pl-4" key={sub.key}>
                                  <Link
                                    href={sub.href || "#"}
                                    className="block text-sm text-gray-600 hover:text-blue-600"
                                  >
                                    {t(sub.key)}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      }
                      return (
                        <li key={item.key}>
                          <Link
                            className="block text-gray-700 hover:text-blue-600"
                            href={item.href || "#"}
                          >
                            {t(item.key)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
