import { fetcher } from "@/utils";

export const getAgeCategories = async () => {

  try {
    const res = await fetcher({
      url: `age_categories`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getAgeCategories ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
