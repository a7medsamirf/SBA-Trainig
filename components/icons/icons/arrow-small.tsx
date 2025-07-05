import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={4}
    height={6}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M.302.633v4.736c0 .384.515.576.818.304l2.302-2.072a.793.793 0 0 0 0-1.204l-.876-.788L1.12.325C.817.057.302.249.302.633"
      opacity={0.6}
    />
  </svg>
);
const Memo = memo(SvgArrowSmall);
export default Memo;
