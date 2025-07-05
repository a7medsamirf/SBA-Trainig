import { createQueryString, fetcher } from "@/utils";

export const getCategories = async (body: any) => {
  const params = createQueryString(body);
  try {
    const res = await fetcher({
      url: `home?${params}`,
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
