"use server";
import { fetcher } from "@/utils";

export const removeFromCartApi = async (courseId: number) => {
    try {
      const res = await fetcher({
        url: `carts/delete?course_id=${courseId}`,
        method: "DELETE",
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "خطأ في الحذف");
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("❌ Error removing course from cart:", error);
      return null;
    }
  }
  