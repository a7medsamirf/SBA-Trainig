"use server";

import axiosBase from "@/utils/axios.util";
import { revalidatePath } from "next/cache";

export const enrollment = async (
  prevState: string | undefined,
  formData: any
) => {
  const { course_ids } = formData;

  try {
    const res = await axiosBase.post(
      "/enrollment",
      {
        course_ids,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = (await res.data) as any;

    revalidatePath("/cart");

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
