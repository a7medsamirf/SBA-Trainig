"use server";
import { fetcher } from "@/utils";

interface UpdateProfilePayload {
  name: string;
  email: string;
  phone: string;
  english_name: string;
  national_id:   string;
}

interface UpdateProfileResponse {
  succeeded: boolean;
  message: string;
  status?: number;
  data?: any;
}

export const updateProfileApi = async (
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> => {
  try {
    const response = await fetcher({
      url: "update-profile", // غيّر المسار حسب API فعليًا
      method: "POST",
      options: {
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        succeeded: true,
        message: data.message || "تم تحديث البيانات بنجاح",
        status: response.status,
        data: data.data, // لو حابب ترجع البيانات الجديدة
      };
    } else {
      return {
        succeeded: false,
        message: data.message || "فشل التحديث",
        status: response.status,
      };
    }
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    return {
      succeeded: false,
      message: "حدث خطأ أثناء الاتصال بالسيرفر",
    };
  }
};


/* "use server";

import { fetcher } from "@/utils";


export const updateProfileApi = async (payload: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      const response = await fetcher({
        url: "update-profile", // غيّر المسار حسب الـ backend عندك
        method: "POST",
        options: {
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        },
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      return {
        succeeded: false,
        message: "حدث خطأ أثناء تحديث البيانات",
      };
    }
  }; */

  