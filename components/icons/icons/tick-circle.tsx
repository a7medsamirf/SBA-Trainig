import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTickCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="#76a441"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#tick-circle_svg__a)"
    >
      <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10" />
      <path d="m7.75 12 2.83 2.83 5.67-5.66" />
    </g>
    <defs>
      <clipPath id="tick-circle_svg__a">
        <path d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgTickCircle);
export default Memo;
