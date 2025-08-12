"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { safeHtmlParser } from "@/utils/safe-html-parser.util"; 
import {  useTranslations , useLocale } from "next-intl";
interface ReusableHorizontalCardProps {
  tag: string;
  title: string;
  description?: string;
  image: any;
  className?: string;
  showTag?: boolean;
  href?: string;
  date?: string;
}
const ReusableHorizontalCard: React.FC<ReusableHorizontalCardProps> = ({ 
  tag, 
  title, 
  description, 
  image, 
  className = "",
  showTag = true,
  href = "",
  date,

}) => {

const locale = useLocale();
const isArabic = locale.startsWith('ar');

  return (
    <div className={`card card-grid-style-1 mb-3 ${className}`}>
      <div className="row g-0">
        <div className="col-md-3">
          <div className="image-box">
          <Image 
                  src={image.src}
                  alt={title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  className="w-100 rounded"
                 />

          </div>
        </div>
        <div className="col-md-9">
          <div className="card-body news-info">
          {showTag && showTag && (
            <a className="tag-dot font-xs">
              {tag}
              <span className="dot bullet me-3"></span>
            </a>
             )}
             {date && (
              <div className="mt-10 font-sm color-gray-500">
                 {new Date(date).toLocaleDateString(locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  numberingSystem: isArabic ? "latn" : "latn"
                })}

                 </div>
              
            )}

             <Link className="title-link" href={href}>
                   <h4 className="card-title text-color-primary mb-15">{title}</h4>
            </Link>

            <p className="card-text description font-md color-gray-500 min-height-135 two-row" 
                dangerouslySetInnerHTML={{
                  __html: safeHtmlParser(description),
                }}/>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableHorizontalCard; 