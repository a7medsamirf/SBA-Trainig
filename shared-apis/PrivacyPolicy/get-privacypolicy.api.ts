import { fetcher } from "@/utils";

export const getPrivacyPolicy = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=privacy_policy`,
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
