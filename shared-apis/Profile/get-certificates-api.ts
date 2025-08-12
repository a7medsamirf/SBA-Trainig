import { fetcher } from "@/utils";

export const getCertificates = async () => {
  try {
    const res = await fetcher({
      url: `enrollments/certificates`,
    });
    
    if (!res.ok) {
      console.warn("🚨 ~ certificates ~ API response not OK:", res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
