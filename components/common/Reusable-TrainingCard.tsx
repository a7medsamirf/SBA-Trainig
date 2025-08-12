"use client";
import "../../app/[locale]/(front-end)/training/components/TrainingCard.scss";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";
import { useAddCourseFavorite } from "@/hooks/common/add-course-favorite.hook";
import { cn } from "@/utils";
import {  useTranslations , useLocale } from "next-intl";

interface ReusableTrainingCardProps {
  id: number;
  slug: string;
  category: string;
  title: string;
  image: string;
  price: string;
  duration: string;
  startDate: string;
  trainer: string;
  className?: string;
  isFavorited: boolean;
  canReserve: boolean;
}

const ReusableTrainingCard: React.FC<ReusableTrainingCardProps> = ({
  id,
  slug,
  title,
  category,
  image,
  price,
  duration,
  startDate,
  trainer,
  className = "",
  isFavorited,
  canReserve,
}) => {
  const courseUrl = `/training/${id}-${slug}`;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addCourseFavoriteHandler, isPending } = useAddCourseFavorite();

  const isPastDate = new Date(startDate) < new Date();

  const handleImageClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(courseUrl);
    }, 500);
  };
const locale = useLocale();
const isArabic = locale.startsWith('ar');
const t = useTranslations("trans.training");
  return (

      <div className={`card border-0 card-grid-style-3 h-100 ${className}`}>
        <div className="card-body card-grid-inner cardWidth d-flex flex-column">
          <div className="tools">
            
            <button
              className={cn(
                "btn btn-wishlist btn-tooltip mb-10",
                isPending && "disabled",
                isFavorited && "btn-wishlist-active"
              )}
               aria-label={t("add-to-favorite")}
              onClick={() => addCourseFavoriteHandler(id)}
            ></button>
          </div>

          <div
            className="image-box"
            onClick={handleImageClick}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span className="label bg-brand-2">{t("course-label")}</span>
            <Image
              src={image}
              alt={title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
              className="w-100 object-fit-cover"
            />
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>

          <div className="info-right">
            <span className="font-xs color-gray-500">{category}</span>
            <div
              className="cursor-pointer color-brand-3 font-sm-bold courseTitle one-row"
              onClick={handleImageClick}
              title={title}
            >
              {title}
            </div>
            <div className="gap-1 price-info d-flex">
              <strong className="font-lg-bold color-brand-3 price-main">
                {price}
              </strong>
              <Image
                src="/images/template/Saudi_Riyal.svg"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "18px", height: "auto" }}
                className="price-img-Saudi"
              />
            </div>

            <ul className="list-features">
              <li>{t("duration-label")} : {duration}</li>
              <li> {t("start-date-label")}:
                 {new Date(startDate).toLocaleDateString(locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  numberingSystem: isArabic ? "latn" : "latn"
                })}
              </li>
              <li> {t("trainer-name-label")} : {trainer}</li>
            </ul>
          </div>
          <div className="card-footer border-0 bg-white p-0">
            <div className="mt-20 box-btn-cart">
              {!isPastDate && (
                <Link
                  className="btn btn-cart btn-outline-custom d-block W-100"
                  href={courseUrl}
                >
                   {t("register-button")}
                </Link>
              )}
            </div>
            </div>
        </div>
 
    </div>
  );
};

export default ReusableTrainingCard;