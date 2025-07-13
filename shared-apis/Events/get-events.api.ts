import { fetcher } from "@/utils";

export const getEvents = async () => {

  try {
    const res = await fetcher({
      url: `new-events`,
      revalidate: 300, // كل 5 دقايق
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};


