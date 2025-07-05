// shared-apis/CategoriesFilter/get-categories-filter.api.ts
import { fetcher } from "@/utils";

export const getCategoriesFilter = async (location?: string) => {
  const query = location ? `&location=${location}` : "";
  let allData: any[] = [];
  let page = 1;
  let hasNext = true;

  try {
    while (hasNext) {
      const res = await fetcher({
        url: `categories?page=${page}${query}`,
      });
      const result = await res.json();

      if (result?.data?.length > 0) {
        allData = [...allData, ...result.data];
      }

      hasNext = result.meta?.current_page < result.meta?.last_page;
      page++;
    }

    return allData; // هنا بنرجّع مصفوفة جاهزة
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
