import { fetcher } from "@/utils/fetcher.util";

export const markNotificationAsRead = async (id: number) => {
  try {
    return await fetcher({
      url: `notifications/${id}/mark-read`,
      method: "POST",
    });
  } catch (error) {
    console.error("Mark as read failed", error);
  }
};

export const deleteNotificationApi = async (id: number) => {
  try {
    return await fetcher({
      url: `notifications/${id}`,
      method: "POST",
    });
  } catch (error) {
    console.error("Delete notification failed", error);
  }
};