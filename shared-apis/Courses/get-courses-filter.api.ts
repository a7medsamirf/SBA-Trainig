import { createQueryString, fetcher } from "@/utils";
import axiosBase from "@/utils/axios.util";

export const getCoursesFilter = async (body?: any) => {
  const params = createQueryString(body ?? {});
  try {
    // const res = await fetcher({
    //   url: `courses?${params}`,
    // });

    // if (!res.ok) {
    //   return null;
    // }

    // const data = await res.json();

    const res = await axiosBase.get(`/courses?${params}`);
    const data = res.data as any;

    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
