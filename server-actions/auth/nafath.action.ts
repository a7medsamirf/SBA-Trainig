"use server";

import axiosBase from "@/utils/axios.util";

export const InitiateNafathAuth = async (idNumber: string) => {
  try {
    // simulate send a request to nafath
    const res2 = await new Promise((resolve, reject) => {
      resolve({
        data: {
          transId: "123",
          random: 50,
        },
      });
    });

    return res2;

    const res = await axiosBase.post(`/Account/InitiateNafathAuth/${idNumber}`);

    const data = await res.data;

    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
    return error?.response?.data;
  }
};

export const NafathStatus = async (
  nationalId: string,
  transId: string,
  random: number
) => {
  const controller = new AbortController();

  // Set timeout to cancel request after 50 seconds
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 50500);

  try {
    // simulate success verification
    const res2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: true,
          succeeded: true,
        });
      }, 5000);
    });

    return res2;

    const res = await axiosBase.post(
      `/Account/NafathStatus`,
      {
        nationalId,
        transId,
        random,
      },
      {
        signal: controller.signal,
      } as any
    );

    clearTimeout(timeoutId);
    const data = await res.data;
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request cancelled due to timeout");
    }
    console.error("🚀 ~ error:", error);
    return (error as any)?.response?.data;
  }
};
