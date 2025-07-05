"use client";

import { useState } from "react";

export const useMobileMenu = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const closeAllMenus = () => setExpandedMenus([]);

  return {
    toggleSubmenu,
    isExpanded,
    closeAllMenus,
  };
};
