import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowForward = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#arrow_forward_svg__a)">
      <path
        fill="#425A8B"
        d="M6.49 3.87 8.26 2.1l9.9 9.9-9.9 9.9-1.77-1.77L14.62 12z"
      />
    </g>
    <defs>
      <clipPath id="arrow_forward_svg__a">
        <path fill="#fff" d="M0 24h24V0H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgArrowForward);
export default Memo;
