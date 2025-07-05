"use client";

import { memo, useState } from "react";
import { Spinner } from "../spinner/spinner.component";
import "./icon-button.scss";
import { cn } from "@/utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "third"
    | "success"
    | "alert-green"
    | "warning"
    | "error"
    | "default";
  disabled?: boolean;
  disableRipple?: boolean;
  edge?: "start" | "end" | false;
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = memo(
  ({
    children,
    color = "default",
    disabled = false,
    disableRipple = false,
    edge = false,
    loading = false,
    loadingIndicator,
    size = "md",
    className = "",
    ...props
  }) => {
    const [ripples, setRipples] = useState<
      { x: number; y: number; size: number; id: number }[]
    >([]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disableRipple) return;

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, size, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };

    return (
      <button
        className={cn(
          "icon-button",
          `icon-button__${color} icon-button__${size}`,
          edge && `edge-${edge}`,
          className,
          (disabled || loading) && "icon-button__disabled"
        )}
        disabled={disabled || loading}
        type="button"
        {...props}
        onClick={(e) => {
          createRipple(e);
          props.onClick && props.onClick(e);
        }}
      >
        {loading
          ? loadingIndicator || <Spinner size={16} stroke={2} color="white" />
          : children}
        <span
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            borderRadius: "inherit",
            zIndex: 0,
          }}
        >
          {!disableRipple &&
            ripples.map((ripple) => (
              <span
                key={ripple.id}
                className={cn(
                  "icon-button__ripple",
                  `icon-button__ripple--${color}`
                )}
                style={{
                  left: 0,
                  top: 0,
                  // left: ripple.x,
                  // top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
        </span>
      </button>
    );
  }
);
