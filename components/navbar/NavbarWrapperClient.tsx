"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./NavbarClient";

export default function NavbarWrapperClient({
  userName,
  notifications,
}: {
  userName: string;
  notifications: any[];
}) {
  return (
    <SessionProvider>
      <Navbar userName={userName} notifications={notifications} />
    </SessionProvider>
  );
}
