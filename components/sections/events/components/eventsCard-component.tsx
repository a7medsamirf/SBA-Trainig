"use client";
import Image from "next/image";
import Link from 'next/link'
import { SwiperSlide } from "swiper/react";
import ReusableSwiper from "@/components/common/Reusable-Swiper";
import { HomeEvent  } from "@/models";
import { useParams } from 'next/navigation';
import { slugify } from "@/utils/slugify"; // 👈 استدعاء الدالة

interface EventsCardSectionProps {
  events: HomeEvent[];
}

const EventsCardSection: React.FC<EventsCardSectionProps> = ({ events }) => {
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
       {events && events.length > 0 && events.map((event: HomeEvent) => {
          const slug = slugify(event.title);
          return (
        <SwiperSlide key={event.id} className="p-md-0 p-3">
          <div className="card border-0">
            <Image
              src={event.image ? event.image : "/images/empty-img.png"}
              alt={event.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              className="w-100 card-img-top"
            />
            <div className="card-body px-0">
              <span className="tag-dot font-xs">{event.type}<span className="dot bullet me-3"></span></span>

              <Link href={`${locale === "en" ? "en" : "ar"}/events/${event.id}-${slug}`} >
                <h6 className="card-title color-gray-1100 two-row">{event.title}</h6>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        );
      })}
    </ReusableSwiper>
  )
}

export default EventsCardSection