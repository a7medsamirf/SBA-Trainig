import "./news-details.scss";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { safeHtmlParser } from "@/utils/safe-html-parser.util"; 
import { Metadata } from 'next';
import { getEventsById } from "@/shared-apis/Events/get-events-detail.api";
import { EventsDetailData } from "@/models/events-detail.model";
import {NewsletterSection } from "@/components/sections/newsletter/newsletter-section";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import { SearchParamProps } from "@/models/search-params.model";

import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({params,}: SearchParamProps): Promise<Metadata> {

  const id = (await params as any)?.slug.split("-")[0]
  const event = await getEventsById(id);
  return {
    title: event?.data?.title || "تفاصيل الفعالية",
    description: event?.data?.description?.slice(0, 150) || "تفاصيل فعالية تعليمية مميزة",
    
  };
}

export default async function EventsPage({  params, }: SearchParamProps) {
  const locale = await getLocale();
  const isArabic = locale.startsWith("ar");
  const t = await getTranslations("trans");
  
  const id = (await params as any)?.slug.split("-")[0]
  const newID = decodeURIComponent(id)

  const eventsResponse = await getEventsById(id);
  const event: EventsDetailData = eventsResponse?.data || {};

  if (!event) {
    return (
      <section className="section-box News-details">
        <div className="container">
          <div className="row">
            <div className="col-12 d-grid justify-content-center align-items-center p-50">
              <h2 className="mb-20">{t("events.not-found")}</h2>
              <Link href="/events" className="btn btn-custom-primary w-auto">
                {t("events.back-to-events")}
              </Link>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-box News-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Event Header */}
              <div className="news-header mb-4">
                <div className="d-flex align-items-center mb-3">
                  <a className="tag-dot font-xs">
                    {event.type}
                    <span className="dot bullet me-3"></span>
                  </a>
                </div>
                <span className="mt-10 font-sm color-gray-500">
                    {new Date(event.date).toLocaleDateString(locale, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                     numberingSystem: isArabic ? "arab" : "latn",
                    })}

                  </span>

                <h1 className="news-title mb-3">{event.title}</h1>
              </div>
              {/* Event Image */}
              <div className="news-image mb-4">
              <Image 
                    src={event.image}
                    alt={event.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '50%', height: 'auto' }}
                    className="w-50 rounded"
                  />
              </div>
              {/* Event Content */}
              <div className="news-content content-text">

             <div className="lead mb-4"
                dangerouslySetInnerHTML={{
                  __html: safeHtmlParser(event.description),
                }}/>
              </div>
              <div className="border-bottom-4 mb-20"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-box mt-50 mb-60">
        <div className="container">
          <div className="row">
            <UpsCard className="UpsCard-border my-md-0 my-3" />
          </div>
        </div>
      </section>
      <NewsletterSection />
    </>
  );
}

