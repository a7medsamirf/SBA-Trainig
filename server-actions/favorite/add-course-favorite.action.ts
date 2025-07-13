"use server";

import axiosBase from "@/utils/axios.util";
import { revalidatePath } from "next/cache";

export async function toggleCourseFavorite(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const res = await axiosBase.post("/courses-toggle-favorite", formData);

    const data = (await res.data) as any;

    revalidatePath("/");
    revalidatePath("/training");

    return {
      succeeded: true,
      message: data?.message,
      data,
    };
  } catch (error: any) {
    console.error("🚀 ~ error:", error);

    return {
      succeeded: false,
      error: error?.response?.data,
    };
  }
}
