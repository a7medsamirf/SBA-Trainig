import { fetcher } from "@/utils/fetcher.util";

export const getCurrentUser = async () => {
  try {
    const res = await fetcher({ url: "profile" });

    // لو الـ status مش 200 نعتبره فشل
    if (!res.ok) {
      console.warn("🚨 ~ getCurrentUser ~ API response not OK:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    // نتحقق إن فيه بيانات فعلًا
    if (!data || !data.data || data.status !== 200) {
      console.warn("🚨 ~ getCurrentUser ~ Invalid data structure:", data);
      return null;
    }

    return data.data; // ✅ رجّع بيانات المستخدم فقط
  } catch (error) {
    console.error("🚀 ~ getCurrentUser ~ error:", error);
    return null;
  }
};
