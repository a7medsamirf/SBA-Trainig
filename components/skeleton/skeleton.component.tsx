"use client";

import { cn } from "@/utils";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-900/10 dark:bg-neutral-50/10 rounded-md",
        className
      )}
      {...props}
    />
  );
};
