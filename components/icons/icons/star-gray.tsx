import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgStarGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <g clipPath="url(#star-gray_svg__a)">
      <path
        fill="#DDE4F0"
        d="M11.969 4.603a.64.64 0 0 0-.55-.438L7.957 3.85 6.586.645a.638.638 0 0 0-1.172 0L4.044 3.85.58 4.165A.638.638 0 0 0 .218 5.28l2.618 2.296-.772 3.4a.637.637 0 0 0 .948.69L6 9.88l2.987 1.785a.638.638 0 0 0 .95-.689l-.773-3.4 2.618-2.296a.64.64 0 0 0 .187-.678"
      />
    </g>
    <defs>
      <clipPath id="star-gray_svg__a">
        <path fill="#fff" d="M0 0h12v12H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgStarGray);
export default Memo;
