"use client";

import "./forgot-password-otp.scss";
import { InputOtp } from "@/components";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useResendOtp } from "@/hooks/common/resend-otp.hook";

interface ForgotPasswordOtpProps {
  control: Control<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  verifyOtpHandler: (data: FieldValues) => void;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  isPendingOtp: boolean;
  userEmail: string;
  setCurrentStep: (step: "email" | "otp" | "password") => void;
}

export const ForgotPasswordOtp = ({
  control,
  handleSubmit,
  verifyOtpHandler,
  isPendingOtp,
  setValue,
  trigger,
  userEmail,
  setCurrentStep,
}: ForgotPasswordOtpProps) => {
  const [timer, setTimer] = useState(60);

  const resetTimer = () => {
    setTimer(60);
  };

  const { resendOtpHandler, isPending } = useResendOtp(resetTimer);

  const handleResendOtp = () => {
    resendOtpHandler(userEmail);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  return (
    <div className="forgot-password-otp">
      <h1 className="forgot-password-otp__title">نسيت كلمة السر</h1>

      <form
        onSubmit={handleSubmit(verifyOtpHandler)}
        className="flex flex-col gap-6"
        id="forgot-password-otp"
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
          <p className="forgot-password-otp__subtitle">
            أدخل رمز التأكيد OTP المكون من 4 ارقام الذى تم أرساله إلى البريد
            الإلكتروني{" "}
            <span className="forgot-password-otp__user-email">{userEmail}</span>
          </p>

          <button
            onClick={() => setCurrentStep("email")}
            type="button"
            className="text-success fw-bold small text-decoration-underline"
          >
            تغيير البريد الاكتروني
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <InputOtp
            control={control}
            name="code"
            required
            digitsLength={4}
            className="mx-auto"
            setValue={setValue}
            trigger={trigger}
          />

          <div className="mb-3 text-center text-gray small">
            {timer > 0 && !isPending ? (
              <>
                يمكنك إعادة إرسال الكود خلال{" "}
                <span className="text-success">{formatTime(timer)}</span>
              </>
            ) : (
              <button
                type="button"
                className="fw-bold text-success"
                onClick={handleResendOtp}
                disabled={isPending}
              >
                {isPending && (
                  <span
                    className="ms-2 spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}

                {isPending ? "جارٍ الإرسال..." : "إعادة إرسال"}
              </button>
            )}
          </div>
        </div>

        <button
          className="btn btn-buy btn-custom-primary btn-primary"
          type="submit"
          disabled={isPendingOtp}
          form="forgot-password-otp"
        >
          {isPendingOtp ? "جارٍ التحقق..." : "تأكيد"}
        </button>
      </form>
    </div>
  );
};
