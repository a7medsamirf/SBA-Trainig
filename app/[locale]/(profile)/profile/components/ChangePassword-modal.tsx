"use client";

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ChangePassword.scss";
import SvgEye from "@/components/icons/svg/eye";
import SvgEyeSlash from "@/components/icons/svg/eye-slash";
import useChangePassword from "../hooks/change-password.hook";

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

  const { changePasswordHandler, handleSubmit, isPendingPassword, register } =
    useChangePassword(user, onHide);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      contentClassName="p-3 flex flex-col gap-2"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold change-password-modal-title">
          تغيير كلمة المرور
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="text-end" style={{ marginBottom: "24px" }}>
          <div className="mb-1 change-password-modal-title fw-bold">
            برجاء أدخل كلمة السر الجديدة
          </div>
          <div
            className="text-muted change-password-modal-description"
            style={{ fontSize: "1rem" }}
          >
            من فضلك أعد كتابة كلمة سر جديدة ويجب أن تكون مختلفة عن أي كلمة مرور
            قديمة
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
                placeholder="كلمة السر الحالية"
                required
              />
              <label> كلمة السر الحالية</label>
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

            <div className="mb-3 form-floating position-relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="كلمة السر"
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

            <div className="mb-3 form-floating position-relative">
              <input
                {...register("password_confirmation")}
                type={showPasswordConfirmation ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder=" تأكيد كلمة السر"
                required
              />
              <label> تأكيد كلمة السر</label>
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
          </div>

          <div className="gap-4 d-flex justify-content-between">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={onHide}
              style={{ width: "172px" }}
            >
              إلغاء
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

              {isPendingPassword ? "جارٍ التغيير..." : "تغيير كلمة السر"}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
