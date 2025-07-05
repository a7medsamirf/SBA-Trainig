import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgView = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M15.938 6.862C14.205 4.14 11.67 2.572 9 2.572c-1.335 0-2.633.39-3.817 1.118-1.185.735-2.25 1.807-3.12 3.172-.75 1.178-.75 3.09 0 4.268C3.795 13.86 6.33 15.42 9 15.42c1.335 0 2.633-.39 3.818-1.118 1.185-.735 2.25-1.807 3.12-3.172.75-1.17.75-3.09 0-4.268M9 12.03A3.026 3.026 0 0 1 5.97 9c0-1.673 1.35-3.03 3.03-3.03S12.03 7.327 12.03 9 10.68 12.03 9 12.03"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M9 6.855a2.141 2.141 0 0 0 0 4.283c1.178 0 2.145-.96 2.145-2.138A2.154 2.154 0 0 0 9 6.855"
    />
  </svg>
);
const Memo = memo(SvgView);
export default Memo;
