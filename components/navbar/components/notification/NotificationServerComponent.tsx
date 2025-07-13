
import { getNotificationsApi } from "@/shared-apis";
import { NotificationClientComponent } from "./NotificationClientComponent";

export const NotificationServerComponent = async () => {
  const response = await getNotificationsApi();
  const notifications = response?.data ?? [];

  return <NotificationClientComponent notifications={notifications} />;
};
