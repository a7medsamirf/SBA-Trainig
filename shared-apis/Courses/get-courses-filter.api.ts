import { fetcher } from "@/utils";

export const getCoursesFilter = async () => {

  try {
    const res = await fetcher({
      url: `courses`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
