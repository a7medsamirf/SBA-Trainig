import axiosBase from "@/utils/axios.util";

export const getCurrentUser = async () => {
  try {
    const res = await axiosBase.get("/profile");

    const data = (await res.data) as any;

    return data?.data; // ✅ رجّع بيانات المستخدم فقط
  } catch (error) {
    console.error("🚀 ~ getCurrentUser ~ error:", error);
    return null;
  }
};
