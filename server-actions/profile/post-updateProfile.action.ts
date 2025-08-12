"use server";

import axiosBase from "@/utils/axios.util";
import { revalidatePath } from "next/cache";

export const updateProfileApi = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    // طباعة البيانات المرسلة للتأكد (يمكن حذفها في الإنتاج)
    console.log("Sending profile update request...");
    
    // التحقق من وجود الصورة
    const avatar = formData.get('avatar');
    if (avatar && avatar instanceof File) {
      console.log("Avatar file found:", {
        name: avatar.name,
        size: avatar.size,
        type: avatar.type
      });
    }

    // إرسال الطلب
    const res = await axiosBase.post("/profile", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 ثانية
    });

    const data = (await res.data) as any;

    // إعادة تحديث الصفحة
    revalidatePath("/profile");

    console.log("Profile updated successfully:", data);

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    console.error("❌ Error updating profile:", error);
    
    // معالجة أخطاء مختلفة
    let errorResponse = {
      succeeded: false,
      error: {
        message: "حدث خطأ أثناء تحديث البيانات"
      }
    };

    if (error?.response?.data) {
      // خطأ من الخادم
      errorResponse.error = error.response.data;
    } else if (error?.code === 'ECONNABORTED') {
      // خطأ انتهاء الوقت المحدد
      errorResponse.error.message = "انتهت مهلة الاتصال، يرجى المحاولة مرة أخرى";
    } else if (error?.message) {
      // خطأ عام
      errorResponse.error.message = error.message;
    }

    return errorResponse;
  }
};