import Image from "next/image";
import { Star } from 'lucide-react';
import { Link } from "@/i18n/routing";

interface CoursesCardProps {
  category_name: string;
  name: string;
  image: string | null;
  attendance_percentage: number;
  qr_url: string;
  certificate_url?: string | null;
}

const CoursesCardComponent: React.FC<CoursesCardProps> = ({
  category_name,
  name,
  image,
  attendance_percentage,
  qr_url,
  certificate_url,

}) => {
  return (
    <>
            <div className="current-course-card">
              <div className="course-details">
              <Image
                src={image ? `/${image}` : "/images/empty-img.png"}
                alt={name}
                width={100}
                height={100}
              />
                <div className="course-info mb-3 w-100">
                  <p className="course-category">{category_name}</p>
                  <h5 className="course-name">{name}</h5>
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
                    <p className="progress-text">{attendance_percentage}% مكتمل</p>
                  </div>
                </div>
              </div>

              <div className="course-actions">
{/*               <a
                  href={qr_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cart btn-outline-custom btn-sm"
                >
                  عرض QR Code
                </a> */}
           {certificate_url && (
                  <Link
                    href={certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-cart btn-outline-custom btn-sm"
                  >
                    تحميل الشهادة
                  </Link>
                )}
                <Link href="/feedback" className="btn btn-cart btn-icon btn-outline-custom btn-sm">  
                <Star  size={17} strokeWidth={2}   />
                تقييم الدورة   
                </Link>
           
                <button className="btn btn-buy btn-custom-primary btn btn-primary btn-sm">
                  عرض التفاصيل
                </button>
              </div>
            </div>
    
    </>
  );
};


export default CoursesCardComponent;