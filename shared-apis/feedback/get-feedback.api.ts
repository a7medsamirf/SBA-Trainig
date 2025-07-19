import { fetcher } from "@/utils";

export const getFeedback = async () => {
  try {
    const res = await fetcher({
      url: `feedback/2`,
    });

    if (!res.ok) {
      console.warn("🚨 ~ getFeedback ~ API response not OK:", res.status, res.statusText);
      return {
        data: [],
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return {
      data: [],
    };
  }
};

