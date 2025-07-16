"use client";

import "../otp.scss";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useOtp } from "../hooks/use-otp.hook";

import Image from "next/image";
import { InputOtp } from "@/components";

export const OtpComponents = () => {
  const { control, handleSubmit, setValue, trigger, isPending, onSubmit } =
    useOtp();
  const [timer, setTimer] = useState(60);

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
          أدخل رمز التأكيد OTP المكون من 4 أرقام الذي تم إرساله إلى
          <strong className="fw-bold"> {phone || "رقم غير معروف"}</strong>
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
          {/* {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              className="text-center form-control otp-input"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              style={{ width: 48, height: 48, fontSize: 24 }}
              dir="ltr"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))} */}
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

        <div className="mb-3 text-success small">
          {timer > 0 ? (
            <>
              يمكنك إعادة إرسال الكود خلال <span>{formatTime(timer)}</span>
            </>
          ) : (
            <Link
              href=""
              className="fw-bold text-success"
              onClick={(e) => {
                e.preventDefault();
                setTimer(60);
              }}
            >
              إعادة إرسال
            </Link>
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
