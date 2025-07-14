import { fetcher } from "@/utils";

export const getInitiatives = async () => {
  try {
    const res = await fetcher({
      url: `initiatives`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getInitiatives ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
