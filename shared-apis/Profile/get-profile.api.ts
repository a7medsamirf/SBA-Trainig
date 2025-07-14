import { fetcher } from "@/utils";

export const getProfileData = async () => {

  try {
    const res = await fetcher({
      url: `profile`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getProfileData ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};