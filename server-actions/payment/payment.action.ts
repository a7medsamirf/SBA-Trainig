"use server";

import axiosBase from "@/utils/axios.util";

export const generateCheckoutId = async (
  prevState: string | undefined,
  formData: any
) => {
  try {
    const res = await axiosBase.post("/payment/generate-checkout-id", formData);

    const data = (await res.data) as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    console.log(error);

    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
};

export const getPaymentStatus = async (
  prevState: string | undefined,
  formData: {
    checkout_id: string;
    payment_method: string;
    current_channel?: string;
  }
) => {
  try {
    const res = await axiosBase.post("/payment/get-payment-status", formData);

    const data = (await res.data) as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    console.log(error);

    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
};
