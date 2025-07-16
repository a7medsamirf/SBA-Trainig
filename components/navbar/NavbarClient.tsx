"use client";

import Link from "next/link";
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
import {  useLocale} from "next-intl"; 
import SvgCalendar2 from "@/components/icons/svg/calendar-2";

import "./navbar.scss";

export default function Navbar({
  notifications,
  userName,
}: {
  notifications: any[];
  userName: string;
}) {
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

  return (
    <div className="navbar-wrapper">
      <div className="header-container-wrapper">
        <header
          className={`header header-container sticky-bar ${
            isScrolled ? "stick" : ""
          }`}
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
              <div className="setting flex items-center gap-4 header-right">
                {session && (
                  <ul className="main-menu profile-menu">
                      <li className="has-children item.submenu">
                          <Link href={`${locale === "en" ? "en" : "ar"}/calendar`}>
                            <SvgCalendar2 width={24} />
                        </Link>
                        </li>
                    
                    <CartMenuItem />
                    <NotificationClientComponent
                      notifications={notifications}
                    />
                    <ProfileComponent userName={userName} />
                  </ul>
                )}
              </div>
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
