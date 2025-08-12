"use client";
import React from "react";
import { resendOtp } from "@/server-actions";
import { withCallbacks } from "@/utils";
import { useActionState, useTransition } from "react";
import { useForm, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

export const useSendEmailOtp = (onSuccess: (email: string) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<{ email: string }>();

  const [isPending, startTransition] = useTransition();

  const sendOtpSubmit = withCallbacks(resendOtp, {
    onSuccess: (result) => {
      const email = getValues("email");
      toast.success(result.message || "تم إرسال كود التحقق بنجاح");
      reset();
      onSuccess(email);
    },
    onError: (error) => {
      toast.error(error.error?.message || "حدث خطأ أثناء إرسال كود التحقق");
    },
  });

  // @ts-ignore
  const [, sendOtpAction] = useActionState(sendOtpSubmit, undefined);

  const sendOtpHandler = (data: FieldValues, event?: React.BaseSyntheticEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    startTransition(() => {
      // @ts-ignore
      sendOtpAction(data);
    });
  };

  return {
    register,
    handleSubmit,
    sendOtpHandler,
    isPending,
    errors,
  };
};