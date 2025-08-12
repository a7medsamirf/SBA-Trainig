"use client";

import { Input } from "@/components/input/input.component";
import "./newsletter.scss";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { sendContactMessageAction } from "@/server-actions"; // غيّر المسار حسب مكان الفنكشن

export const NewsletterSection = () => {
  const t = useTranslations("trans");
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<{ email: string }>();
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
            <h3 className="mb-10 color-white">{t("NewsletterSection.title")}</h3>
            <p className="font-lg color-white">
              {t("NewsletterSection.To-view")}
              <span className="text-white font-lg-bold">
                {" "}
                {t("NewsletterSection.latest-news")}{" "}
              </span>
            </p>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="box-form-newsletter mt-15">
              <form
                className="form-newsletter"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3 form-floating">
                  <input
                    {...register("email", {
                      required: "البريد الإلكتروني مطلوب",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "يجب أن يكون البريد الإلكتروني صالح",
                      },
                    })}
                    type="email"
                    className={`form-control ${
                      errors.email ? "border-danger" : ""
                    }`}
                    id="email"
                    placeholder={t('auth.registerForm.email')}
                  />
                  <label>{t('auth.registerForm.email')}</label>
                  {errors.email && (
                    <p className="my-2 text-danger">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-brand-2 d-flex align-items-center justify-content-center"
                  disabled={isPending}
                >
                  {isPending && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                  )}
                  {t("NewsletterSection.subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
