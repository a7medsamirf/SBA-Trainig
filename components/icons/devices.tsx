import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgDevicesProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const SvgDevices = ({ width = 40, height = 40, ...props }: SvgDevicesProps) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M16 2H6c-3.2 0-4 .8-4 4v5.9c.03 3.03.87 3.8 4 3.8h2.25v3.55h-3.3c-.41 0-.75.34-.75.75s.34.75.75.75h7.3c-.15-.39-.22-.88-.23-1.5H9.75V15.7h2.27v-5.11c0-2.14.71-2.85 2.85-2.85h4.28c.31 0 .6.02.85.05V6c0-3.2-.8-4-4-4"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M20 7.79c-.25-.03-.54-.05-.85-.05h-4.28c-2.14 0-2.85.71-2.85 2.85v8.66c.01.62.08 1.11.23 1.5.35.91 1.14 1.25 2.62 1.25h4.28c2.14 0 2.85-.71 2.85-2.85v-8.56c0-1.83-.52-2.61-2-2.8m-2.99 2.3c.87 0 1.57.7 1.57 1.57s-.7 1.57-1.57 1.57-1.57-.7-1.57-1.57.7-1.57 1.57-1.57m0 9.06c-1.18 0-2.14-.96-2.14-2.14a2.142 2.142 0 0 1 3.54-1.62c.45.4.74.98.74 1.62 0 1.18-.96 2.14-2.14 2.14"
    />
    <path
      fill="#425A8B"
      d="M19.15 17.01c0 1.18-.96 2.14-2.14 2.14s-2.14-.96-2.14-2.14a2.142 2.142 0 0 1 3.54-1.62c.45.4.74.98.74 1.62M17.01 13.23a1.57 1.57 0 1 0 0-3.14 1.57 1.57 0 0 0 0 3.14"
      opacity={0.4}
    />
  </svg>
);
const Memo = memo(SvgDevices);
export default Memo;
