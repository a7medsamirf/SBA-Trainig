import { fetcher } from "@/utils";

export const getEducationDegree = async () => {

  try {
    const res = await fetcher({
      url: `education-degrees`,
    });
    const data = await res.json();
    return data;
  } catch (error) {
  }
};
