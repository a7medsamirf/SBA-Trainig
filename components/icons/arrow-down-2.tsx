import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowDown2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#8C9EC5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.5 4.5 6 8 2.5 4.5"
    />
  </svg>
);
const Memo = memo(SvgArrowDown2);
export default Memo;
