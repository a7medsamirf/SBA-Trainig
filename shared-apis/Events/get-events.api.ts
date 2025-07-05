import { fetcher } from "@/utils";

export const getEvents = async () => {

  try {
    const res = await fetcher({
      url: `new-events`,
      revalidate: 300, // كل 5 دقايق
    });
    const data = await res.json();
    console.log("Events fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};


