"use client";
import "../profile.scss";
import Image from "next/image";
import SvgProfile from "@/components/icons/svg/profile";
import SvgLogincurve from "@/components/icons/profile/logincurve";
import SvgEdit from "@/components/icons/profile/edit";
import SvgBook from "@/components/icons/profile/book";
import { Link, usePathname } from "@/i18n/routing";

import SvgDocumentText from "@/components/icons/profile/document-text";

import SvgVector from "@/components/icons/profile/vector";

const profileLinks = [
  {label: "تعديل الملف الشخصي",icon: <SvgEdit />, href: "/profile",},
  { label: "دوراتي", icon: <SvgBook />, href: "/courses" },
  { label: "الشهادات", icon: <SvgBook />, href: "/certificates" },
  { label: "الفواتير", icon: <SvgDocumentText />, href: "/bills" },
  { label: "المفضلة", icon: <SvgVector />, href: "/favourite" },
];

export const DashboardSidebarComponents = () => {
  const pathname = usePathname();
  return (
    <>
  
        <div className="has-children item.submenu  profile-sidebar">
              <ul className="sub-menu d-block">
                <div className="profile-header p-5">
                  <Image
                    src="/images/trainers/trainer01.png"
                    alt="profile"
                    width={100}
                    height={100}
                    className="rounded-circle"
                  />
                  <div className="profile-info">
                    <span className="profile-name mb-2">أهلاً، احمد عبدالله</span>
                    <span className="welcome-text">  ID:23r89qeq99e </span>
                  </div>
                </div>
            
                <div className="profile-links">
                {profileLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.endsWith(link.href);
                  return (
                    <span className={`list-item ${isActive ? "active" : ""}`} key={link.label}>
                      <Link href={link.href}>
                        <span className="list-icon">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    </span>
                  );
                })}
                </div>
                <div className="logout-section">
                  <Link
                    className="d-flex "
                    href="/logout"
                  >
                    <SvgLogincurve />
                    <span>تسجيل الخروج</span>
                  </Link>
                </div>
              </ul>
            </div>
    </>
  )
}

