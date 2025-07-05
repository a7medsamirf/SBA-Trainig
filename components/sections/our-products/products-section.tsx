"use client";

import "./products.scss";
import { useTranslations } from "next-intl";
import ProductsCardComponent from "./components/productsCard-component";
import { InitiativesCardComponent } from "../initiatives/components/initiativesCard-component";

interface ProductSectionProps {
    courses: any[];
    initiativesData: any[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ courses , initiativesData  }) => {
    const t = useTranslations("trans.home");

  return (
    <>
    <section className="section-box Product-section pt-70 bg-gray pb-90 mt-60">
            <div className="container">
                <div className="head-main">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5">
                            <h3 className="mb-5">{t("Our-products")}</h3>
                            <p className="font-base color-gray-500"> {t("Recommended-Products")} </p>
                        </div>
                        <div className="col-xl-7 col-lg-7">
                            <ul className="nav nav-tabs nav-tabs-underline text-uppercase" role="tablist">
                                <li><a className="active" href="#tab-courses" data-bs-toggle="tab" role="tab" aria-controls="tab-courses" aria-selected="true">{t("Training")}</a></li>
                                <li><a href="#tab-initiatives" data-bs-toggle="tab" role="tab" aria-controls="tab-initiatives" aria-selected="false" className="">{t("Initiatives")}</a></li>
                       
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade active show" id="tab-courses" role="tabpanel" aria-labelledby="tab-courses">
                          <ProductsCardComponent courses={courses}/>
                    </div>                    

                    <div className="tab-pane fade" id="tab-initiatives" role="tabpanel" aria-labelledby="tab-initiatives">
                        <section className="initiatives-section">
                            <InitiativesCardComponent initiatives={initiativesData} />
                        </section>                                                     
                    </div>

  
                </div>
            </div>
        </section>
    </>
  );
}


export default ProductSection;

