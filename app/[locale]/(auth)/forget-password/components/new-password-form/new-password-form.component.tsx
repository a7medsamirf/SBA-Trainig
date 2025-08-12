"use client";

import "./new-password-form.scss";
import SvgEye from "@/components/icons/svg/eye";
import SvgEyeSlash from "@/components/icons/svg/eye-slash";

import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import Image from "next/image";
import { useState } from "react";

interface NewPasswordFormProps {
  control: Control<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  newPasswordHandler: (data: FieldValues) => void;
  isPendingPassword: boolean;
  userEmail: string;
  register: UseFormRegister<FieldValues>;
  setCurrentStep: (step: "email" | "otp" | "password") => void;
  errors: FieldErrors<FieldValues>;
}

export const NewPasswordForm = ({
  handleSubmit,
  newPasswordHandler,
  isPendingPassword,
  register,
  errors,
}: NewPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setshowPasswordConfirmation] =
    useState(false);

  return (
    <div className="new-password-form">
      <h1 className="new-password-form__title">نسيت كلمة السر</h1>

      <form
        onSubmit={handleSubmit(newPasswordHandler)}
        className="flex flex-col gap-10"
        id="new-password-form"
      >
        <div className="flex flex-col gap-8">
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
            <p className="new-password-form__subtitle">
              من فضلك أعد كتابة كلمة سر جديدة ويجب أن تكون مختلفة عن أي كلمة
              مرور قديمة
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="mb-3">
              <div className="form-floating position-relative">
                <input
                  {...register("password", {
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
                  placeholder="كلمة السر"
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
              {errors.password && (
                <p className="my-2 text-danger">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <div className="mb-3">
              <div className="form-floating position-relative">
                <input
                  {...register("password_confirmation", {
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
                  placeholder=" تأكيد كلمة السر"
                />
                <label> تأكيد كلمة السر</label>
                <span
                  className="toggle-password"
                  onClick={() =>
                    setshowPasswordConfirmation(!showPasswordConfirmation)
                  }
                >
                  {showPasswordConfirmation ? (
                    <SvgEyeSlash color="#425A8B" width={30} />
                  ) : (
                    <SvgEye color="#425A8B" width={30} />
                  )}
                </span>
              </div>
              {errors.password_confirmation && (
                <p className="my-2 text-danger">
                  {errors.password_confirmation.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          className="btn btn-buy btn-custom-primary btn-primary"
          type="submit"
          disabled={isPendingPassword}
          form="new-password-form"
        >
          {isPendingPassword && (
            <span
              className="ms-2 spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {isPendingPassword ? "جارٍ التحقق..." : "تأكيد"}
        </button>
      </form>
    </div>
  );
};
