"use client";

import { Input } from "@/components/input/input.component";
import "./newsletter.scss";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { sendContactMessageAction } from "@/server-actions"; // غيّر المسار حسب مكان الفنكشن

export const NewsletterSection = () => {
  const t = useTranslations("trans.NewsletterSection");
  const { control, handleSubmit, reset } = useForm<{ email: string }>();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: { email: string }) => {
    startTransition(async () => {
      try {
        await sendContactMessageAction(data.email);
        toast.success("تم الاشتراك بنجاح");
        reset(); // يفضي الفورم
      } catch (err) {
        toast.error("حدث خطأ أثناء الاشتراك");
      }
    });
  };

  return (
    <section className="section-box box-newsletter bg-brand-3">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-lg-5 col-md-7 col-sm-12">
            <h3 className="color-white mb-10">{t("title")}</h3>
            <p className="font-lg color-white">
              {t("To-view")}
              <span className="font-lg-bold text-white"> {t("latest-news")} </span>
            </p>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="box-form-newsletter mt-15">
              <form className="form-newsletter" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="البريد الإلكتروني"
                  name="email"
                  control={control}
                  placeholder={t("email")}
                  type="email"
                  className="input-newsletter font-xs"
                  rules={{
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "البريد الإلكتروني غير صحيح",
                    },
                  }}
                />

                <button
                  type="submit"
                  className="btn btn-brand-2 d-flex align-items-center justify-content-center"
                  disabled={isPending}
                >
                  {isPending && (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  )}
                  {t("subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
