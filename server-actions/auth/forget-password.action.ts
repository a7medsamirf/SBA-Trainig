"use server";

import axiosBase from "@/utils/axios.util";
import { getTranslations } from "next-intl/server";

// send forget password phone
export const forgotPassword = async (
  prevState: string | undefined,
  formData: any
) => {
  const t = await getTranslations("trans");

  const phone = formData.phone;

  try {
    const res = await axiosBase.post("/Account/SendResetPasswordCode", {
      identity: phone,
    });

    const data = res?.data as any;

    return {
      succeeded: true,
      phone,
      ...data,
      otp: data?.data?.token,
      message: t("verifyOtp.resend.success"),
    };
  } catch (error: any) {
    return error.response.data;
  }
};
//confirm code for forget password
export const confirmCode = async (
  prevState: string | undefined,
  formData: any
) => {
  const code = formData.otp;

  try {
    return {
      succeeded: true,
      meta: null,
      code,
    };
  } catch (error: any) {
    return error.response.data;
  }
};
//set new password
export const newPassword = async (
  prevState: string | undefined,
  formData: any
) => {
  const t = await getTranslations("trans");

  try {
    const res = await axiosBase.post("/Account/reset-password", formData);

    const data = res?.data as any;

    return {
      succeeded: true,
      meta: null,
      ...data,
      message: t("forget-password.success"),
    };
  } catch (error: any) {
    return error.response.data;
  }
};
