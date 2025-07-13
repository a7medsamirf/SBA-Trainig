import { fetcher } from "@/utils";

export const getUpcoming = async (keyword = "") => {
    try {
      const query = keyword ? `?status=upcoming&keyword=${encodeURIComponent(keyword)}` : `?status=upcoming`;
      const res = await fetcher({
        url: `control-enrollments${query}`,
      });
      const data = await res.json();
      return data;
    } catch (error) {
    }
  };

