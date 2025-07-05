import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgFlagEn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={12}
    fill="none"
    {...props}
  >
    <g clipPath="url(#flag-en_svg__a)">
      <path
        fill="#41479B"
        d="M17.69 11.897H.31a.31.31 0 0 1-.31-.31V.413a.31.31 0 0 1 .31-.31h17.38a.31.31 0 0 1 .31.31v11.172a.31.31 0 0 1-.31.31"
      />
      <path
        fill="#F5F5F5"
        d="M18 .414a.31.31 0 0 0-.31-.31H16.3l-5.75 3.766V.103H7.449V3.87L1.7.103H.311a.31.31 0 0 0-.31.31v.803l4.932 3.232H0v3.104h4.933L0 10.784v.802c0 .172.14.31.31.31H1.7L7.447 8.13v3.766h3.104V8.13l5.75 3.766h1.388a.31.31 0 0 0 .31-.31v-.803l-4.932-3.231H18V4.448h-4.933L18 1.216z"
      />
      <path
        fill="#FF4B55"
        d="M18 5.069H9.931V.103H8.07V5.07H0V6.93h8.07v4.966H9.93V6.93h8.07z"
      />
      <path
        fill="#FF4B55"
        d="M6.291 7.552.01 11.63c.022.15.146.267.302.267h.427l6.693-4.345zM12.178 7.552h-1.14l6.684 4.338a.307.307 0 0 0 .278-.304v-.255zM0 .756l5.688 3.692h1.14L.181.134a.31.31 0 0 0-.18.28zM11.692 4.448 17.99.36a.306.306 0 0 0-.3-.256h-.445l-6.693 4.344z"
      />
    </g>
    <defs>
      <clipPath id="flag-en_svg__a">
        <path fill="#fff" d="M0 0h18v12H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgFlagEn);
export default Memo;
