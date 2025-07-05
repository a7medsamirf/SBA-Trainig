import { fetcher } from "@/utils";

export const getAboutMeta = async () => {
  try {
    const res = await fetcher({
      url: `settings`,
      revalidate: 300, // كل 5 دقايق
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

