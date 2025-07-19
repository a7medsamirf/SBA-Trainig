import { fetcher } from "@/utils";

export const getTerms = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=conditions`,
    });

    if (!res.ok) {
      return null;
    }

    const responseData = await res.json();

    return responseData?.data ?? null; 
  } catch (error) {
    return {
      data: [],
    };
  }
};
