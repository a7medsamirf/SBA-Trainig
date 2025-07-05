"use client";

import { useState } from "react";
import "./collapse.scss";
import { cn } from "@/utils";

interface CollapseProps {
  children: React.ReactNode;
  title: string | React.ReactNode;
}

export const Collapse = ({ title, children }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapse__wrapper">
      <div
        className={cn("collapse__wrapper__header", isOpen ? "open" : "closed")}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {typeof title === "string" ? (
          <h3 className="collapse__wrapper__header__title">{title}</h3>
        ) : (
          <div className="collapse__wrapper__header__title">{title}</div>
        )}

        <span
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        >
          ↓
        </span>
      </div>
      {isOpen && <div className="collapse__wrapper__content">{children}</div>}
    </div>
  );
};
