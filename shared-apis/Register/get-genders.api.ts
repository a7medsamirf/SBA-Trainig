import { fetcher } from "@/utils";

export const getGenders = async () => {

  try {
    const res = await fetcher({
      url: `genders`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};





