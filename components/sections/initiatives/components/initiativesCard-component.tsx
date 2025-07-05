"use client";
import '../initiatives.scss'
import Image from "next/image";
import Link from 'next/link'
import { SwiperSlide } from "swiper/react";
import ReusableSwiper from "@/components/common/Reusable-Swiper";
import { Initiative  } from "@/models";
import { useParams } from 'next/navigation';
import { slugify } from "@/utils/slugify"; // 👈 استدعاء الدالة

interface InitiativesCardComponentProps {
initiatives: Initiative[];
}

export const InitiativesCardComponent: React.FC<InitiativesCardComponentProps> = ({ initiatives }) => {
  const { locale } = useParams();

  return (
    <ReusableSwiper
      slidesPerView={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1920: { slidesPerView: 4 },
      }}
    >
       {initiatives && initiatives.length > 0 && initiatives.map((initiative: Initiative) => {
          const slug = slugify(initiative.title);
          return (
        <SwiperSlide key={initiative.id} className="p-md-0 p-3">
          <div className="card initiative-card border-0 card-grid-style-1">
          <div className="image-box">
       
                    <Image
                        src={initiative.image ? initiative.image : "/images/empty-img.png"}
                        alt={initiative.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="w-100 card-img-top"
                  />
       
              </div>   
        
            <div className="card-body mb-50 courseTitle px-0">
            
                <h6 className="card-title color-gray-1100 two-row">{initiative.title}</h6>
            
            </div>
          </div>
        </SwiperSlide>
        );
      })}
    </ReusableSwiper>
  )
}


