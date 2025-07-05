"use client";

import { useWindowSize } from "@/hooks";

import { useEffect, useState } from "react";
import { useToggleLayoutContext } from "@/context";

export const useToggleMenuScreenSize = () => {
  const { toggle, handleToggleMenu, closeMenu, openMenu } =
    useToggleLayoutContext();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  //get current screen size and toggle sidebar menu
  const { width } = useWindowSize();

  useEffect(() => {
    // @ts-ignore
    if (width < 1200) {
      setIsMobile(true);
      closeMenu();
    } else {
      setIsMobile(false);
      openMenu();
    }
  }, [width]); // ✅ Only runs when width changes

  return { toggle, isMobile, handleToggleMenu };
};
