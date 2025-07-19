"use client";

import "../otp.scss";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useOtp } from "../hooks/use-otp.hook";

import Image from "next/image";
import { InputOtp } from "@/components";
import { useResendOtp } from "@/hooks/common/resend-otp.hook";

export const OtpComponents = () => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    isPending,
    onSubmit,
    userData,
  } = useOtp();
  const [timer, setTimer] = useState(60);

  const resetTimer = () => {
    setTimer(60);
  };

  const { resendOtpHandler, isPending: isPendingResendOtp } =
    useResendOtp(resetTimer);

  const handleResendOtp = () => {
    resendOtpHandler(userData?.email);
  };

  const searchParams = useSearchParams();

  const phone = searchParams.get("phone");

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
    <div className="otp-bg min-vh-100">
      <div className="p-5 text-center border-0 otp-card card">
        <h5 className="mb-4 fw-bold">تأكيد رقم الجوال</h5>
        <div className="mb-2 d-flex justify-content-center align-items-center">
          <Image
            src={`/images/pass.svg`}
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "35%", height: "auto" }}
            className="mb-4"
          />
        </div>
        <p className="mb-4 text-muted small">
          أدخل رمز التأكيد OTP المكون من 4 ارقام الذى تم أرساله إلى البريد
          الإلكتروني <strong className="fw-bold"> {userData?.email}</strong>
        </p>
        <div className="mb-4">
          <Link
            href=""
            className="text-success fw-bold small text-decoration-underline"
          >
            تغيير رقم الجوال
          </Link>
        </div>

        <form
          className="gap-2 mb-2 d-flex justify-content-center"
          onSubmit={handleSubmit(onSubmit)}
          id="otp-form"
        >
          <InputOtp
            digitsLength={4}
            control={control}
            name="otp"
            required
            setValue={setValue}
            trigger={trigger}
            className=""
          />
        </form>

        <div className="mb-3 text-center text-gray small">
          {timer > 0 && !isPendingResendOtp ? (
            <>
              يمكنك إعادة إرسال الكود خلال{" "}
              <span className="text-success">{formatTime(timer)}</span>
            </>
          ) : (
            <button
              type="button"
              className="fw-bold text-success"
              onClick={handleResendOtp}
              disabled={isPendingResendOtp}
            >
              {isPendingResendOtp && (
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

        <button
          className="btn btn-buy btn-custom-primary btn-primary"
          type="submit"
          form="otp-form"
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? "جارٍ التحقق..." : "تأكيد"}
        </button>
      </div>
    </div>
  );
};
