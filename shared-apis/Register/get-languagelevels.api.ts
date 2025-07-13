import { fetcher } from "@/utils";

export const getLanguageLevels = async () => {

  try {
    const res = await fetcher({
      url: `language-levels`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};





