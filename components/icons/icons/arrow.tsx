import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={11}
    fill="none"
    {...props}
  >
    <g clipPath="url(#arrow_svg__a)">
      <path
        fill="#36A2D0"
        d="M.453 1.555v7.893c0 .64.773.96 1.226.507l3.454-3.453a1.42 1.42 0 0 0 0-2.007L3.819 3.182l-2.14-2.14a.721.721 0 0 0-1.226.513"
      />
    </g>
    <defs>
      <clipPath id="arrow_svg__a">
        <path fill="#fff" d="M0 .5h6v10H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgArrow);
export default Memo;
