import "./about.scss";
import NewsletterSection from "@/components/sections/newsletter/newsletter-section";
import { ManagerWordComponent , OurValuesComponent , AboutAcademyComponent , VisionComponent , OurAchievementsComponent} from "./components";

import PartnersSection from "@/components/sections/Partners/partners-section";
import { getHomeData } from "@/shared-apis/Home/get-home.api";
import { getAboutAcademy } from "@/shared-apis/AboutAcademy/get-aboutacademy.api";
import { getGoalsAcademy } from "@/shared-apis/AboutAcademy/get-goalsacademy.api";
import { getManagerWord } from "@/shared-apis/AboutAcademy/get-managerword.api";
import { getMission } from "@/shared-apis/AboutAcademy/get-mission.api";
import { getVision } from "@/shared-apis/AboutAcademy/get-vision.api";
import { getAboutMeta } from "@/shared-apis";

export default async function AboutPage() {
  const aboutAcademyResponse = await getAboutAcademy();
  const aboutAcademyData = aboutAcademyResponse?.data || []; 

  const response = await getGoalsAcademy();
  const goalsAcademy = response?.data;  

  const partnersResponse = await getHomeData();
  const Partners = partnersResponse?.data?.partners || [];

  const managerWordResponse = await getManagerWord();
  const managerWord = managerWordResponse?.data;

  const missionResponse = await getMission();
  const mission = missionResponse?.data;

  const visionResponse = await getVision();
  const vision = visionResponse?.data;

  // Fetch meta data
  const aboutMetaResponse = await getAboutMeta();
  const meta = aboutMetaResponse?.meta;

  return (
    <>
      <section className="section-box shop-template mt-30">
        <div className="container">
          <div className="row">
             <AboutAcademyComponent 
              aboutAcademy={aboutAcademyData} 
              goalsAcademy={goalsAcademy}
            /> 
          </div>
          <ManagerWordComponent managerword={managerWord}/>
          <VisionComponent vision={vision} mission={mission} />
          <OurAchievementsComponent meta={meta} />
          <OurValuesComponent />
        </div>
      </section>

      <NewsletterSection />
      <PartnersSection partners={Partners} />
    </>
  );
}
