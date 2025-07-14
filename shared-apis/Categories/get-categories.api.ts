import { createQueryString, fetcher } from "@/utils";

export const getCategories = async (body: any) => {
  const params = createQueryString(body);
  try {
    const res = await fetcher({
      url: `home?${params}`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ getCategories ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
