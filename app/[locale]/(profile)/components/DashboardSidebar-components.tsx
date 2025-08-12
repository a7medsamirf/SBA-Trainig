"use client"; 
import "./../profile.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import SvgDocumentText from "@/components/icons/profile/document-text";
import SvgFavorites from "@/components/icons/profile/favorites";
import SvgEdit from "@/components/icons/profile/edit";
import SvgBook from "@/components/icons/profile/book";
import SvgDirect from "@/components/icons/profile/direct";
import SvgTeacher from "@/components/icons/profile/teacher";
import SvgQlementineCertificate from "@/components/icons/svg/qlementine-certificate";
import LogoutButtonComponent from "@/components/common/LogoutButton-component";
import { useTranslations } from "next-intl";

export const DashboardSidebarComponents = ({
  userName,
  userId,
  avatar,
}: {
  userName: string;
  userId: string;
  avatar: string;
}) => {
  const pathname = usePathname();
  const t = useTranslations("trans.profile");

  const profileLinks = [
    { label: t("profile-title"), icon: <SvgEdit />, href: "/profile" }, 
    { label: t("qualifications-title"), icon: <SvgTeacher />, href: "/qualifications" },
    { label: t("courses-title"), icon: <SvgBook />, href: "/courses" },
    { label: t("certificates-title"), icon: <SvgQlementineCertificate />, href: "/certificates" },
    { label: t("course-request-title"), icon: <SvgDirect />, href: "/course-request" },
    { label: t("invoices-title"), icon: <SvgDocumentText />, href: "/invoices" },
    { label: t("favourite-title"), icon: <SvgFavorites />, href: "/favourite" },
];

  return (
    <div className="profile-sidebar">
      <ul className="sub-menu d-block">
        <div className="profile-header p-5">
        <Image
              src={
                avatar && avatar.trim() !== ""
                  ? avatar.replace(/\\/g, "/").trim()
                  : "/images/trainers/trainer01.png"
              }
              alt={userName}
              width={100}
              height={100}
              priority
              className="profile-Image rounded-circle"
            />

          <div className="profile-info">
            <span className="profile-name mb-2">{t("hello")}, {userName}</span>
            <span className="welcome-text">ID: {userId}</span>
          </div>
        </div>

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
    </div>
  );
};