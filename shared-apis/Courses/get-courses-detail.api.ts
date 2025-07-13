import { fetcher } from "@/utils";

export const getCourseById = async (id: string | number) => {
    try {
      const res = await fetcher({
        url: `courses/${id}`,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      return null;
    }
  };

  