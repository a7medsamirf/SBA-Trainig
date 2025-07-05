import { fetcher } from "@/utils";

export const getSimilarCourses = async (id: string | number) => {
    try {
      const res = await fetcher({
        url: `similar-courses/${id}`,
      });
      console.log(`similar Course ${id} fetched successfully:`, res);
      const data = await res.json();
      console.log(`similar Course ${id} fetched successfully:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      return null;
    }
  };