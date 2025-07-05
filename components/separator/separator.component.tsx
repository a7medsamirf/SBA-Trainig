import "./separator.scss";

import { HTMLAttributes } from "react";

interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  width?: string;
  height?: string;
  bgColor?: string;
}

export const Separator = ({
  width,
  height,
  bgColor,
  ...props
}: SeparatorProps) => {
  return (
    <hr
      {...props}
      style={{ width: width, height: height, backgroundColor: bgColor }}
      className={`separator ${props.className}`}
    />
  );
};
