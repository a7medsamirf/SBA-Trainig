"use client";
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { InputOtp } from "@/components";
import { useResendOtp } from "@/hooks/common/resend-otp.hook";
import { useOtp } from "@/app/[locale]/(auth)/otp/hooks/use-otp.hook";

interface EnterOtpModalProps {
  show: boolean;
  onHide: () => void;
}

export const EnterOtpModal: React.FC<EnterOtpModalProps> = ({ show, onHide }) => {
  const t = useTranslations("trans.otp");
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
    if (userData?.email) {
      resendOtpHandler(userData.email);
      resetTimer();
    }
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
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      contentClassName="p-3"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold h5">تغيير البريد الالكتروني</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="otp-bg min-vh-100">
          <div className="p-5 text-center border-0 otp-card card">
            <h5 className="mb-4 fw-bold">{t("phone-confirmation")}</h5>
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
            <p className="mb-4 text-muted small leading-[160%]">
              {t("enter-otp-code")} <strong className="fw-bold">{userData?.email}</strong>
            </p>

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

            <div className="my-3 text-center text-gray small">
              {timer > 0 && !isPendingResendOtp ? (
                <>
                  {t("resend-code-in")}
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
                  {isPending ? t("sending") : t("resend")}
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
              {isPending ? t("verifying") : t("confirm")}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
