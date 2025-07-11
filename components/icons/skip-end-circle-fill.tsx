import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgSkipEndCircleFillProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}
const SvgSkipEndCircleFill = ({ width = 40, height = 40, ...props }: SvgSkipEndCircleFillProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className="skip-end-circle-fill_svg__bi skip-end-circle-fill_svg__bi-skip-end-circle-fill"
    {...props}
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407L9.5 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528z" />
  </svg>
);
const Memo = memo(SvgSkipEndCircleFill);
export default Memo;
