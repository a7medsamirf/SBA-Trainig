import { fetcher } from "@/utils";

export const getHomeData = async () => {
    try {
      const res = await fetcher({
        url: `home`,
        revalidate: 600, // كل 5 دقايق
      });
      const data = await res.json();
      console.log("Home data fetched successfully:", data);
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
  

  