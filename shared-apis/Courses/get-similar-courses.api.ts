import { fetcher } from "@/utils";
import axiosBase from "@/utils/axios.util";

export const getSimilarCourses = async (id: string | number) => {
  try {
    // const res = await fetcher({
    //   url: `similar-courses/${id}`,
    // });
    // const data = await res.json();

    const res = await axiosBase.get(`/similar-courses/${id}`);
    const data = res.data as any;

    return data;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    return null;
  }
};
