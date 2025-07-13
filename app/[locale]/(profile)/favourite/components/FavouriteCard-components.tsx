import React from "react";
import WishlistIcon from "@/components/icons/wishlist";
import SvgEye from "@/components/icons/svg/eye";
import WishlistHoverIcon from "@/components/icons/icons/wishlist-hover";
import "@/app/[locale]/(profile)/profile.scss";
import Image from "next/image";
interface FavouriteCardProps {
  category_name: string;
  name: string;
  price: string;
  image: string;
  is_favorited?: boolean;
}

export const FavouriteCardComponents: React.FC<FavouriteCardProps> = ({
  category_name,
  name,
  price,
  image,
  is_favorited = false,
}) => {
  return (
    <div className="favourite-card card custom-border shadow-none">
      <div className="favourite-card-image position-relative">
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
      <div className="d-flex flex-column justify-content-center flex-grow-1 pe-3">
        <div className="text-secondary mb-2 small fw-medium">
          {category_name}
        </div>
        <div className="fw-bold fs-5 mb-3 text-dark">{name}</div>
        <div className="fw-bold fs-5 text-primary d-flex align-items-center gap-1">
          <span className="color-gray-900 mb-2">{price} </span>
          <Image
            src="../../images/template/Saudi_Riyal.svg"
            alt={""}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "4%", height: "auto" }}
            className="price-img-Saudi"
          />
        </div>
      </div>
    </div>
  );
};
