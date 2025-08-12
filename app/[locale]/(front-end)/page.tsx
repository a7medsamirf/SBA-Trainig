import { getHomeData } from "@/shared-apis/Home/get-home.api";
import { getInitiatives } from "@/shared-apis/Initiatives/get-initiatives.api";
import {
  PartnersSection ,
  BannerSliderSection,
  CategoriesSection,
  NewsletterSection,
  UpsSection,
  BannersSection,
  NewsSection,
  ProductSection
 } from "@/components/sections";


export default async function LocalePage() {
  const initiativeResponse = await getInitiatives();
  const initiativesData = initiativeResponse?.data || [];

  const response = await getHomeData();
  const {
    banners = [],
    partners = [],
    categories = [],
    courses = [],
    new_events = [],
  } = response?.data || {};

  return (
    <div>
      <BannerSliderSection banners={banners} />
      <UpsSection />
      <CategoriesSection categories={categories} />
      <BannersSection />
      <ProductSection courses={courses} initiativesData={initiativesData} />
      <NewsSection eventsData={new_events} />
      <NewsletterSection />
      <PartnersSection partners={partners} />
    </div>
  );
}
