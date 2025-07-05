import { fetcher } from "@/utils";

export const getSocials = async () => {
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

