"use server";

import axiosBase from "@/utils/axios.util";

// send resend otp
export const resendOtp = async (
  prevState: string | undefined,
  formData: any
) => {
  const { email } = formData;

  try {
    const res = await axiosBase.post("/resend-otp", {
      email,
    });

    const data = res?.data as any;

    return {
      succeeded: true,
      email,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error.response.data,
    };
  }
};
