import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgLampProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const SvgLamp = ({ width = 40, height = 40, ...props }: SvgLampProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M18.21 14.69H5.79c-1.66 0-2.66-1.31-2.22-2.91l2.2-8.08C6.02 2.77 7.03 2 7.99 2h8.02c.96 0 1.97.77 2.22 1.7l2.2 8.08c.44 1.6-.56 2.91-2.22 2.91"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M16.75 21.25c0 .41-.34.75-.75.75H8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.25v-5.81h1.5v5.81H16c.41 0 .75.34.75.75"
    />
  </svg>
);
const Memo = memo(SvgLamp);
export default Memo;
