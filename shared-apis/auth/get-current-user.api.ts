import axiosBase from "@/utils/axios.util";
import { fetcher } from "@/utils/fetcher.util";

export const getCurrentUser = async () => {
  try {
    // const res = await fetcher({ url: "profile" });

    // // لو الـ status مش 200 نعتبره فشل
    // if (!res.ok) return null;

    // const data = await res.json();

    // // نتحقق إن فيه بيانات فعلًا
    // if (!data || !data.data || data.status !== 200) {
    //   return null;
    // }

    const res = await axiosBase.get("/profile");

    const data = (await res.data) as any;

    return data.data; // ✅ رجّع بيانات المستخدم فقط
  } catch (error) {
    console.error("🚀 ~ getCurrentUser ~ error:", error);
    return null;
  }
};
