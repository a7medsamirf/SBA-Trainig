import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
/* import "swiper/css/navigation";
import "swiper/css/pagination"; */

interface SwiperProps {
  children: React.ReactNode;
  slidesPerView?: {
    [key: number]: {
      slidesPerView: number;
    };
  };
  spaceBetween?: number;
  autoplayDelay?: number;
  loop?: boolean;
  centeredSlides?: boolean;
  pagination?: boolean;
  navigation?: boolean;
}

const ReusableSwiper = ({
  children,
  slidesPerView = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1920: { slidesPerView: 4 },
  },
  spaceBetween = 10,
  autoplayDelay = 2000,
  loop = true,
  centeredSlides = false,
  pagination = false,
  navigation = true,
}: SwiperProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      onSwiper={(swiper: any) => (swiperRef.current = swiper)}
      spaceBetween={spaceBetween}
      slidesPerView={1}
      navigation={navigation}
      loop={loop}
      centeredSlides={centeredSlides}
      pagination={pagination}
      autoplay={autoplayDelay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
      breakpoints={slidesPerView}
      className="mySwiper"
    >
      {children}
    </Swiper>
  );
};

export default ReusableSwiper; 