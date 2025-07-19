import React from "react";
import WishlistIcon from "@/components/icons/wishlist";
import SvgEye from "@/components/icons/svg/eye";
import WishlistHoverIcon from "@/components/icons/icons/wishlist-hover";
import SvgCalendar2 from "@/components/icons/svg/calendar-2";
import Svgexport15 from "@/components/icons/svg/svgexport-15";
import "@/app/[locale]/(profile)/profile.scss";
import SvgSaudiRiyal from "@/components/icons/svg/saudi-riyal";
import SvgTimer from "@/components/icons/svg/timer";

interface CoursesCardProps {
  category_name: string;
  name: string;
  price: string;
  image: string | null;
  is_favorited?: boolean;
  duration?: string;
  start_date?: string;
  instructor_name?: string;
  statusLabel?: "pending" | "approved" | "declined";
}

// ألوان كل حالة
const statusClasses: { [key: string]: string } = {
  pending: "pending bg-warning text-dark",
  approved: "approved bg-success text-white",
  declined: "declined bg-danger text-white",
};

// الترجمة لكل حالة
const statusTranslations: { [key: string]: string } = {
  pending: "قيد الانتظار",
  approved: "تم القبول",
  declined: "تم الرفض",
};

const CoursesCardComponents: React.FC<CoursesCardProps> = ({
  category_name,
  name,
  price,
  image,
  is_favorited = false,
  duration,
  start_date,
  instructor_name,
  statusLabel,
}) => {
  return (
    <div className="favourite-card card custom-border shadow-none">
      <div className="favourite-card-image position-relative">
        <img
          src={image || "/images/empty-img.png"}
          alt={name}
          className="rounded-4 object-fit-cover w-100"
          style={{ height: 180, objectFit: "cover" }}
        />
        <div
          className="favourite-card-icons position-absolute d-flex flex-column align-items-center"
          style={{ top: 12, left: 12 }}
        >
          <span className="mb-2">
            {is_favorited ? (
              <WishlistHoverIcon width={20} height={20} />
            ) : (
              <WishlistIcon width={20} height={20} />
            )}
          </span>
          <span>
            <SvgEye width={20} height={20} />
          </span>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center flex-grow-1 pe-3">
        <div className="text-secondary mb-2 small fw-medium">{category_name}</div>
        <div className="fw-bold fs-5 mb-3 text-dark">{name}</div>

        <div className="fw-bold fs-6 text-primary d-flex align-items-center gap-1">
          <span className="color-gray-900 mb-2">{price}</span>
          <SvgSaudiRiyal className="price-img-Saudi" width={13} />
        </div>

        <div className="favourite-card-details">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2 text-secondary small">
              <SvgTimer width={18} height={18} />
              <span>{duration}</span>
            </div>
            <div className="d-flex align-items-center gap-2 text-secondary small">
              <SvgCalendar2 color="#76A441" width={20} height={20} />
              <span>{start_date?.split("T")[0]}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between text-secondary small">
              <div className="d-flex align-items-center gap-2">
                <Svgexport15 width={18} height={18} />
                <span>{instructor_name}</span>
              </div>
              <div>
                {statusLabel && (
                  <span className={`badge ${statusClasses[statusLabel] || "bg-light text-dark"}`}>
                    {statusTranslations[statusLabel] || statusLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCardComponents;
