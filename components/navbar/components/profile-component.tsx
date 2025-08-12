"use client";
import "../navbar.scss";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import SvgEdit from "@/components/icons/profile/edit";
import SvgBook from "@/components/icons/profile/book";
import SvgProfile from "@/components/icons/svg/profile";
import SvgDocumentText from "@/components/icons/profile/document-text";
import SvgFavorites from "@/components/icons/profile/favorites";
import SvgDirect from "@/components/icons/profile/direct";
import SvgTeacher from "@/components/icons/profile/teacher";
import SvgQlementineCertificate from "@/components/icons/svg/qlementine-certificate";
import LogoutButtonComponent from "@/components/common/LogoutButton-component";
import { useTranslations } from "next-intl";
import CurrentCourseCardComponent from "./CurrentCourse-Card-component";

interface Props {
  userName: string;
  avatar: string;
  ongoing: any[];

}

export const ProfileComponent = ({ userName,avatar, ongoing }: Props) => {
  const pathname = usePathname();
  const t = useTranslations("trans.profile");

  const profileLinks = [
    { label: t("profile-title"), icon: <SvgEdit />, href: "/profile" }, 
    { label: t("qualifications-title"), icon: <SvgTeacher />, href: "/qualifications" },
    { label: t("courses-title"), icon: <SvgBook />, href: "/courses" },
    { label: t("certificates-title"), icon: <SvgQlementineCertificate />, href: "/certificates" },
    { label: t("course-request-title"), icon: <SvgDirect />, href: "/course-request" },
    { label: t("invoices-title"), icon: <SvgDocumentText />, href: "/invoices" },
    { label: t("dashboard-title"), icon: <SvgBook />, href: "/dashboard" },
    { label: t("favourite-title"), icon: <SvgFavorites />, href: "/favourite" },
  ];
  

  return (
    <li className="has-children item.submenu profile-dropdown">
      <Link className="dropdown-link" href="#">
        <SvgProfile width={20} />
      </Link>
      <ul className="sub-menu d-block p-3">
        <div className="profile-header">
          <Image
            src={
              avatar && avatar.trim() !== ""
                ? avatar.replace(/\\/g, "/").trim()
                : "/images/trainers/trainer01.png"
            }
            alt={userName || "User Avatar"}
            width={40}
            height={40}
            priority
            className="profile-Image rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />

          <div className="profile-info">
          <span className="profile-name mb-1">{t("hello")}, {userName}</span>
          <span className="welcome-text">{t("Welcome")}</span>
          </div>
        </div>

        {/* عرض كارت الدورة الحالية إذا كان موجوداً */}
        {ongoing && ongoing.length > 0 && (
          <div
            className="col mb-3"
            key={`${ongoing[0].course_id}-${ongoing[0].qr_code}`}
          >
            <CurrentCourseCardComponent
              status="ongoing"
              id={ongoing[0].id}
              course_id={ongoing[0].course_id}
              course_category={ongoing[0].course_category}
              course_name={ongoing[0].course_name}
              course_image={ongoing[0].course_image}
              attendance_percentage={ongoing[0].attendance_percentage}
              qr_code={ongoing[0].qr_code}
            />
          </div>
        )}

        <div className="profile-links">
          {profileLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.endsWith(link.href);
            return (
              <span
                className={`list-item ${isActive ? "active" : ""}`}
                key={link.label}
              >
                <Link href={link.href}>
                  <span className="list-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </span>
            );
          })}
        </div>

        <LogoutButtonComponent />
      </ul>
    </li>
  );
};