"use server";

import axiosBase from "@/utils/axios.util";

export const updateProfileApi = async (
  prevState: string | undefined,
  formData: any
) => {
  try {
    const res = await axiosBase.post("/profile", formData);

    const data = (await res.data) as any;

    return {
      succeeded: true,
      ...data,
    };
  } catch (error: any) {
    console.error("❌ Error updating profile:", error);
    return {
      succeeded: false,
      error: error?.response?.data,
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
