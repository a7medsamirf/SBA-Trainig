import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgFlagFr = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={12}
    fill="none"
    {...props}
  >
    <g clipPath="url(#flag-fr_svg__a)">
      <path
        fill="#41479B"
        d="M6 11.896H.31a.31.31 0 0 1-.31-.31V.414a.31.31 0 0 1 .31-.31H6z"
      />
      <path fill="#F5F5F5" d="M12 .103H6v11.794h6z" />
      <path
        fill="#FF4B55"
        d="M17.69 11.896H12V.103h5.69a.31.31 0 0 1 .31.31v11.173a.31.31 0 0 1-.31.31"
      />
    </g>
    <defs>
      <clipPath id="flag-fr_svg__a">
        <path fill="#fff" d="M0 0h18v12H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFlagFr);
export default Memo;
