"use client";
import Link from 'next/link'
import { useToggleMenuScreenSize } from "@/hooks";
import {
  DesktopMenu,
  MobileSidebar,
  BurgerMenu,
  NavbarLogo,
  NotificationComponent,
  ProfileComponent
} from "./components";
import "./navbar.scss";
import { useEffect, useState, useCallback } from "react";
import SvgShop from '@/components/icons/svg/shop'



export default function Navbar() {
  const { handleToggleMenu, isMobile, toggle } = useToggleMenuScreenSize();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const shouldBeSticky = scrollPosition > 300;
    
    if (shouldBeSticky !== isScrolled) {
      setIsScrolled(shouldBeSticky);
    }
  }, [isScrolled]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <div className="navbar-wrapper">
      <div className="header-container-wrapper">
        {/* Header Start */}
        <header className={`header header-container sticky-bar ${isScrolled ? 'stick' : ''}`}>
          <div className="container-fluid mx-auto px-4">
            <div className="main-header">
              <div className="flex items-center gap-4 header-left">
                {isMobile && (
                  <BurgerMenu toggle={!!toggle} onClick={handleToggleMenu} />
                )}
                <NavbarLogo />
                <div className="header-nav text-start">
                  <DesktopMenu />
                </div>
              </div>
              <div className="setting flex items-center gap-4 header-right">
              <ul className="main-menu">
                    <li className="has-children item.submenu Shop">
                      <Link href="#">
                      <SvgShop width={20} />
                      <span className="badge">2</span>
                      </Link>
                        <ul className="sub-menu two-col">
                            <li >
                              <Link href="#">Cart</Link>
                            </li>
                        </ul>
                    </li>
                  <NotificationComponent />
                  <ProfileComponent />
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isVisible={isMobile && !!toggle}
        handleToggleMenu={handleToggleMenu}
      />
    </div>
  );
}
