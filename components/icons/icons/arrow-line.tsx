import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#425A8B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M9.62 3.953 13.667 8 9.62 12.047M2.334 8h11.22"
    />
  </svg>
);
const Memo = memo(SvgArrowLine);
export default Memo;
