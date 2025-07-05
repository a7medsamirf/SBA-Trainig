import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgPowerProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}
const SvgPower = ({ width = 40, height = 40, ...props }: SvgPowerProps) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className="power_svg__bi power_svg__bi-power"
    {...props}
  >
    <path d="M7.5 1v7h1V1z" />
    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
  </svg>
);
const Memo = memo(SvgPower);
export default Memo;
