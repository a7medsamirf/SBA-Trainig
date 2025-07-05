import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgLabel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={127}
    height={129}
    fill="none"
    {...props}
  >
    <path
      fill="#F53658"
      d="M-36 101.057 99.057-34l27.578 27.577L-8.423 128.634z"
    />
  </svg>
);
const Memo = memo(SvgLabel);
export default Memo;
