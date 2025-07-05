"use client";
import "../navbar.scss";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import SvgEdit from "@/components/icons/profile/edit";
import SvgBook from "@/components/icons/profile/book";

import SvgProfile from "@/components/icons/svg/profile";
import SvgDocumentText from "@/components/icons/profile/document-text";
import SvgLogincurve from "@/components/icons/profile/logincurve";
import SvgVector from "@/components/icons/profile/vector";

const profileLinks = [
  {label: "تعديل الملف الشخصي",icon: <SvgEdit />, href: "/profile",},
  { label: "دوراتي", icon: <SvgBook />, href: "/my-courses" },
  { label: "الشهادات", icon: <SvgBook />, href: "/certificates" },
  { label: "الفواتير", icon: <SvgDocumentText />, href: "/invoices" },
  { label: "لوحة التحكم", icon: <SvgBook />, href: "/dashboard" },
  { label: "المفضلة", icon: <SvgVector />, href: "/favorites" },
];

export const ProfileComponent = () => {
  return (
    <li className="has-children item.submenu  profile-dropdown">
      <Link className="dropdown-link" href="#">
        <SvgProfile width={20} />
      </Link>
      <ul className="sub-menu d-block p-3">
        <div className="profile-header">
          <Image
            src="/images/trainers/trainer01.png"
            alt="profile"
            width={40}
            height={40}
            className="rounded-circle"
          />
          <div className="profile-info">
            <span className="profile-name mb-1">أهلاً، احمد عبدالله</span>
            <span className="welcome-text">مرحبا بك</span>
          </div>
        </div>
        <div className="current-course-card">
          <p className="card-title mb-3">الدورة الحالية</p>
          <div className="course-details">
            <Image
              src="/images/courses/AIInProduction.jpg"
              alt="course"
              width={60}
              height={60}
            />
            <div className="course-info mb-3">
              <p className="course-category">الصحافة التلفزيونية والإذاعية</p>
              <h5 className="course-name">التقرير التلفزيوني الإبداعي</h5>
              <div className="mt-2">
                <div className="progress">
                  <div
                    className="progress-bar "
                    role="progressbar"
                    style={{ width: "85%" }}
                    aria-valuenow={85}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
                <p className="progress-text">85% مكتمل</p>
              </div>
            </div>
          </div>

          <div className="course-actions">
            <button className="btn btn-cart btn-outline-custom btn-sm">
              {" "}
              عرض QR Code
            </button>
            <button className="btn btn-buy btn-custom-primary btn btn-primary btn=dm">
              عرض التفاصيل
            </button>
          </div>
        </div>
        <div className="profile-links">
          {profileLinks.map((link) => (
            <span className="list-item" key={link.label}>
              <Link href={link.href}>
                <span className="list-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </span>
          ))}
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
    </li>
  );
};

