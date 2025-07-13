"use client";

import { ToggleLayoutProvider } from "@/context";
import { SessionProvider } from "next-auth/react";
import { DialogLayoutProvider } from "../../components";
import { CartProvider } from "@/context/CartContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToggleLayoutProvider>
      <SessionProvider>
        <DialogLayoutProvider>
            <CartProvider>
              {children}
              </CartProvider>
        </DialogLayoutProvider>
      </SessionProvider>
    </ToggleLayoutProvider>
  );
}
