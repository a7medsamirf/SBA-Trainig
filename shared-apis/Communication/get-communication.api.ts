import { fetcher } from "@/utils";

export const getCommunication = async () => {

  try {
    const res = await fetcher({
      url: `settings`,
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
