import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={6}
    fill="none"
    {...props}
  >
    <rect width={6} height={6} fill="#36A2D0" rx={3} />
  </svg>
);
const Memo = memo(SvgCircle);
export default Memo;
