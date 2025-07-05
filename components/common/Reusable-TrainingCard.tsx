
import "../../app/[locale]/(front-end)/training/components/TrainingCard.scss";
import { Link } from "@/i18n/routing";
import Image from "next/image";
/* import type { ReusableTrainingCardProps } from "@/types/TrainingCard-type"; */

 interface ReusableTrainingCardProps {
    id: number;
    category: string;
    title: string;
    image: string;
    price: string;
    duration: string;
    startDate: string;
    trainer: string;
    courseUrl: string;
    className?: string;
}

const ReusableTrainingCard: React.FC<ReusableTrainingCardProps> = ({ 
    title,
    category,
    image,
    price,
    courseUrl="",
    duration,
    startDate,
    trainer,
    className=""
 }) => {


  return (
    <div className={`card-grid-style-3 ${className}`}>
    <div className="card-grid-inner cardWidth">
      <div className="tools">
        <a className="btn btn-wishlist btn-tooltip mb-10" href="shop-wishlist.html" aria-label="Add To Wishlist"></a>
        <a className="btn btn-compare btn-tooltip mb-10" href="shop-compare.html" aria-label="Compare"></a>
        <Link className="btn btn-quickview btn-tooltip" aria-label="Quick view" href={courseUrl}></Link>
      </div>
      <div className="image-box">
        <span className="label bg-brand-2">دورة</span>
        <Link href={courseUrl}>
          <Image 
              src={image}
              alt={title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              className="w-100"
              
                 />
        </Link>
      </div>
      <div className="info-right">
        <span className="font-xs color-gray-500">{category}</span>
        <Link className="color-brand-3 font-sm-bold courseTitle one-row" href={courseUrl}>{title}</Link>
        <div className="price-info d-flex gap-1">
          <strong className="font-lg-bold color-brand-3 price-main">{price}</strong>
          <Image
              src="../../images/template/Saudi_Riyal.svg"
              alt={""}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '5%', height: 'auto' }}
              className="price-img-Saudi"
            />
        </div>
        <div className="mt-20 box-btn-cart">
          <Link className="btn btn-cart btn-outline-custom d-block W-100" href={courseUrl}>
            تسجيل
          </Link>
        </div>
        <ul className="list-features">
          <li>{duration}</li>
          <li>تاريخ الدورة: {startDate}</li>
          <li>اسم مقدم الدورة: {trainer}</li>
        </ul>
      </div>
    </div>
  </div>
   
  );
};

export default ReusableTrainingCard; 





