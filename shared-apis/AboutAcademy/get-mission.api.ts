import { fetcher } from "@/utils";

export const getMission = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=mission`,
      revalidate: 300, // كل 5 دقايق
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
