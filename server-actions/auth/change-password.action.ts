"use server";

import axiosBase from "@/utils/axios.util";

export const changePassword = async (
  prevState: string | undefined,
  formData: any
) => {
  try {
    const res = await axiosBase.post("/profile/change-password", {
      current_password: formData.current_password,
      new_password: formData.password,
      new_password_confirmation: formData.password_confirmation,
    });

    return {
      succeeded: true,
      message: (res.data && typeof res.data === "object" && "message" in res.data)
        ? res.data.message
        : "تم تغيير كلمة المرور بنجاح",
    };
  } catch (error: any) {
    return {
      succeeded: false,
      error: error.response?.data || { message: "حدث خطأ أثناء التغيير" },
    };
  }
};
