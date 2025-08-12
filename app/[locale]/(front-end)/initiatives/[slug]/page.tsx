import "./initiatives-details.scss";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { NewsletterSection } from "@/components/sections/newsletter/newsletter-section";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import { getInitiatives } from "@/shared-apis";
import { InitiativeData } from "@/models";
import { safeHtmlParser } from "@/utils/safe-html-parser.util";
import { Metadata } from "next";
import { SearchParamProps } from "@/models/search-params.model";

import { getLocale } from "next-intl/server";

// 👇 توليد Metadata للـ SEO
export async function generateMetadata({ params }: SearchParamProps): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams?.slug?.split("-")[0];
  
  if (!id) {
    return {
      title: "تفاصيل المبادرة",
      description: "تفاصيل مبادرة تعليمية مميزة",
    };
  }

  const initiatives = await getInitiatives();
  const initiative = initiatives?.data?.find((i: { id: any; }) => String(i.id) === id);

  return {
    title: initiative?.title || "تفاصيل المبادرة",
    description: initiative?.description?.slice(0, 150) || "تفاصيل مبادرة تعليمية مميزة",
  };
}

export default async function InitiativesPage({ params }: SearchParamProps) {
  const locale = await getLocale();
const isArabic = locale.startsWith("ar");
  const resolvedParams = await params;
  const id = resolvedParams?.slug?.split("-")[0];
  
  if (!id) {
    return (
      <section className="section-box News-details">
        <div className="container">
          <div className="row">
            <div className="col-12 d-grid justify-content-center align-items-center p-50">
              <h2 className="mb-20">المبادرة غير موجودة</h2>
              <Link href="/initiatives" className="btn btn-custom-primary w-auto">
                العودة إلى المبادرات
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const newID = decodeURIComponent(id);

  const initiativesResponse = await getInitiatives();
  const initiatives: InitiativeData[] = initiativesResponse?.data || [];
  const initiative = initiatives.find((e) => String(e.id) === newID);

  if (!initiative) {
    return (
      <section className="section-box News-details">
        <div className="container">
          <div className="row">
            <div className="col-12 d-grid justify-content-center align-items-center p-50">
              <h2 className="mb-20">المبادرة غير موجودة</h2>
              <Link href="/initiatives" className="btn btn-custom-primary w-auto">
                العودة إلى المبادرات
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
                    {initiative.type}
                    <span className="dot bullet me-3"></span>
                  </a>
                </div>
                <span className="mt-10 font-sm color-gray-500">
                    {new Date(initiative.date).toLocaleDateString(locale, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                     numberingSystem: isArabic ? "arab" : "latn",
                    })}

                  </span>

                <h1 className="news-title mb-3">{initiative.title}</h1>
              </div>

           

              {/* Image */}
              <div className="news-image mb-4">
                <Image
                  src={initiative.image}
                  alt={initiative.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "50%", height: "auto" }}
                  className="w-50 rounded"
                />
              </div>

              {/* Content */}
              <div className="news-content content-text">
                <div
                  className="lead mb-4"
                  dangerouslySetInnerHTML={{
                    __html: safeHtmlParser(initiative.description),
                  }}
                />
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
