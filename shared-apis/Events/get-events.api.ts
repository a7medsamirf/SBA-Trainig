import { fetcher } from "@/utils";

export const getEvents = async () => {
  try {
    const res = await fetcher({
      url: `new-events`,
      // revalidate: 300, // كل 5 دقايق
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getEvents ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};


