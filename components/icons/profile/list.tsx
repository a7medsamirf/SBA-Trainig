import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 21 21"
    {...props}
  >
    <g
      stroke="#9F9F9F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#list_svg__a)"
    >
      <path d="M17.192 11.75H4.025c-1.25 0-1.75.533-1.75 1.858v3.367c0 1.325.5 1.858 1.75 1.858h13.167c1.25 0 1.75-.533 1.75-1.858v-3.367c0-1.325-.5-1.858-1.75-1.858M17.192 2.167H4.025c-1.25 0-1.75.533-1.75 1.858V7.39c0 1.326.5 1.859 1.75 1.859h13.167c1.25 0 1.75-.534 1.75-1.859V4.025c0-1.325-.5-1.859-1.75-1.859" />
    </g>
    <defs>
      <clipPath id="list_svg__a">
        <path fill="#fff" d="M.608.5h20v20h-20z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgList);
export default Memo;
