import { fetcher } from "@/utils";

export const getLanguageLevels = async () => {

  try {
    const res = await fetcher({
      url: `language-levels`,
    });
    const data = await res.json();
    console.log("Courses fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
