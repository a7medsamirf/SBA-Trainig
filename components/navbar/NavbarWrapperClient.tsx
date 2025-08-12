"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./NavbarClient";

interface Props {
  userName: string;
  notifications: any[];
  cartCount: number;
  avatar: string;
  ongoing: any[];
}

export default function NavbarWrapperClient({
  userName,
  notifications,
  cartCount,
  avatar,
  ongoing,
}: Props) {
  return (
    <SessionProvider>
      <Navbar
        userName={userName}
        notifications={notifications}
        cartCount={cartCount}
        avatar={avatar}
        ongoing={ongoing}
      />
    </SessionProvider>
  );
}