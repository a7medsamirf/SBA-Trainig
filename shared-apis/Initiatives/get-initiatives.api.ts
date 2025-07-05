import { fetcher } from "@/utils";

export const getInitiatives = async () => {

  try {
    const res = await fetcher({
      url: `initiatives`,
    });
    const data = await res.json();
    console.log("Initiatives fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};


