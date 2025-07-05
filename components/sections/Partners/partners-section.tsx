"use client";
import "./partners.scss";
import Image from "next/image";
import Link from 'next/link'
import { HomePartner  } from "@/models";

import { SwiperSlide } from "swiper/react";
import ReusableSwiper from "@/components/common/Reusable-Swiper";

interface PartnersSectionProps {
  partners: HomePartner[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners }) => {
  return (
    <>
      <section className="section-box">
        <div className="channel-logos swiper-initialized swiper-slider">
          <div className="swiper-list draggable">
            <ReusableSwiper
              slidesPerView={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1920: { slidesPerView: 6 },
              }}
              autoplayDelay={2200}
            >
             {partners && partners.length > 0 && partners.map((partner: HomePartner) => (
                <SwiperSlide key={partner.id}>
                  <Link href={partner.link} target="_blank">
                    <Image
                      src={partner.image}
                      alt={partner.name || "Partner Logo"}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-150px h-150px"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </ReusableSwiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersSection;