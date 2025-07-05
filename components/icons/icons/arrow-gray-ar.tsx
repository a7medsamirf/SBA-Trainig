import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowGrayAr = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M5.548 1.055v7.893c0 .64-.774.96-1.227.507L.868 6.002a1.42 1.42 0 0 1 0-2.007L2.18 2.682 4.32.542a.721.721 0 0 1 1.227.513"
      opacity={0.6}
    />
  </svg>
);
const Memo = memo(SvgArrowGrayAr);
export default Memo;
