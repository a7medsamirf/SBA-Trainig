import { fetcher } from "@/utils";

export const getGenders = async () => {

  try {
    const res = await fetcher({
      url: `genders`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getGenders ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};





