import "./contact.scss";
import NewsletterSection from "@/components/sections/newsletter/newsletter-section";
import MapComponent from "./components/map-component";
import UpsCard from '@/components/sections/ups/components/upsCard-component'
import ContactFormComponent from "./components/contactForm-component";

const ContactPage = () => {
  return (
    <>
      <section className="section-box shop-template mt-0">
        <div className="container">
          <div className="box-contact">
                  <div className="row">
                  <div className="col-lg-6">
                        <ContactFormComponent />
              </div>
              <div className="col-lg-6">
                <MapComponent />
              </div>
                  </div>
          </div>
  </div>
</section>



    <div className="section-box mt-50 mb-60">
        <div className="container">
          <div className="row">
          <UpsCard className="UpsCard-border my-md-0 my-3" />

          </div>
        </div>
      </div>
  
      <NewsletterSection />
    </>
  )
}

export default ContactPage