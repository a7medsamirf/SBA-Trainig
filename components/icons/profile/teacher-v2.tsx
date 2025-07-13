import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTeacherV2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M15.317 10.7v4.109c0 1.058-.825 2.191-1.817 2.525l-2.658.883c-.467.158-1.225.158-1.684 0L6.5 17.334c-1-.334-1.817-1.467-1.817-2.525l.009-4.109 3.683 2.4c.9.592 2.383.592 3.283 0z"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="m16.65 5.383-4.992-3.275c-.9-.591-2.383-.591-3.283 0L3.358 5.383c-1.608 1.042-1.608 3.4 0 4.45l1.334.867 3.683 2.4c.9.592 2.383.592 3.283 0l3.659-2.4 1.141-.75v2.55a.63.63 0 0 0 .625.625.63.63 0 0 0 .625-.625V8.4c.334-1.075-.008-2.325-1.058-3.017"
    />
  </svg>
);
const Memo = memo(SvgTeacherV2);
export default Memo;
