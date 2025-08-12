"use client";
import './initiatives.scss'
import {  useTranslations } from "next-intl";
import { InitiativesCardComponent } from './components/initiativesCard-component';
import { InitiativeData } from '../../../models/initiatives.model';

interface initiativesSectionProps {
  initiativesData: InitiativeData[];
}

export const initiativesSection: React.FC<initiativesSectionProps> = ({ initiativesData }) => {
  
  const t = useTranslations("trans.home");

  return (
    <section className="section-box initiatives-section NewsSection-Card mt-60 mb-60">
      <div className="container">
        <div className="head-main">
          <h3 className=""> {t("Latest-news")}</h3>
        </div>
        <div className="row">
          <InitiativesCardComponent initiatives={initiativesData} />
        </div>
      </div>
    </section>
  );
};
