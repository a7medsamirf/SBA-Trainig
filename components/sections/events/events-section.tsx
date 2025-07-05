"use client";
import './eventsSection.scss'
import {  useTranslations } from "next-intl";
import EventsCardSection from './components/eventsCard-component';

interface NewsSectionProps {
  eventsData: any[]; // يفضل تحط النوع الصحيح لو عندك interface
}

const NewsSection: React.FC<NewsSectionProps> = ({ eventsData }) => {
  
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

export default NewsSection;

/* 
import './eventsSection.scss'
import {  useTranslations } from "next-intl";
import { getNewEvents }  from '@/shared-apis/Home/get-home.api';
import EventsCardSection from './components/eventsCard-component'

export default async function NewsSection() {
  const t = useTranslations("trans.home");
  const eventsResponse = await getNewEvents();
  const eventsData = eventsResponse?.data?.new_events || [];

  return (
    <>
    <section className="section-box NewsSection-Card mt-60 mb-60">
      <div className="container">
    <div className="head-main">
      <h3 className="">  {t("Latest-news")}</h3>
    </div>

    <div className='row'>
         <EventsCardSection events={eventsData} />
    </div>
  </div>

</section>
    
    </>
  )
}
 */