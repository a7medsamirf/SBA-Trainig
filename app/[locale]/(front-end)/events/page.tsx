import "./events.scss";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import EventsCardSection from "./components/eventsCard-component";
import { NewsletterSection } from "@/components/sections/newsletter/newsletter-section";
import {  getTranslations } from "next-intl/server";
import { getEvents } from "@/shared-apis/Events/get-events.api";

export default async function EventsPage() {
  const eventsResponse = await getEvents();
  const eventsData = eventsResponse?.data || [];
  const t = await getTranslations("trans.home");
  return (
    <>
      <section className="section-box News">
        <div className="container">
          <h2 className="section-title"> {t("Latest-news")} </h2>

          <>
            <EventsCardSection events={eventsData} />
          </>
        </div>
      </section>
      <section className="mb-60 section-box mt-50">
        <div className="container">
          <div className="row">
            <UpsCard className="my-3 UpsCard-border my-md-0" />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
