// hooks/useCart.ts
"use client";
import { useEffect, useState } from "react";
import { getCartApi } from "@/shared-apis"; // أو حسب مسار `getCartApi`
import { useSession } from "next-auth/react";
export const useCart = () => {
    const { data: session, status } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCartApi();
      setCartCount(data?.carts?.length || 0);
    };

    fetchCart();
  }, []);

  return cartCount;
};