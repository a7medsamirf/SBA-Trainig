import { fetcher } from "@/utils";

export const getAgeCategories = async () => {

  try {
    const res = await fetcher({
      url: `age_categories`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
