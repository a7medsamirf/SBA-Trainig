"use client";

import SvgEye from "@/components/icons/svg/eye";
import SvgEyeSlash from "@/components/icons/svg/eye-slash";
import { Link } from "@/i18n/routing";
import React, { useState } from "react";
import Image from "next/image";
import { useLogin } from "../hooks/use-login.hook";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useNafathLogin } from "../hooks/use-nafath-login.hook";

export const LoginFormComponent = () => {
  const searchParams = useSearchParams();
  const langLocal = useLocale();
  const callbackUrl = searchParams.get("callbackUrl") || `/${langLocal}`;

  const { handleSubmit, register, onSubmit, isPending } = useLogin(callbackUrl);

  const {
    handleSubmit: nafathHandleSubmit,
    isPending: nafathIsPending,
    isVerifying: nafathIsVerifying,
    register: nafathRegister,
    nafathHandler,
    errors: nafathErrors,
    nafathData,
    setIsVerifying,
  } = useNafathLogin();


  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNafath, setShowNafath] = useState(false);

  const resetNafath = () => {
    setIsVerifying(false);
  };


  return (
    <>
      <div className="p-4 login-form-box w-100 p-md-5">
        <div className="mb-4 text-center">
          <Image
            src={`/images/logo_ar.png`}
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "50%", height: "auto" }}
            className="w-50"
          />
        </div>

        {!showNafath && (
          <div className="login-form">
            <div className="mb-30">
              <h5 className="mb-2 fw-bold">تسجيل الدخول</h5>
              <p className="mb-4 text-muted">
                ادخل بيانات تسجيل الدخول الخاصة بك
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="البريد الإلكتروني "
                  {...register("email")}
                  required
                />
                <label>البريد الإلكتروني</label>
              </div>

              <div className="mb-3 form-floating position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="كلمة السر"
                  {...register("password")}
                  required
                />
                <label> كلمة السر</label>
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <SvgEyeSlash color="#425A8B" width={30} />
                  ) : (
                    <SvgEye color="#425A8B" width={30} />
                  )}
                </span>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    تذكرني
                  </label>
                </div>
                <Link href="/forget-password" className="text-success small">
                  نسيت كلمة السر؟
                </Link>
              </div>
              <div className="mt-100">
                <button
                  type="submit"
                  className="mb-3 btn btn-primary w-100"
                  disabled={isPending}
                >
                  {isPending ? "جاري الدخول..." : "تسجيل الدخول"}
                </button>
                <button
                  type="button"
                  className="mb-3 btn btn-outline-primary w-100"
                  onClick={() => setShowNafath(true)}
                >
                  تسجيل عن طريق نفاذ
                </button>
              </div>
              <div className="text-center">
                <span>ليس لديك حساب؟ </span>
                <Link href="/register" className="text-success fw-bold">
                  إنشاء حساب جديد
                </Link>
              </div>
            </form>
          </div>
        )}

        {showNafath &&
          (nafathIsVerifying ? (
            <div className="nafath-verification-container">
              <div className="mb-4">
                <h5 className="gap-2 mb-3 cursor-pointer fw-bold d-flex align-items-center" onClick={resetNafath}>
                  <img
                    src="/images/svg/arrowright.svg"
                    width={20}
                    height={20}
                    alt="arrow-down"
                  />
                  تحقق نفاذ 
                </h5>
                <div className="gap-3 nafath-code-display d-flex justify-content-center">
                  {nafathData?.random?.split('').map((digit: string, index: number) => (
                    <div key={index} className="nafath-digit-circle">
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="login-Nafath">
              <div className="mb-30">
                <h5 className="mb-2 fw-bold"> تسجيل عن طريق نفاذ </h5>
                <p className="mb-4 text-muted">
                  ادخل رقم الهوية الخاص بك للدخول عن طريق نفاذ
                </p>
              </div>
              <form onSubmit={nafathHandleSubmit(nafathHandler)}>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="nafath_id"
                    placeholder="رقم الهوية"
                    {...nafathRegister("nafath_id", {
                      required: "رقم الهوية مطلوب",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "رقم الهوية يجب أن يكون 10 أرقام",
                      },
                    })}
                  />
                  {nafathErrors.nafath_id && (
                    <p className="text-danger">
                      {nafathErrors.nafath_id.message as string}
                    </p>
                  )}
                  <label htmlFor="nafath_id">رقم الهوية</label>
                </div>
                <div className="mt-100">
                  <button
                    type="submit"
                    className="gap-2 mb-3 btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    disabled={nafathIsPending}
                  >
                    {nafathIsPending && (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    
                    متابعة
                  </button>
                </div>
              </form>
            </div>
          ))}
      </div>
      {/* Guest login link at the bottom */}
      <div className="text-center guest-login-bottom">
        <Link href="/" className="text-muted">
          الدخول كزائر
        </Link>
      </div>
    </>
  );
};
