import { getNotificationsApi } from "@/shared-apis";
import Navbar from "./NavbarClient";
import { auth } from "@/auth";

export default async function NavbarServer({ userName }: { userName: string }) {
  const response = await getNotificationsApi();
  const notifications = response?.data ?? [];

  return <Navbar notifications={notifications} userName={userName} />;
}
