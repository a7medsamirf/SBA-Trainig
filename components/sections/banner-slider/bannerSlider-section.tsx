"use client";
import { useRef  } from "react";
import { HomeBanner  } from "@/models";
import { Link } from "@/i18n/routing";
import Image from "next/image";

import "./bannerSlider.scss";
import 'swiper/css';
import 'swiper/css/pagination';

// Swiper
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay , Pagination } from "swiper/modules";

interface BannerSliderSectionProps {
  banners: HomeBanner[];
}

const BannerSliderSection: React.FC<BannerSliderSectionProps> = ({ banners }) => {
  const swiperRef = useRef<SwiperType | null>(null);
   
  return (
    <>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={true}
        loop
        centeredSlides={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
       {banners && banners.length > 0 && banners.map((slide: HomeBanner) => (
          <SwiperSlide key={slide.id}>
            <div
              className="d-flex justify-content-center align-items-center text-white position-relative overflow-hidden"
              style={{ height: "550px" }}
            >
              <Image
                src={slide.image ? slide.image : "/images/empt-bg.png"}
                alt={slide.title}
                fill
                style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
                priority
              />
              <div className="banner-content text-center position-relative" style={{ zIndex: 1 }}>
                <Link
                  href={slide.link}
                  target="_blank"
                  className="btn btn-gray-1000 btn-shop-now text-uppercase w-auto"
                >
                  {slide.btn_title}
                </Link>

                <h1 className="display-4 fw-bold mb-10">{slide.title}</h1>
                <p className="font-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default BannerSliderSection
