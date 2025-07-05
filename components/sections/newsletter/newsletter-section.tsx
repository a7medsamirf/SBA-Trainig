import "./newsletter.scss";
import { useTranslations } from "next-intl";

const NewsletterSection = () => {
    const t = useTranslations("trans.NewsletterSection");
  return (
    <>
      <section className="section-box box-newsletter bg-brand-3">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-5 col-md-7 col-sm-12">
              <h3 className="color-white mb-10">{t("title")}</h3>
              <p className="font-lg color-white">
            {t("To-view")} 
                <span className="font-lg-bold text-white">  {t("latest-news")} </span>
              </p>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12">
              <div className="box-form-newsletter mt-15">
                <form className="form-newsletter">
                  <input
                    className="input-newsletter font-xs"
                    placeholder={t("email")}
                  />
                  <button className="btn btn-brand-2"> {t("subscribe")}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsletterSection


