import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgSearchNormal2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g
      stroke="#757575"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#search-normal_2_svg__a)"
    >
      <path d="M17.5 9.583a7.916 7.916 0 1 1-15.833 0 7.916 7.916 0 0 1 15.833 0M18.333 18.333l-1.667-1.667" />
    </g>
    <defs>
      <clipPath id="search-normal_2_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgSearchNormal2);
export default Memo;
