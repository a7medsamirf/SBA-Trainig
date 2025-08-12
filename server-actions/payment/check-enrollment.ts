"use server";
import axiosBase from "@/utils/axios.util";

export const CheckEnrollmentAvailable = async (formData: any) => {
  try {
    const res = await axiosBase.post("/payment/check-enrollment-available", formData);
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