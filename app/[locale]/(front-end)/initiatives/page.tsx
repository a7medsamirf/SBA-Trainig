import "./initiatives.scss";
import NewsletterSection from "@/components/sections/newsletter/newsletter-section";

import UpsCard from "@/components/sections/ups/components/upsCard-component";
import InitiativesCardComponent from "./components/initiativesCard-component";

import { getInitiatives } from "@/shared-apis/Initiatives/get-initiatives.api";
  export default async function InitiativesPage() {
  const eventsResponse = await getInitiatives();
  const eventsData = eventsResponse?.data || [];

  return (
    <>
      <section className="section-box News">
        <div className="container">
          <h2 className="mt-4">  المبادرات </h2>
          <div className="row align-items-center">
            <div className="col-lg-12 mb-30">
              <p className="font-md color-gray-500 mt-20"><span className="font-md color-brand-3">
                انطلاقا من دور هيئة الإذاعة والتلفزيون الريادي في مجال الإعلام، وإيمانا بكفاءة الطاقات الوطنية الواعدة، تنفذ الأكاديمية مبادرات تدريبية نوعية ومتخصصة في مجال الإعلام لدعم وتمكين المواهب الاعلامية من خلال تهيئة بيئة حاضنة تساهم في تنمية القدرات وتعزيز المهارات ونشر ثقافة التدريب.
                </span></p>
            </div>
          </div>

           <div className="border-bottom pt-0 mb-30"></div>
          <div className="row mt-30">
          <div className="col-xl-12 col-lg-12 mb-30 display-list">
                  <InitiativesCardComponent events={eventsData}/>
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
