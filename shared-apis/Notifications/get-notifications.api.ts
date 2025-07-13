import { fetcher } from "@/utils";

export const getNotificationsApi = async () => {
  try {
    const res = await fetcher({ url: `notifications` });
    const json = await res.json();

    if (Array.isArray(json?.data)) {
      return { data: json.data };
    }

    return { data: [] };
  } catch (error) {
    return { data: [] };
  }
};
