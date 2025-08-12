"use server";

import axiosBase from "@/utils/axios.util";

// send forget password phone
export const forgotPassword = async (
  prevState: string | undefined,
  formData: any
) => {
  const { identifier } = formData;

  try {
    const res = await axiosBase.post("/forget-password", {
      identifier: identifier,
    });

    const data = res?.data as any;

    return {
      succeeded: true,
      identifier,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error.response.data,
    };
  }
};

export const newForgetPassword = async (
  prevState: string | undefined,
  formData: any
) => {
  const { identifier } = formData;
  console.log("🚀 ~ newForgetPassword ~ formData:", formData);

  try {
    const res = await axiosBase.post("/forget-change-password", formData);

    const data = res?.data as any;

    return {
      succeeded: true,
      identifier,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error.response.data,
    };
  }
};

//confirm code for forget password
export const confirmCode = async (
  prevState: string | undefined,
  formData: any
) => {
  try {
    const res = await axiosBase.post("/verify-otp", formData);

    const data = res?.data as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error.response.data,
    };
  }
};
//set new password
export const newPassword = async (
  prevState: string | undefined,
  formData: any
) => {
  try {
    const res = await axiosBase.post("/profile/change-password", formData);

    const data = res?.data as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error.response.data,
    };
  }
};
