import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgAirpod = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M21.5 6.5v11c0 2.49-2.01 4.5-4.5 4.5H7c-2.49 0-4.5-2.01-4.5-4.5v-11C2.5 4.01 4.51 2 7 2h10c2.49 0 4.5 2.01 4.5 4.5"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M21.5 8.17v1.5h-4.13c-.31.97-1.22 1.67-2.29 1.67H8.92c-.64 0-1.27-.26-1.72-.72-.27-.26-.46-.59-.58-.95H2.5v-1.5h4.13C6.94 7.2 7.85 6.5 8.92 6.5h6.15c.65 0 1.27.26 1.72.72.27.27.47.59.58.95z"
    />
  </svg>
);
const Memo = memo(SvgAirpod);
export default Memo;
