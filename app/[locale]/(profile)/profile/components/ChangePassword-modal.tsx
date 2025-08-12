"use client";

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ChangePassword.scss";
import SvgEye from "@/components/icons/svg/eye";
import SvgEyeSlash from "@/components/icons/svg/eye-slash";
import useChangePassword from "../hooks/change-password.hook";
import { useTranslations } from "next-intl";

export default function ChangePasswordModal({
  show,
  onHide,
  user,
}: {
  show: boolean;
  onHide: () => void;
  user: any;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
    
  const {
    changePasswordHandler,
    handleSubmit,
    isPendingPassword,
    register,
    errors,
  } = useChangePassword(user, onHide);
  const t = useTranslations("trans.ChangePassword");
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      contentClassName="p-3 flex flex-col gap-2"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold change-password-modal-title h5">
        {t("title")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="" style={{ marginBottom: "30px" }}>
          <div className="mb-2 change-password-modal-title fw-bold">
          {t("enterNewPassword")}
          </div>
          <div
            className="text-muted change-password-modal-description"
            style={{ fontSize: "1rem" }}
          >
          {t("newPasswordDescription")}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(changePasswordHandler)(e);
          }}
          className="flex flex-col"
          style={{ gap: "48px" }}
          id="change-password-form"
        >
          <div className="flex flex-col gap-4">
            <div className="mb-3 form-floating position-relative">
              <input
                {...register("current_password")}
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder={t("currentPassword")}
                required
              />
             <label>{t("currentPassword")}</label>
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

            <div className="mb-3">
              <div className="form-floating position-relative">
                <input
                  {...register("new_password", {
                    required: "كلمة السر مطلوبة",
                    minLength: {
                      value: 8,
                      message: "يجب أن يكون كلمة السر 8 أحرف على الأقل",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                      message:
                        "يجب أن تحتوي كلمة السر على رقم ورمز خاص على الأقل",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder={t("newPassword")}
                />
             <label>{t("newPassword")}</label>
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
              {errors.new_password && (
                <p className="my-2 text-danger">
                  {errors.new_password.message as string}
                </p>
              )}
            </div>

            <div className="mb-3">
              <div className="form-floating position-relative">
                <input
                  {...register("new_password_confirmation", {
                    required: "تأكيد كلمة السر مطلوب",
                    minLength: {
                      value: 8,
                      message: "يجب أن يكون كلمة السر 8 أحرف على الأقل",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                      message:
                        "يجب أن تحتوي كلمة السر على رقم ورمز خاص على الأقل",
                    },
                  })}
                  type={showPasswordConfirmation ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder={t("confirmPassword")}
                />
                  <label>{t("confirmPassword")}</label>
                <span
                  className="toggle-password"
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? (
                    <SvgEyeSlash color="#425A8B" width={30} />
                  ) : (
                    <SvgEye color="#425A8B" width={30} />
                  )}
                </span>
              </div>
              {errors.new_password_confirmation && (
                <p className="my-2 text-danger">
                  {errors.new_password_confirmation.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="gap-4 d-flex justify-content-between">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={onHide}
              style={{ width: "172px" }}
            >
             {t("cancel")}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "172px" }}
              disabled={isPendingPassword}
              form="change-password-form"
            >
              {isPendingPassword && (
                <span
                  className="ms-2 spinner-border text-light spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}

            {isPendingPassword ? t("changing") : t("changePassword")}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
