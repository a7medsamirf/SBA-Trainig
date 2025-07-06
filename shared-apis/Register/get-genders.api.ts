import { fetcher } from "@/utils";

export const getGenders = async () => {

  try {
    const res = await fetcher({
      url: `genders`,
    });
    const data = await res.json();
    console.log("Genders fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};





