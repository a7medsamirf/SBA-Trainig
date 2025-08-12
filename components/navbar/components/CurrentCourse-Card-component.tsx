"use client";
import Image from "next/image";
import { ScanQrCode, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { slugify } from "@/utils/slugify";

interface CurrentCourseCardProps {
  status: "upcoming" | "ongoing" | "completed";
  id: number;
  course_id: number;
  course_category: string;
  course_name: string;
  course_image: string | null;
  attendance_percentage: number;
  qr_code: string;
  certificate_url?: string | null;
}

const CurrentCourseCardComponent: React.FC<CurrentCourseCardProps> = ({
  status,
  id,
  course_id,
  course_category,
  course_name,
  course_image,
  attendance_percentage,
  qr_code,
  certificate_url,
  }) => {
 const courseUrl = `/training/${course_id}-${slugify(course_name)}`; 
const t = useTranslations("trans.button");


  return (
    <div className="current-course-card dropdown-card">
      <p className="card-title mb-3">
      {status === "ongoing" ? t("current-course") : status === "upcoming" ? t("upcoming-course") : t("completed-course")}
      </p>
      <div className="course-details">
        <Image
          src={course_image?.startsWith("http") ? course_image : "/images/empty-img.png"}
          alt={course_name || "صورة الدورة"}
          width={70}
          height={70}
        />

        <div className="mb-3 course-info w-100">
          <p className="course-category">{course_category}</p>
          <Link href={courseUrl} className="course-name p-0">
             <h5 className="course-name p-0">{course_name}</h5>
         </Link>

          {status === "ongoing" && (
            <div className="mt-2">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${attendance_percentage || 0}%` }}
                  aria-valuenow={attendance_percentage || 0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <p className="progress-text">{attendance_percentage || 0}% {t("Complete")}</p>
            </div>
          )}

          {status === "completed" && certificate_url && (
            <div className="mt-2">
              <Link
                href={certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-success"
              >
            {t("view-certificate")}
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="course-actions">
        {status === "ongoing" && qr_code && qr_code !== "null" && (
          <Link
            href={qr_code}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-icon btn-cart btn-outline-custom btn-sm"
          >
            {t("qr-code")}
            <ScanQrCode size={17} strokeWidth={2} />
          </Link>
        )}

        <Link
          href={courseUrl}
          rel="noopener noreferrer"
          className="btn btn-icon btn-buy btn-custom-primary btn-primary btn-sm"
        >
          {t("View-details")}
          <ExternalLink size={17} strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
};

export default CurrentCourseCardComponent;
