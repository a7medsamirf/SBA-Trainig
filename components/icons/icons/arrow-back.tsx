import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#arrow_back_svg__a)">
      <path
        fill="#425A8B"
        d="M17.51 3.87 15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12z"
      />
    </g>
    <defs>
      <clipPath id="arrow_back_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgArrowBack);
export default Memo;
