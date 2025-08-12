import React from "react";
import { confirmCode } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export const useConfirmOtp = (onSuccess: () => void, email: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ otpCode: string }>();

  const [isPending, startTransition] = useTransition();

  const confirmOtpSubmit = withCallbacks(confirmCode, {
    onSuccess: (result) => {
      toast.success(result.message || "تم تأكيد الكود وتغيير البريد بنجاح");
      reset();
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.error?.message || "الكود غير صحيح أو انتهت صلاحيته");
    },
  });

  // @ts-ignore
  const [, confirmOtpAction] = useActionState(confirmOtpSubmit, undefined);

  const confirmOtpHandler = (data: FieldValues, event?: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // إضافة البريد الإلكتروني إلى البيانات المرسلة
    const dataWithEmail = {
      ...data,
      email: email
    };

    startTransition(() => {
      // @ts-ignore
      confirmOtpAction(dataWithEmail);
    });
  };

  return {
    register,
    handleSubmit,
    confirmOtpHandler,
    isPending,
    errors,
  };
};