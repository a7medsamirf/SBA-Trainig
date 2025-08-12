"use server";

import axiosBase from "@/utils/axios.util";
import { revalidatePath } from "next/cache";

export const removeFromCartApi = async (courseId: number) => {
  try {
    console.log("🚀 ~ removeFromCartApi ~ courseId:", courseId);
    // const res = await axiosBase.delete(`/carts/delete?course_id=${courseId}`);
    const res = await axiosBase.get(`/carts/delete?course_id=${courseId}`);
    console.log("🚀 ~ removeFromCartApi ~ res:", res);

    const data = (await res.data) as any;

    revalidatePath(`/cart`);

    return data;
  } catch (error) {
    console.error("❌ Error removing course from cart:", error);
    return null;
  }
};
