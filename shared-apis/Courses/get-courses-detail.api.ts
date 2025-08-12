import { fetcher } from "@/utils";
import axiosBase from "@/utils/axios.util";

export const getCourseById = async (id: string | number) => {
  try {
    // const res = await fetcher({
    //   url: `courses/${id}`,
    // });
    // const data = await res.json();

    const res = await axiosBase.get(`/courses/${id}`);
    const data = res.data as any;

    return data;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    return null;
  }
};
