"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay (Click to Close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-200 z-[9998]"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer Container */}
      <div
        className={cn(
          "fixed rtl:right-0 ltr:left-0 top-0 transition-transform z-[9999] h-full overflow-y-auto no-scrollbar",
          isOpen
            ? "translate-x-0"
            : "rtl:translate-x-full ltr:-translate-x-full"
        )}
      >
        {children}
      </div>
    </>
  );
};
