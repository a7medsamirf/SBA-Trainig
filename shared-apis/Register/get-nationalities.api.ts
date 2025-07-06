import { fetcher } from "@/utils";

export const getNationalities = async () => {

  try {
    const res = await fetcher({
      url: `nationalities?`,
    });
    const data = await res.json();
    console.log("Nationalitie fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};


