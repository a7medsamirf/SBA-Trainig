import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgRulersProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}
const SvgRulers = ({ width = 40, height = 40, ...props }: SvgRulersProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className="rulers_svg__bi rulers_svg__bi-rulers"
    {...props}
  >
    <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z" />
  </svg>
);
const Memo = memo(SvgRulers);
export default Memo;
