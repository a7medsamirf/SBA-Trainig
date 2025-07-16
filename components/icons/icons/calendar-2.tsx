import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgCalendar2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#76A441"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M5.334 1.333v2M10.667 1.333v2M2.334 6.06h11.333M14 5.667v5.666c0 2-1 3.334-3.333 3.334H5.333C3 14.667 2 13.333 2 11.333V5.667c0-2 1-3.334 3.333-3.334h5.334C13 2.333 14 3.667 14 5.667"
    />
    <path
      stroke="#76A441"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.997 9.133h.006M5.53 9.133h.005M5.53 11.133h.005"
    />
  </svg>
);
const Memo = memo(SvgCalendar2);
export default Memo;
