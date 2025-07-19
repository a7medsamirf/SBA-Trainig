import { useRouter } from "@/i18n/routing";
import { forgotPassword, confirmCode, newPassword } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useState, useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { replace } = useRouter();

  const [currentStep, setCurrentStep] = useState<"email" | "otp" | "password">(
    "email"
  );
  const [userEmail, setUserEmail] = useState("");

  // Email submission
  const [isPendingEmail, startTransitionEmail] = useTransition();

  const sendEmailSubmit = withCallbacks(forgotPassword, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
      setCurrentStep("otp");
      setUserEmail(result?.identifier);
      reset({ email: "", identifier: "" });
    },
    onError: (error) => {
      error.error?.message && toast.error(error.error?.message);
    },
  });

  // @ts-ignore
  const [, sendEmailAction] = useActionState(sendEmailSubmit, undefined);

  const sendEmailHandler = async (data: FieldValues) => {
    data.identifier = data.email;
    startTransitionEmail(() => {
      // @ts-ignore
      sendEmailAction(data);
    });
  };

  // OTP verification
  const [isPendingOtp, startTransitionOtp] = useTransition();

  const verifyOtpSubmit = withCallbacks(confirmCode, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
      setCurrentStep("password");
      reset({ code: "" });
    },
    onError: (error) => {
      error.error?.message && toast.error(error.error?.message);
    },
  });

  // @ts-ignore
  const [, verifyOtpAction] = useActionState(verifyOtpSubmit, undefined);

  const verifyOtpHandler = async (data: FieldValues) => {
    const { code } = data;

    startTransitionOtp(() => {
      // @ts-ignore
      verifyOtpAction({ otp: code, identifier: userEmail });
    });
  };

  // New password submission
  const [isPendingPassword, startTransitionPassword] = useTransition();

  const newPasswordSubmit = withCallbacks(newPassword, {
    onSuccess: (result) => {
      result.message && toast.success(result.message);
      setCurrentStep("email");
      replace("/login");
    },
    onError: (error) => {
      error.error?.message && toast.error(error.error?.message);
    },
  });

  // @ts-ignore
  const [, newPasswordAction] = useActionState(newPasswordSubmit, undefined);

  const newPasswordHandler = (data: FieldValues) => {
    const { password, password_confirmation } = data;

    startTransitionPassword(() => {
      // @ts-ignore
      newPasswordAction({
        password,
        password_confirmation,
        identifier: userEmail,
      });
    });
  };

  return {
    control,
    handleSubmit,
    currentStep,
    setCurrentStep,
    userEmail,
    // Email step
    isPendingEmail,
    sendEmailHandler,
    // OTP step
    isPendingOtp,
    verifyOtpHandler,
    // Password step
    isPendingPassword,
    newPasswordHandler,
    setValue,
    trigger,
    register,
    errors,
  };
};
