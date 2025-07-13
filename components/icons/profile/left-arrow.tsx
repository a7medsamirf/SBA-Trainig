import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 7 11"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5.78 10.12 1.975 6.317a1.16 1.16 0 0 1 0-1.634L5.779.88"
    />
  </svg>
);
const Memo = memo(SvgLeftArrow);
export default Memo;
