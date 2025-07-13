import { fetcher } from "@/utils";

export const getNationalities = async () => {

  try {
    const res = await fetcher({
      url: `nationalities?`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
