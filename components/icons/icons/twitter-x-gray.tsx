import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTwitterXGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={32}
    fill="none"
    {...props}
  >
    <circle cx={16.416} cy={16} r={16} fill="#A1AFCF" />
    <g clipPath="url(#twitter-x-gray_svg__a)">
      <path
        fill="#fff"
        d="M21.016 8.75h2.454l-5.36 6.142 6.306 8.358h-4.937l-3.867-5.07-4.425 5.07H8.732l5.733-6.57-6.049-7.93h5.063l3.495 4.633zm-.86 13.028h1.36l-8.777-11.633h-1.458z"
      />
    </g>
    <defs>
      <clipPath id="twitter-x-gray_svg__a">
        <path fill="#fff" d="M8.416 8h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgTwitterXGray);
export default Memo;
