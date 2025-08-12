"use client";

import SvgEye from "@/components/icons/svg/eye";
import SvgEyeSlash from "@/components/icons/svg/eye-slash";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
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

  const { handleSubmit, register, onSubmit, isPending, errors } =
    useLogin(callbackUrl);

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

  const t = useTranslations('trans');

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
              <h5 className="mb-2 fw-bold">{t('auth.login.title')}</h5>
              <p className="mb-4 text-muted">
                {t('auth.login.description')}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder={t('auth.login.email')}
                  {...register("email", {
                    required: t('auth.login.email_required'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('auth.login.email_invalid'),
                    },
                  })}
                />
                <label>{t('auth.login.email')}</label>
                {errors.email && (
                  <p className="my-2 text-danger">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <div className="form-floating position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder={t('auth.login.password')}
                    {...register("password", {
                      required: t('auth.login.password_required'),
                      minLength: {
                        value: 8,
                        message: t('auth.login.password_length'),
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                        message: t('auth.login.password_pattern'),
                      },
                    })}
                  />
                  <label>{t('auth.login.password')}</label>
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
                {errors.password && (
                  <p className="my-2 text-danger">
                    {errors.password.message as string}
                  </p>
                )}
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
                    {t('auth.login.remember_me')}
                  </label>
                </div>
                <Link href="/forget-password" className="text-success small">
                  {t('auth.login.forgot_password')}
                </Link>
              </div>
              <div className="mt-100">
                <button
                  type="submit"
                  className="mb-3 btn btn-primary w-100"
                  disabled={isPending}
                >
                  {isPending ? t('auth.login.signing_in') : t('auth.login.sign_in')}
                </button>
                <button
                  type="button"
                  className="mb-3 btn btn-outline-primary w-100"
                  onClick={() => setShowNafath(true)}
                >
                  {t('auth.login.login_with_nafath')}
                </button>
              </div>
              <div className="text-center">
                <span>{t('auth.login.no_account')} </span>
                <Link href="/register" className="text-success fw-bold">
                  {t('auth.login.create_account')}
                </Link>
              </div>
            </form>
          </div>
        )}

        {showNafath &&
          (nafathIsVerifying ? (
            <div className="nafath-verification-container">
              <div className="mb-4">
                <h5
                  className="gap-2 mb-3 cursor-pointer fw-bold d-flex align-items-center"
                  onClick={resetNafath}
                >
                  <img
                    src="/images/svg/arrowright.svg"
                    width={20}
                    height={20}
                    alt="arrow-down"
                  />
                  {t('nafath.login.verify_title')}
                </h5>
                <div className="gap-3 nafath-code-display d-flex justify-content-center">
                  {nafathData?.random
                    ?.split("")
                    .map((digit: string, index: number) => (
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
                <h5 className="mb-2 fw-bold">{t('nafath.login.title')}</h5>
                <p className="mb-4 text-muted">
                  {t('nafath.login.description')}
                </p>
              </div>
              <form onSubmit={nafathHandleSubmit(nafathHandler)}>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="nafath_id"
                    placeholder={t('nafath.login.id_number')}
                    {...nafathRegister("nafath_id", {
                      required: t('nafath.login.id_required'),
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: t('nafath.login.id_invalid'),
                      },
                    })}
                  />
                  {nafathErrors.nafath_id && (
                    <p className="text-danger">
                      {nafathErrors.nafath_id.message as string}
                    </p>
                  )}
                  <label htmlFor="nafath_id">{t('nafath.login.id_number')}</label>
                </div>
                <div className="mt-100">
                  <button
                    type="submit"
                    className="gap-2 mb-3 btn btn-primary w-100 d-flex align-items-center justify-content-center"
                    disabled={nafathIsPending}
                  >
                    {nafathIsPending && (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {t('nafath.login.continue')}
                  </button>
                </div>
              </form>
            </div>
          ))}
      </div>
      {/* Guest login link at the bottom */}
      <div className="text-center guest-login-bottom">
        <Link href="/" className="text-muted">
          {t('auth.login.guest_login')}
        </Link>
      </div>
    </>
  );
};