import { fetcher } from "@/utils";

export const getProfileData = async () => {

  try {
    const res = await fetcher({
      url: `profile`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};