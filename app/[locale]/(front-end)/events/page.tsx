
import "./events.scss";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import EventsCardSection from "./components/eventsCard-component";
import NewsletterSection from "@/components/sections/newsletter/newsletter-section";

import { getEvents } from "@/shared-apis/Events/get-events.api";

export default async function EventsPage() {

  const eventsResponse = await getEvents();
  const eventsData = eventsResponse?.data || [];

  return (
    <>
      <section className="section-box News">
        <div className="container">
          <h2 className="section-title">أحدث الأخبار والفعاليات</h2>

          <div className="row mt-30">
          <div className="col-xl-12 col-lg-12 mb-30 display-list">
                <EventsCardSection events={eventsData} /> 
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


