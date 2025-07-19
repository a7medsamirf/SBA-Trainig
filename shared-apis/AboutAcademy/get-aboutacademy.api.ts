
import { fetcher } from "@/utils";

export const getAboutAcademy = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=about_academy`,
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return {
      data: [],
    };
  }
};
