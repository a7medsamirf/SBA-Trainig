import { fetcher } from "@/utils";

export const getCourseClientById = async (id: string | number, user: unknown) => {
    try {
      const res = await fetcher({
        url: `courses/${id}`,
      });
      const data = await res.json();
      console.log(`Course ${id} fetched successfully:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      return null;
    }
  };