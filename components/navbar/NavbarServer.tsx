import { getCartApi, getNotificationsApi, getCourseEnrollments } from "@/shared-apis";
import Navbar from "./NavbarClient";

export default async function NavbarServer({
  userName,
  avatar
}: {
  userName: string;
  avatar: string;
}) {
  const response = await getNotificationsApi();
  const notifications = response?.data ?? [];

  const cartResponse = await getCartApi();
  const cartCount = cartResponse?.courses_count ?? 0;

  const ongoingResponse = await getCourseEnrollments({ status: "ongoing" });
  const ongoing = ongoingResponse?.data ?? [];

  return (
    <Navbar
      notifications={notifications}
      userName={userName}
      cartCount={cartCount}
      avatar={avatar}
      ongoing={ongoing}
    />
  );
}