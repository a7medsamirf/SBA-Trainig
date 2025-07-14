import { fetcher } from "@/utils";

export const getEducationDegree = async () => {

  try {
    const res = await fetcher({
      url: `education-degrees`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getEducationDegrees ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
