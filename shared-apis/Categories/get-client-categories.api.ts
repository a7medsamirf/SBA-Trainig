import { createQueryString, fetcherClient } from "@/utils";

export const getClientCategories = async (body: any, token: string) => {
  const params = createQueryString(body);
  try {
    const res = await fetcherClient({
      url: `store-categories?${params}`,
      token,
    });
    return await res.json();
  } catch (error: any) {
    console.error("error", error);
  }
};
