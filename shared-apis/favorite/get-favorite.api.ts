import { createQueryString } from "@/utils/create-query-string.util";
import { fetcher } from "@/utils/fetcher.util";

export const getFavoriteData = async (params: { keyword?: string }) => {
  try {
    const query = createQueryString(params);

    const res = await fetcher({
      url: `favourites?${query}`,
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    console.log("🎯 Response Data:", data);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};
