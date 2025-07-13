import { fetcher } from "@/utils";

export const getInitiatives = async () => {
  try {
    const res = await fetcher({
      url: `initiatives`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return {
      data: [],
    };
  }
};
