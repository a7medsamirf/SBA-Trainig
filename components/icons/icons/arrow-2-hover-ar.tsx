import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrow2HoverAr = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={14}
    fill="none"
    {...props}
  >
    <g clipPath="url(#arrow-2-hover-ar_svg__a)">
      <path
        fill="#425A8B"
        d="M15.102 5.965H3.427L7 1.673A.986.986 0 1 0 5.484.413L.562 6.319a1 1 0 0 0-.088.148c0 .049 0 .078-.07.128a1 1 0 0 0-.068.354 1 1 0 0 0 .069.354c0 .05 0 .08.069.128q.039.078.088.148l4.922 5.907a.985.985 0 0 0 1.388.127A.985.985 0 0 0 7 12.227L3.427 7.933h11.675a.984.984 0 1 0 0-1.968"
      />
    </g>
    <defs>
      <clipPath id="arrow-2-hover-ar_svg__a">
        <path fill="#fff" d="M17 14H0V0h17z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgArrow2HoverAr);
export default Memo;
