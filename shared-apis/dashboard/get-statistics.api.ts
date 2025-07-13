import { fetcher } from "@/utils";

export const getStatistics = async () => {
  try {
    const res = await fetcher({
      url: `control-states?`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};