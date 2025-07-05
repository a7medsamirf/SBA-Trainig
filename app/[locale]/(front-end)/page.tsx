import { getHomeData } from '@/shared-apis/Home/get-home.api';
import { getInitiatives } from '@/shared-apis/Initiatives/get-initiatives.api';
import PartnersSection from '@/components/sections/Partners/partners-section';
import BannerSliderSection from '@/components/sections/banner-slider/bannerSlider-section';
import CategoriesSection from '@/components/sections/categories/categories-section';
import NewsletterSection from '@/components/sections/newsletter/newsletter-section';
import UpsSection from '@/components/sections/ups/ups-section';
import BannersSection from '@/components/sections/Banners/banners-section';
import NewsSection from '@/components/sections/events/events-section';
import ProductSection from '@/components/sections/our-products/products-section';

export default async function LocalePage() {
  const initiativeResponse = await getInitiatives();
  const initiativesData = initiativeResponse?.data || [];

  const response = await getHomeData();
  const { banners = [], partners = [], categories = [], courses = [], new_events = [] } = response.data;


  return (
    <div>
      <BannerSliderSection banners={banners} />
      <UpsSection />
      <CategoriesSection categories={categories} />
      <BannersSection />
      <ProductSection courses={courses} initiativesData={initiativesData}/>
      <NewsSection  eventsData={new_events} />
      <PartnersSection partners={partners} />
      <NewsletterSection />
    </div>
  );
}
