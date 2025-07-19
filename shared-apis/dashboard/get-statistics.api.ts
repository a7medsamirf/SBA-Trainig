
import { fetcher } from "@/utils";

export const getStatistics = async () => {
  try {
    const res = await fetcher({ url: `control-states` });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data ?? null;
  } catch (error) {
    console.error("error", error);
    return {
      data: [],
    };
  }
};
