import { fetcher } from "@/utils";

export const getCoursesFilter = async () => {

  try {
    const res = await fetcher({
      url: `courses`,
    });
    const data = await res.json();
    console.log("Courses fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
