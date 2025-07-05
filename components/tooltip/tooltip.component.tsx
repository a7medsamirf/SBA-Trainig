"use client";

import { cn } from "@/utils";
import React, { useState, useRef, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import "./tooltip.scss";

interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
  truncate?: boolean;
  delay?: number;
  placement?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = memo(
  ({
    as: Component = "div",
    children,
    tooltip,
    delay = 100,
    className = "",
    placement = "bottom",
    truncate = false,
    ...props
  }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    // Position the tooltip relative to the trigger element
    const updateTooltipPosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Calculate position based on specified position prop
      let top = 0;
      let left = 0;

      // Calculate the position based on the selected position prop
      switch (placement) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 10;
          left =
            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + 10;
          left =
            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top =
            triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - 10;
          break;
        case "right":
          top =
            triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + 10;
          break;
      }

      // Adjust for window boundaries
      const padding = 10;
      if (left < padding) left = padding;
      if (top < padding) top = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }
      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = window.innerHeight - tooltipRect.height - padding;
      }

      // Set the position
      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`,
      });
    };

    // Show the tooltip after a delay
    const handleMouseEnter = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(true);
        // Wait for the next frame to ensure the tooltip is rendered before measuring
        requestAnimationFrame(() => {
          updateTooltipPosition();
        });
      }, delay);
    };

    // Hide the tooltip
    const handleMouseLeave = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsVisible(false);
    };

    // Update position on scroll or resize
    useEffect(() => {
      if (isVisible) {
        const handleUpdate = () => {
          requestAnimationFrame(updateTooltipPosition);
        };

        window.addEventListener("scroll", handleUpdate, true);
        window.addEventListener("resize", handleUpdate);

        return () => {
          window.removeEventListener("scroll", handleUpdate, true);
          window.removeEventListener("resize", handleUpdate);
        };
      }
    }, [isVisible]);

    // Clean up timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      };
    }, []);

    return (
      <>
        <Component
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "inline-block cursor-pointer",
            truncate && "truncate",
            className
          )}
          {...props}
        >
          {children}
        </Component>

        {isVisible &&
          tooltip &&
          typeof document !== "undefined" &&
          createPortal(
            <span
              ref={tooltipRef}
              style={tooltipStyle}
              className={cn(
                "tooltip",
                "opacity-0 transition-opacity duration-200 ease-in-out",
                isVisible && "opacity-100"
              )}
              role="tooltip"
            >
              {tooltip}
            </span>,
            document.body
          )}
      </>
    );
  }
);
