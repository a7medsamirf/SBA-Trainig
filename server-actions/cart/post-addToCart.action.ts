"use server";

import { fetcher } from "@/utils";

const DEFAULT_SUCCESS_MSG = "تمت إضافة الدورة للسلة";
const DEFAULT_ALREADY_MSG = "الدورة موجودة بالفعل في السلة";
const DEFAULT_ERROR_MSG = "فشل الإضافة للسلة";
const DEFAULT_EXCEPTION_MSG = "حدث خطأ أثناء محاولة الإضافة للسلة";

interface AddToCartPayload {
  course_id: number;
}

interface AddToCartResponse {
  succeeded: boolean;
  message: string;
  status?: number;
  data?: any;
  courseId?: number; // ✅ أضفنا ده
  alreadyInCart?: boolean;
  error?: any;
}

export const addToCartApi = async (
  payload: AddToCartPayload
): Promise<AddToCartResponse> => {
  try {
    const response = await fetcher({
      url: "carts/store",
      method: "POST",
      options: {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    const data = await response.json();

    const alreadyInCart =
      data.message &&
      (data.message.includes("already in the cart") ||
        data.message.includes("موجودة بالفعل"));

    if (response.ok) {
      return {
        succeeded: true,
        message: data.message || DEFAULT_SUCCESS_MSG,
        status: response.status,
        data: data.data,
        courseId: data?.data?.course_id, // ✅ رجّعنا course_id مباشرة
        alreadyInCart,
      };
    } else {
      return {
        succeeded: false,
        message: data.message || DEFAULT_ERROR_MSG,
        status: response.status,
        error: data.error || null,
      };
    }
  } catch (error: any) {
    console.error("❌ Error adding to cart:", error);
    return {
      succeeded: false,
      message: DEFAULT_EXCEPTION_MSG,
      error: error?.message || error,
    };
  }
};
