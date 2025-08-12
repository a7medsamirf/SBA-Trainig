import Image from "next/image";
import { Star , ScanQrCode , ExternalLink , Download  } from "lucide-react";
import { Link } from "@/i18n/routing";
import { slugify } from "@/utils/slugify";
import {  useTranslations } from "next-intl";

interface CoursesCardProps {
  status: "upcoming" | "ongoing" | "completed";
  course_id: number;
  category_name: string;
  name: string;
  course_image: string | null;
  attendance_percentage: number;
  qr_code: string;
  certificate_url?: string | null;
}

const CoursesCardComponent: React.FC<CoursesCardProps> = ({
  status,
  course_id,
  category_name,
  name,
  course_image,
  attendance_percentage,
  qr_code,
  certificate_url,
}) => {
  const courseUrl = `/training/${course_id}-${slugify(name)}`;
  const t = useTranslations("trans.button");
  return (
    <>
    <div className="current-course-card h-100">
        <div className="course-details">
          <Image
            src={
              course_image?.startsWith("http")
                ? course_image
                : "/images/empty-img.png"
            }
            alt={name}
            width={100}
            height={100}
          />
          <div className="mb-3 course-info w-100">
            <p className="course-category">{category_name}</p>
            <Link href={courseUrl}>
              <h5 className="course-name">{name}</h5>
            </Link>
            <div className="mt-2">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${attendance_percentage}%` }}
                  aria-valuenow={attendance_percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <p className="progress-text">{attendance_percentage}% {t("Complete")}</p>
            </div>
          </div>
        </div>

      <div className="course-actions">
        {["ongoing", "upcoming"].includes(status) && qr_code && (
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

       {["ongoing", "upcoming"].includes(status) && courseUrl && (
            <Link
              href={courseUrl}
              rel="noopener noreferrer"
              className="btn btn-icon btn-buy btn-custom-primary btn-primary btn-sm"
            >
       {t("View-details")}
            <ExternalLink size={17} strokeWidth={2} />
            </Link>
          )}

        {status === "completed" && certificate_url && (
            <Link
              href={certificate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-icon btn-buy btn-custom-primary btn-primary btn-sm"
            >
             {t("view-certificate")}
              <Download size={17} strokeWidth={2} />
            </Link>
          )}

            {status === "completed" && (
              <Link
                href={`/feedback?course_id=${course_id}`}
                 target="_blank"
                className="btn btn-cart btn-icon btn-outline-custom btn-sm"
              >
                   {t("feedback")}
                <Star size={17} strokeWidth={2} />
              </Link>
            )}
        </div>

      </div>
    </>
  );
};

export default CoursesCardComponent;
