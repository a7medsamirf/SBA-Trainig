"use server";

import axiosBase from "@/utils/axios.util";
import { revalidatePath } from "next/cache";

export const subscribeCourse = async (
  prevState: string | undefined,
  formData: any
) => {
  const { slug, ...otherData } = formData;

  try {
    const res = await axiosBase.post("/course-pay-requests", otherData);
    const data = (await res.data) as any;

    revalidatePath(`/training/${slug}`);

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
