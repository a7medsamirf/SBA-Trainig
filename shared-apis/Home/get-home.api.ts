import { fetcher } from "@/utils";

export const getHomeData = async () => {
  try {
    const res = await fetcher({
      url: `home`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getHomeData ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return {
      data: {
        banners: [],
        categories: [],
        courses: [],
        new_events: [],
        partners: [],
      },
    };
  }
};
