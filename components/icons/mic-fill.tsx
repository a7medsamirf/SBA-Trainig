import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface MicFillProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}
const SvgMicFill = ({ width = 40, height = 40, ...props }: MicFillProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className="mic-fill_svg__bi mic-fill_svg__bi-mic-fill"
    {...props}
  >
    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
  </svg>
);

const Memo = memo(SvgMicFill);
export default Memo;
