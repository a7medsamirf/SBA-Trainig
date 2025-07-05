"use client";

import { cn } from "@/utils";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export const CustomImage = (props: ImageProps) => {
  return <Image {...props} />;

  const [isLoad, setIsLoad] = useState(false);
  return (
    <div
      className={cn(props.className, !isLoad && "animate-pulse bg-gray-600")}
    >
      <Image
        className={cn(props.className)}
        {...props}
        onLoad={(event) => {
          setIsLoad(true);
          props?.onLoad?.(event);
        }}
      />
    </div>
  );
};
