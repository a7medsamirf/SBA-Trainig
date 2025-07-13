"use client"; 
import "./../profile.scss";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import SvgDocumentText from "@/components/icons/profile/document-text";
import SvgFavorites from "@/components/icons/profile/favorites";
import SvgEdit from "@/components/icons/profile/edit";
import SvgBook from "@/components/icons/profile/book";
import LogoutButtonComponent from "@/components/common/LogoutButton-component";

const profileLinks = [
  { label: "الملف الشخصي", icon: <SvgEdit />, href: "/profile" },
  { label: "مؤهلاتي العلمية", icon: <SvgBook />, href: "/qualifications" },
  { label: "دوراتي", icon: <SvgBook />, href: "/courses" },
  { label: "الشهادات", icon: <SvgBook />, href: "/certificates" },
  { label: "الفواتير", icon: <SvgDocumentText />, href: "/invoices" },
  { label: "المفضلة", icon: <SvgFavorites />, href: "/favourite" },
];

export const DashboardSidebarComponents = ({
  userName,
  userId,
}: {
  userName: string;
  userId: string;
}) => {
  const pathname = usePathname();

  return (
    <div className="profile-sidebar">
      <ul className="sub-menu d-block">
        <div className="profile-header p-5">
          <Image
            src="/images/trainers/trainer01.png"
            alt="profile"
            width={100}
            height={100}
            priority
            className="rounded-circle"
          />
          <div className="profile-info">
            <span className="profile-name mb-2">أهلاً، {userName}</span>
            <span className="welcome-text">ID: {userId}</span>
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

        <LogoutButtonComponent />
      </ul>
    </div>
  );
};
