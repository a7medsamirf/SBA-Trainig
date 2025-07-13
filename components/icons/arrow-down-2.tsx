import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface ArrowDown2Props extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  stroke?: string;
}

const SvgArrowDown2 = ({ width = 20, height = 20, stroke = "#8C9EC5", ...props }: ArrowDown2Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
     viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.5 4.5 6 8 2.5 4.5"
    />
  </svg>
);
const Memo = memo(SvgArrowDown2);
export default Memo;
