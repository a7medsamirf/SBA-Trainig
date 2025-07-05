import { fetcher } from "@/utils";

export const getGoalsAcademy = async () => {
  try {
    const res = await fetcher({
      url: `static-pages?slug=goal`,
      revalidate: 300, // كل 5 دقايق
    });

    const data = await res.json();

    if (data?.data?.description && typeof data.data.description === 'string') {
      data.data.description = data.data.description.split('-').map((s: string) => s.trim());
    }

    console.log("goal fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("error", error);
    return { data: { title: "", description: [] } }; // fallback
  }
};
