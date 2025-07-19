import { createQueryString, fetcher } from "@/utils";

export const getCoursePayRequests = async (params?: any) => {
  const query = createQueryString(params);

  try {
    const res = await fetcher({
      url: `course-pay-requests?${query}`,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error fetching course requests:", error);
    return null;
  }
}

