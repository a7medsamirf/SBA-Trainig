import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <g clipPath="url(#search_svg__a)" opacity={0.6}>
      <path
        fill="#425A8B"
        d="m18 16.94-4.696-4.697a7.512 7.512 0 1 0-1.06 1.06L16.94 18zM7.5 13.5a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6"
      />
    </g>
    <defs>
      <clipPath id="search_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgSearch);
export default Memo;
