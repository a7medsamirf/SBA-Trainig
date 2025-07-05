import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface BellFillProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}
const SvgBellFill = ({ width = 40, height = 40, ...props }: BellFillProps) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className="bell-fill_svg__bi bell-fill_svg__bi-bell-fill"
    {...props}
  >
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
  </svg>
);
const Memo = memo(SvgBellFill);
export default Memo;
