import { fetcher } from "@/utils";

export const getSimilarCourses = async (id: string | number) => {
    try {
      const res = await fetcher({
        url: `similar-courses/${id}`,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      return null;
    }
  };