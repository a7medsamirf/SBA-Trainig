"use client";

import { useEffect, useMemo, useRef, useState, memo } from "react";
import { createPortal } from "react-dom";
import styles from "./menu.module.scss";
import { useLocale } from "next-intl";
import { cn } from "@/utils";

interface MenuProps {
  children: React.ReactNode;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  menuClassName?: string;
}

export const Menu: React.FC<MenuProps> = memo(
  ({ children, anchorEl, open, onClose, menuClassName }) => {
    const lang = useLocale();

    const menuRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
      top: 0,
      left: 0 as number | string,
      right: 0 as number | string,
      isMobile: false,
    });

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          anchorEl !== event.target
        ) {
          onClose();
        }
      }

      function handleResize() {
        if (anchorEl) {
          const rect = anchorEl.getBoundingClientRect();
          const menuRect = menuRef?.current?.getBoundingClientRect();
          const isMobile = window.innerWidth <= 768;

          const top = Math.min(
            rect.bottom + window.scrollY,
            window.scrollY + window.innerHeight - ((menuRect?.height || 0) + 50)
          );
          setPosition({
            top,
            left: isMobile ? "50%" : rect.left + window.scrollX,
            right: isMobile ? "auto" : window.innerWidth - rect.right,
            isMobile,
          });
        }
      }

      if (open) {
        handleResize();
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);

        document.documentElement.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);
        document.documentElement.style.overflow = "";
      };
    }, [open, anchorEl]);

    const newPosition = useMemo(() => {
      const { right, left, top, isMobile } = position;
      return {
        top,
        right: isMobile ? "auto" : lang === "ar" ? "auto" : right,
        left: isMobile ? "50%" : lang === "ar" ? left : "auto",
        transform: isMobile ? "translate(-50%, 0)" : "none",
      };
    }, [lang, position]);

    if (!open) return null;

    return (
      open &&
      createPortal(
        <div
          ref={menuRef}
          className={cn(
            styles["menu-container-content"],
            "no-scrollbar",
            menuClassName
          )}
          style={{
            top: newPosition.top,
            right: newPosition.right,
            left: newPosition.left,
            transform: newPosition.transform,
          }}
        >
          {children}
        </div>,
        document.body
      )
    );
  }
);
