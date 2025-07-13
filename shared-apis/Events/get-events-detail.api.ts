import { fetcher } from "@/utils";

export const getEventsById = async (id: string | number) => {
  try {
    const res = await fetcher({
      url: `new-events/${id}`,
    });
    const data = await res.json(); 
    return data;
  } catch (error) {
    console.error(`Error fetching Events ${id}:`, error);
    return null;
  }
};