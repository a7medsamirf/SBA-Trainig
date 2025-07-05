import "./obtain-certificate.scss";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import NewsletterSection from "@/components/sections/newsletter/newsletter-section";

const ObtainCertificate = () => {
  return (
    <>
    <section className="section-box shop-template mt-0">
        <div className="container">
          <h2 className="py-5">الحصول على الشهادة
          </h2>
      
          <div className="border-bottom pt-0 mb-30"></div>
          <div className="row">            
              <div className="row mt-20">
                <h3 style={{ textAlign: "center" }}> انتظرونا قريباً</h3>
                <div style={{ height: "300px" }}></div>
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
  )
}

export default ObtainCertificate