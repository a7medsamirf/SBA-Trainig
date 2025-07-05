import "./footer.scss";
import Image from "next/image";
import FooterCopyright from "./components/footer-copyright-component";
import FooterLogo from "./components/footer-logo.component";
import DownloadApp from "./components/downloadapp-component";
import SocialsComponent from "./components/socials-component";
import CommunicationComponent from "./components/communication-component";
import TrainingListComponent from "./components/trainingList-component";
import { getCommunication } from "@/shared-apis/Communication/get-communication.api";
import { getSocials } from "@/shared-apis/Socials/get-socials.api";
import { getHomeData } from "@/shared-apis/Home/get-home.api";

export default async function Footer() {
  const communicationResponse = await getCommunication();
  const Communication = communicationResponse?.data; 

  const socialsResponse = await getSocials();
  const Socials = socialsResponse?.data; 

  const response = await getHomeData();
  const { courses = [], } = response.data;

  return (
    <>

      <footer className="footer">
        <div className="footer-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-3  mb-30">
             
                <CommunicationComponent getCommunication={Communication} />
               <SocialsComponent getSocials={Socials} />
              </div>
              <div className="col-lg-6 mb-30">
                <TrainingListComponent courses={courses} />
              </div>

              <div className="col-lg-3 width-23">
                <h4 className="mb-30 color-gray-1000">App &amp; Payment</h4>
                <div>
                  <p className="font-md color-gray-900">
                  Download our Apps and get extra 15% Discount on your first Order…!

                  
                  </p>
                  <div className="mt-20 d-flex gap-2">
                  <DownloadApp />

                  </div>
                  <p className="font-md color-gray-900 mt-20 mb-10">
                    Secured Payment Gateways
                  </p>
            
                  <Image
                        src={`/images/template/payment-method.png`}
                        alt=""
                        width={200}
                        height={200}
                        className=""
                      />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-2">
          <FooterLogo />

          <FooterCopyright />
        </div>
      </footer>
    </>
  );
}
