import { createQueryString, fetcher } from "@/utils";

export const getCourseEnrollments = async (params?: any) => {
  const query = createQueryString(params);

  try {
    const res = await fetcher({
      url: `control-enrollments?${query}`,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error fetching course requests:", error);
    return null;
  }
}

