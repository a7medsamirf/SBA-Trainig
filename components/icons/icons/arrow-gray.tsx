import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M.453 1.055v7.893c0 .64.773.96 1.226.507l3.454-3.453a1.42 1.42 0 0 0 0-2.007L3.819 2.682 1.68.542a.721.721 0 0 0-1.226.513"
      opacity={0.6}
    />
  </svg>
);
const Memo = memo(SvgArrowGray);
export default Memo;
