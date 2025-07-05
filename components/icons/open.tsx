import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgOpen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M5.958 10.083a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25"
    />
    <path
      fill="#425A8B"
      d="M11.917 5.958a4.125 4.125 0 1 1 4.125 4.125 4.116 4.116 0 0 1-4.125-4.125M5.958 20.167a4.125 4.125 0 1 0-3.813-2.545 4.12 4.12 0 0 0 3.813 2.545m10.084 0a4.125 4.125 0 1 0-3.814-2.545 4.12 4.12 0 0 0 3.814 2.545"
      opacity={0.3}
    />
  </svg>
);
const Memo = memo(SvgOpen);
export default Memo;
