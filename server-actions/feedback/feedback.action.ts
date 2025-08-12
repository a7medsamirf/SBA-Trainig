"use server";

import axiosBase from "@/utils/axios.util";

export const sendFeedback = async (prevState: any, formData: any) => {
  try {
    const res = await axiosBase.post("/feedback-submit", formData);

    const data = (await res.data) as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
};
