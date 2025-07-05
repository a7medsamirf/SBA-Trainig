import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={6}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M8.946.453H1.052c-.64 0-.96.773-.506 1.227l3.453 3.453a1.42 1.42 0 0 0 2.007 0L7.319 3.82l2.14-2.14A.721.721 0 0 0 8.946.453"
      opacity={0.6}
    />
  </svg>
);
const Memo = memo(SvgArrowDown);
export default Memo;
