"use client";

import { useForgotPasswordForm } from "../../hooks";
import { ForgotPasswordOtp, NewPasswordForm } from "../index";
import "./forgot-password-form.scss";
import { ArrowLeft } from "@/components/icons/icons";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export const ForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    currentStep,
    isPendingEmail,
    sendEmailHandler,
    isPendingOtp,
    verifyOtpHandler,
    isPendingPassword,
    newPasswordHandler,
    setValue,
    trigger,
    setCurrentStep,
    register,
    errors,
    userEmail,
  } = useForgotPasswordForm();

  // Step 2: OTP Verification
  if (currentStep === "otp") {
    return (
      <>
        <button className="back-button" onClick={() => setCurrentStep("email")}>
          <ArrowLeft width={16} height={16} />
        </button>
        <ForgotPasswordOtp
          control={control}
          handleSubmit={handleSubmit}
          verifyOtpHandler={verifyOtpHandler}
          isPendingOtp={isPendingOtp}
          setValue={setValue}
          trigger={trigger}
          userEmail={userEmail}
          setCurrentStep={setCurrentStep}
        />
      </>
    );
  }

  // Step 3: New Password Form
  if (currentStep === "password") {
    return (
      <>
        <button className="back-button" onClick={() => setCurrentStep("otp")}>
          <ArrowLeft width={16} height={16} />
        </button>
        <NewPasswordForm
          control={control}
          handleSubmit={handleSubmit}
          newPasswordHandler={newPasswordHandler}
          isPendingPassword={isPendingPassword}
          userEmail={userEmail}
          errors={errors}
          register={register}
          setCurrentStep={setCurrentStep}
        />
      </>
    );
  }

  // Step 1: Email Input (Default)
  return (
    <>
      <Link href="/login">
        <ArrowLeft width={16} height={16} />
      </Link>

      <div className="forgot-password-form">
        <h1 className="forgot-password-form__title">نسيت كلمة السر</h1>

        <form
          onSubmit={handleSubmit(sendEmailHandler)}
          className="flex flex-col gap-6"
          id="forgot-password-email"
        >
          <div className="flex flex-col gap-4 text-center">
            <div className="d-flex justify-content-center align-items-center">
              <Image
                src={`/images/pass.svg`}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "35%", height: "auto" }}
              />
            </div>
            <p className="forgot-password-form__subtitle">
              أدخل البريد الإلكتروني الخاص بك لاإعادة تعيين كلمة السر
            </p>
          </div>

          <div className="mb-[81px] d-flex flex-column gap-4">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="البريد الإلكتروني "
                {...register("email", {
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "البريد الإلكتروني غير صالح",
                  },
                })}
              />
              <label>البريد الإلكتروني</label>
            </div>
            {errors?.email && (
              <p className="text-danger">{errors?.email?.message as string}</p>
            )}
          </div>

          <button
            className="btn btn-buy btn-custom-primary btn-primary"
            type="submit"
            disabled={isPendingEmail}
            form="forgot-password-email"
          >
            {isPendingEmail && (
            <span
              className="ms-2 spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
            {isPendingEmail ? "جارٍ التحقق..." : "تأكيد"}
          </button>
        </form>
      </div>
    </>
  );
};
