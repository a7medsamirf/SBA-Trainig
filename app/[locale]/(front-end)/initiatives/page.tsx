import "./initiatives.scss";
import {NewsletterSection} from "@/components/sections/newsletter/newsletter-section";
import { getTranslations } from "next-intl/server";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import InitiativesCardComponent from "./components/initiativesCard-component";

import { getInitiatives } from "@/shared-apis/Initiatives/get-initiatives.api";
  export default async function InitiativesPage() {
  const t = await getTranslations("trans.initiatives");
  const InitiativesResponse = await getInitiatives();
  const InitiativesData = InitiativesResponse?.data || [];

  return (
    <>
      <section className="section-box News">
        <div className="container">
          <h2 className="mt-4">{t("title")}</h2>
          <div className="row align-items-center">
            <div className="col-lg-12 mb-30">
              <p className="font-md color-gray-500 mt-20">
                <span className="font-md color-brand-3">
                  {t("description")}
                </span>
              </p>
            </div>
          </div>

           <div className="border-bottom pt-0 mb-30"></div>
          <div className="row mt-30">
          <div className="col-xl-12 col-lg-12 mb-30 display-list">
                  <InitiativesCardComponent Initiatives={InitiativesData}/>
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
