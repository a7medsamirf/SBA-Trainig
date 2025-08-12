"use client";
import { Link } from "@/i18n/routing";

import { useToggleMenuScreenSize } from "@/hooks";
import {
  DesktopMenu,
  MobileSidebar,
  BurgerMenu,
  NavbarLogo,
  ProfileComponent,
} from "./components";
import { NotificationClientComponent } from "./components/notification/NotificationClientComponent";
import { CartMenuItem } from "./components/cart-component";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import SvgCalendar2 from "@/components/icons/svg/calendar-2";
import { useTranslations } from "next-intl";

import "./navbar.scss";

interface Props {
  notifications: any[];
  userName: string;
  cartCount: number;
  avatar: string;
  ongoing: any[];
}

export default function Navbar({notifications, userName, avatar, cartCount, ongoing}: Props) {
  
  const { handleToggleMenu, isMobile, toggle } = useToggleMenuScreenSize();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const locale = useLocale();
  // Scroll لأعلى الصفحة عند التنقل
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Sticky Navbar عند Scroll
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const t = useTranslations("trans");
  return (
    <div className="navbar-wrapper">
      <div className="header-container-wrapper">
        <header
          className={`header header-container sticky-bar ${
            isScrolled ? "stick" : ""}`}
        >
          <div className="px-4 mx-auto container-fluid">
            <div className="main-header">
              <div className="flex gap-4 items-center header-left">
                {isMobile && (
                  <BurgerMenu toggle={!!toggle} onClick={handleToggleMenu} />
                )}
                <NavbarLogo />
                <div className="header-nav text-start">
                  <DesktopMenu />
                </div>
              </div>
             
                  {!session && (
                     <div className="flex gap-4 items-center setting  buttons-right">
                          <div className="d-inline-flex gap-3 navbar-buttons">
                              <Link href="/register" className="btn btn-primary">{t("register")}</Link>
                              <Link href="/login" className="btn btn-outline-primary"> {t("login")}</Link>
                            </div>
                         </div>
                  )}
                {session && (
                  <div className="flex gap-4 items-center setting header-right">
                  <ul className="main-menu profile-menu">
                    <li className="has-children item.submenu">
                      <Link href="/calendar">
                        <SvgCalendar2 width={22} />
                      </Link>
                    </li>

                    <CartMenuItem cartCount={cartCount} />
                    <NotificationClientComponent
                      notifications={notifications}
                    />
                    <ProfileComponent userName={userName} avatar={avatar} ongoing={ongoing} />
                  </ul>
                  </div>
                )}
              
            </div>
          </div>
        </header>
      </div>

      <MobileSidebar
        isVisible={isMobile && !!toggle}
        handleToggleMenu={handleToggleMenu}
      />
    </div>
  );
}
