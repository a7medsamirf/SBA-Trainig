
import { fetcher } from "@/utils";

export const getManagerWord = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=manager_word`,
      revalidate: 300, // كل 5 دقايق
    });
    const data = res.json();
    console.log("Manager Word fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
