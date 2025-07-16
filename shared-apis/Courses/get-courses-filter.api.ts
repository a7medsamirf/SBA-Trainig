import { createQueryString, fetcher } from "@/utils";

export const getCoursesFilter = async (body?: any) => {
  const params = createQueryString(body ?? {});
  try {
    const res = await fetcher({
      url: `courses?${params}`,
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
