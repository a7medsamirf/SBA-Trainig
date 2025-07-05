import { fetcher } from "@/utils";

export const getAboutAcademy = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=about_academy`,
      revalidate: 300, // كل 5 دقايق
    });
    const data = res.json();
    console.log("About fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};
