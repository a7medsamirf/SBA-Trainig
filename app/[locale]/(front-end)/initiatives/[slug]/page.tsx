import "./initiatives-details.scss";
import Image from "next/image";
import NewsletterSection from "@/components/sections/newsletter/newsletter-section";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import { getEvents } from "@/shared-apis/Events/get-events.api";
import { EventData } from "@/models/events.model";
import { Metadata } from 'next';
import { SearchParamProps } from "@/models/search-params.model";



export default async function InitiativesPage({ params }: SearchParamProps) {

  const id = (await params as any)?.id.split("-")[0]


  const eventsResponse = await getEvents();

  const eventsData: EventData[] = eventsResponse?.data || [];
  const eventId = Number(id);
  const event = eventsData.find((e) => e.id === eventId);

  if (!event) {
    return (
      <section className="section-box News-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>المبادراه غير موجودة</h2>
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
                <div className="lead mb-4">{event.description}</div>
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

