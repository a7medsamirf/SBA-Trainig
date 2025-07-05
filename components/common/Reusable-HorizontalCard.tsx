import { Link } from "@/i18n/routing";
import Image from "next/image";
interface ReusableHorizontalCardProps {
  tag: string;
  title: string;
  description?: string;
  image: any;
  className?: string;
  showTag?: boolean;
  href?: string;
}
const ReusableHorizontalCard: React.FC<ReusableHorizontalCardProps> = ({ 
  tag, 
  title, 
  description, 
  image, 
  className = "",
  showTag = true,
  href = ""
}) => {
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
                  style={{ width: '100%', height: 'auto' }}
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
             <Link className="title-link" href={href}>
                   <h4 className="card-title text-color-primary mb-15">{title}</h4>
            </Link>

              <p className="card-text description font-md color-gray-500 min-height-135 two-row">{description}</p>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusableHorizontalCard; 