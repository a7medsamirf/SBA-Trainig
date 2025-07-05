import { fetcher } from "@/utils";

export const getVision = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=vision`,
      revalidate: 300, // كل 5 دقايق
    });
    const data = res.json();
    console.log("Vision fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};