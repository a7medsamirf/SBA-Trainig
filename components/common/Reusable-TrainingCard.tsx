"use client";
import "../../app/[locale]/(front-end)/training/components/TrainingCard.scss";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddCourseFavorite } from "@/hooks/common/add-course-favorite.hook";
import { cn } from "@/utils";
import { useLocale } from "next-intl";
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
}) => {
  
  const locale = useLocale();
  const courseUrl = `/${locale}/training/${id}-${slug}`;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { addCourseFavoriteHandler, isPending } = useAddCourseFavorite();

  const handleImageClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(courseUrl);
    }, 500);
  };

  return (
    <div className={`card-grid-style-3 ${className}`}>
      <div className="card-grid-inner cardWidth">
        <div className="tools">
          <button
            className={cn(
              "btn btn-wishlist btn-tooltip mb-10",
              isPending && "disabled",
              isFavorited && "btn-wishlist-active"
            )}
            aria-label="إضافة إلى المفضلة"
            onClick={() => addCourseFavoriteHandler(id)}
          ></button>
          {/*    <a
            className="mb-10 btn btn-compare btn-tooltip"
            href="shop-compare.html"
            aria-label="Compare"
          ></a>
          <Link
            className="btn btn-quickview btn-tooltip"
            aria-label="Quick view"
            href={courseUrl}
          ></Link> */}
        </div>

        <div
          className="image-box"
          onClick={handleImageClick}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <span className="label bg-brand-2">دورة</span>
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
              style={{ width: "5%", height: "auto" }}
              className="price-img-Saudi"
            />
          </div>
          <div className="mt-20 box-btn-cart">
            <Link
              className="btn btn-cart btn-outline-custom d-block W-100"
              href={courseUrl}
            >
              تسجيل
            </Link>
          </div>
          <ul className="list-features">
            <li>مدة الدورة: {duration}</li>
            <li>تاريخ الدورة: {startDate.split("T")[0]}</li>
            <li>اسم مقدم الدورة: {trainer}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReusableTrainingCard;
