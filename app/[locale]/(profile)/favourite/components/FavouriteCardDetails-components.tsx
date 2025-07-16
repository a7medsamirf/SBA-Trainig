import React from "react";
import SvgTimer from "@/components/icons/svg/timer";
import SvgCalendar2 from "@/components/icons/svg/calendar-2";
import Svgexport15 from "@/components/icons/svg/svgexport-15";
import WishlistIcon from "@/components/icons/wishlist";
import WishlistHoverIcon from "@/components/icons/icons/wishlist-hover";
import SvgEye from "@/components/icons/svg/eye";
import Image from "next/image";
import "@/app/[locale]/(profile)/profile.scss";

interface FavouriteCardDetailsProps {
  category_name: string;
  name: string;
  price: string;
  image: string;
  is_favorited?: boolean;
  duration: string;
  start_date: string;
  instructor_name: string;
}

const FavouriteCardDetailsComponents: React.FC<FavouriteCardDetailsProps> = ({
  category_name,
  name,
  price,
  image,
  is_favorited = false,
  duration,
  start_date,
  instructor_name,
}) => {
  return (
    <div className="favourite-card-vertical card custom-border shadow-none p-3">
      <div className="favourite-card-image position-relative mb-3">
        <img
          src={image}
          alt={name}
          className="rounded-4 object-fit-cover w-100"
          style={{ height: 150, objectFit: "cover" }}
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
      <div className="text-secondary mb-2 small fw-medium">{category_name}</div>
      <div className="fw-bold fs-4 mb-2 text-dark">{name}</div>
      <div className="fw-bold fs-5 text-primary d-flex align-items-center gap-1 mb-2">
        <span className="color-gray-900 mb-2">{price}</span>
        <Image
          src="../../images/template/Saudi_Riyal.svg"
          alt={""}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "3%", height: "auto" }}
          className="price-img-Saudi"
        />
      </div>
      <div className="favourite-card-details pt-3 mt-3">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center gap-2 text-secondary small">
            <SvgTimer width={18} height={18} />
            <span>{duration}</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-secondary small">
            <SvgCalendar2 color="#76A441" width={20} height={20} />
            <span>{start_date.split("T")[0]}</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-secondary small">
            <Svgexport15 width={18} height={18} />
            <span>{instructor_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouriteCardDetailsComponents;
