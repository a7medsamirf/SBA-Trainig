"use client";

import { CSSProperties, ReactNode, useEffect, useRef, RefObject } from "react";
import { useDialog } from "@/context";
import "./dialog.scss";
import { cn } from "@/utils";

interface DialogProps {
  id: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  showCloseIcon?: boolean;
  onClose?: () => void;
  ref?: RefObject<HTMLDivElement | null>;
}

export const Dialog = ({
  id,
  style,
  className,
  children,
  showCloseIcon = true,
  onClose,
  ref,
}: DialogProps) => {
  const { activeDialog, closeDialog } = useDialog();
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = activeDialog === id;

  const handleClose = () => {
    onClose?.();
    closeDialog();
  };

  // Handle ESC key and add/remove body class
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("dialog-open");
    } else {
      document.body.classList.remove("dialog-open");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="dialog"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={ref || dialogRef}
        className={cn("dialog__content", className)}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseIcon && (
          <button
            className="dialog__content-close"
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <span className="text-gray-500">✕</span>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
