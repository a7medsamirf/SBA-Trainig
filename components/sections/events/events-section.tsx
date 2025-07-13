"use client";
import './eventsSection.scss'
import {  useTranslations } from "next-intl";
import EventsCardSection from './components/eventsCard-component';

interface NewsSectionProps {
  eventsData: any[]; // يفضل تحط النوع الصحيح لو عندك interface
}

export const NewsSection: React.FC<NewsSectionProps> = ({ eventsData }) => {
  
  const t = useTranslations("trans.home");

  return (
    <section className="section-box NewsSection-Card mt-60 mb-60">
      <div className="container">
        <div className="head-main">
        <h3 className="">  {t("Latest-news")}</h3>
        </div>
        <div className="row">
          <EventsCardSection events={eventsData} />
        </div>
      </div>
    </section>
  );
};
