import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgMouse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M19.5 9.5v5c0 4.13-3.37 7.5-7.5 7.5s-7.5-3.37-7.5-7.5v-5c0-2.06.84-3.94 2.2-5.3a7.5 7.5 0 0 1 4.55-2.16c.24-.03.5-.04.75-.04s.51.01.75.04c3.78.38 6.75 3.58 6.75 7.46"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M13.87 7.5v2c0 1.03-.84 1.88-1.87 1.88-1.04 0-1.88-.85-1.88-1.88v-2c0-.77.47-1.43 1.13-1.72V2.04c.24-.03.5-.04.75-.04s.51.01.75.04v3.74c.66.29 1.12.95 1.12 1.72"
    />
  </svg>
);
const Memo = memo(SvgMouse);
export default Memo;
